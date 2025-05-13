import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";
import axios from "axios";
import { Button, Form, FormControl, Modal, Table } from "react-bootstrap";
import { supabase } from "../../../utils/supabase";
import style from "../AddProduct/AddProduct.module.css"


function EditProductsList(){

    const [products, setProducts] = useState([]);
    const [editRow, setEditRow] = useState(null);
    const [selectedCategory, setselectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    


    const categories = [{en: "FABRIC", pl: "Tkaniny"}, {en: "FILLING", pl: "Wypełnienia"}, {en: "SERVICES", pl: "Usługi"}];
    const subCategories = {
        FABRIC: [
            { value: "GLASS_FABRIC", label: "Tkaniny szklane" },
            { value: "ARAMID_FABRIC", label: "Tkaniny aramidowe" },
        ],
        FILLING: [
            { value: "MINERAL_WOOL", label: "Wełna mineralna" },
            { value: "CERAMIC_WOOL", label: "Wełna ceramiczna" },
            { value: "GLASS_MAT", label: "Mata szklana" },
        ],
        SERVICES: [
            { value: "MESURING", label: "Pomiar" },
            { value: "PROJECT", label: "Projekt" },
            { value: "MATTRESS_PRODUCTION", label: "Produkcja materacy" },
            { value: "INSTALLATION", label: "Montaż" },
        ]
        };


    const apiUrl = process.env.REACT_APP_API_URL;
    const request = `${apiUrl}/Product_API/updateProduct`;

    const [formData, setFormData] = useState({
      id: "",
      name_pl: "",
      name_en: "",
      description_pl: "",
      description_en: "",
      price: "",
      category: "",
      subCategory: "",
      stock_quantity: "",
      photo: ''
    })

    useEffect(()=>{
        axios.get(`${apiUrl}/list`)
        .then(res => setProducts(res.data))
        .then(console.log(products))
    }, {apiUrl})


     const handleEditClick = async (product) =>{
       setShow(true);
      console.log(product.id);
      setEditRow(product.id)
      setFormData({
        id: product.id,
        name_pl: product.translations[0].name,
        name_en: product.translations[1].name,
        description_pl: product.translations[0].description,
        description_en: product.translations[1].description,
        price: product.price,
        category: product.category,
        subCategory: product.subcategory,
        stock_quantity: product.stock_quantity,
        photo: product.image_url
      })
          
    }
const handleChange = (event) => {
    const { name, value, files } = event.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'photo' ? files[0] : value
    }));
};

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setselectedCategory(value);
        setFormData((prevData) => ({
            ...prevData,
            category: value
        }));
        };
    const handleSubCategoryChange = (event) =>{
        const  value = event.target.value;
        setSelectedSubCategory(value);
        setFormData((prevData) => ({
            ...prevData,
            subCategory: value
        }));
    }
    const handleUpload = async () => {
        const file = formData.photo;
        const fileName = `${Date.now()}_${file.name}`;

        const { data, error } = await supabase.storage
            .from('teststrony') // <- Twój bucket
            .upload(fileName, file);

        if (error) {
            console.error("Upload failed", error);
            return null;
        }

        const publicUrl = supabase.storage
            .from('teststrony')
            .getPublicUrl(fileName).data.publicUrl;

        return publicUrl;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const imageUrl = await handleUpload();
        if (!imageUrl) {
            alert("Błąd przesyłania zdjęcia.");
            return;
        }

        const productData = {
            id : parseInt(formData.id),
            name_pl: formData.name_pl,
            name_en: formData.name_en,
            description_pl: formData.description_pl,
            description_en: formData.description_en,
            price: parseFloat(formData.price),
            category: formData.category,
            subCategory: formData.subCategory,
            stock_quantity: parseInt(formData.stock_quantity),
            photoUrl: imageUrl // <- Wysyłasz tylko URL
        };
        console.log("productData: "+productData)
        try {
            await axios.put(request, productData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Produkt dodany.");
        } catch (error) {
            console.error("Błąd wysyłki:", error);
        }
    };


    return(
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>id</th>
                <th>Nazwa PL</th>
                <th>Nazwa EN</th>
                <th>Opis PL</th>
                <th>Opis EN</th>
                <th>Cena</th>
                <th>Stan magazynowy</th>
                <th>Kategoria</th>
                <th>Podkategoria</th>
                <th>Zdjęcie</th>
                <th>Edytuj</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.translations[0].name}</td>
                            <td>{product.translations[1].name}</td>
                            <td>{product.translations[0].description}</td>
                            <td>{product.translations[1].description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock_quantity}</td>
                            <td>{product.category}</td>
                            <td>{product.subcategory}</td>
                            <td style={{maxWidth: "500px"}}><img src={product.image_url} style={{maxWidth:"-webkit-fill-available"}}></img></td>
                            <td>
                                <Button onClick={() => handleEditClick(product)}>Edytuj</Button>
                                
                            </td>
                        </tr>
                    
                ))}
            </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className={style.AddProductForm}>
                      <input type="hidden" value={formData.id}></input>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Nazwa Polska</Form.Label>
                          <Form.Control type="text" placeholder="Nazwa" name="name_pl" value={formData.name_pl} onChange={handleChange} required/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Nazwa Angielska</Form.Label>
                          <Form.Control type="text" placeholder="Nazwa" name="name_en" value={formData.name_en} onChange={handleChange} required/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Opis Polski</Form.Label>
                          <Form.Control type="text" placeholder="Opis" name="description_pl" value={formData.description_pl} onChange={handleChange} required/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Opis Angielski</Form.Label>
                          <Form.Control type="text" placeholder="Opis" name="description_en" value={formData.description_en} onChange={handleChange} required/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Cena</Form.Label>
                          <Form.Control type="number" placeholder="Opis" name="price" value={formData.price} onChange={handleChange} required/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Kategoria</Form.Label>
                      <Form.Select value={selectedCategory} onChange={handleSelectChange} required>
                          <option value="" disabled hidden>Wybierz kategorię...</option>
                          {categories.map((cat) => (
                          <option key={cat.en} value={cat.en}>{cat.pl}</option>
                          ))}
                      </Form.Select>
                      </Form.Group>

                      {selectedCategory && (
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Podkategoria</Form.Label>
                          <Form.Select value={selectedSubCategory} onChange={handleSubCategoryChange} required>
                          <option value="" disabled hidden>Wybierz podkategorię...</option>
                          {subCategories[selectedCategory].map((sub) => (
                              <option key={sub.value} value={sub.value}>{sub.label}</option>
                          ))}
                          </Form.Select>
                      </Form.Group>
                      )}
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Stan magazynowy</Form.Label>
                          <Form.Control type="number" placeholder="Ilość" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required/>
                      </Form.Group>
                      <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label>Zdjęcie</Form.Label>
                          <Form.Control type="file"  name="photo"  onChange={handleChange} required/>
                      </Form.Group>

                      <Button variant="primary" type="submit">Wyślij</Button>
                  </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
        </>
    )

}

export default function EditProducts(){
    return(
        <>
        <Navbar_v2></Navbar_v2>
        <EditProductsList></EditProductsList>
        <Footer></Footer>
        </>
    )
}