import { useEffect, useState } from "react";
import Footer from "../../../../components/Footer";
import Navbar_v2 from "../../../../components/Navbar_v2/Navbar";
import axios from "axios";
import { Button, Form, FormControl, Modal, Table } from "react-bootstrap";
import { supabase } from "../../../../utils/supabase";
import style from "../AddProduct/AddProduct.module.css"


function EditProductsList(){
    const apiUrl = process.env.REACT_APP_API_URL;

    const [products, setProducts] = useState([]);
    const [editRow, setEditRow] = useState(null);
    const [selectedCategory, setselectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');
    const [selectedSubCat, setSelectedSubCat] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    


    useEffect(() => {
    axios.get(`${apiUrl}/Category_API/GetCategories`)
        .then((response) => {
        setCategories(response.data);
        })
        .catch((error) => {
        console.error('Błąd podczas pobierania kategorii:', error);
        });
    }, []);
    useEffect(() => {
    if (selectedCat) {
        axios.get(`${apiUrl}/Category_API/GetSubCategoriesByCategory`, {
        params: { CategoryId: selectedCat }
        })
        .then((response) => {
            setSubcategories(response.data);
        })
        .catch((error) => {
            setSubcategories([]);
        });
    }
    }, [selectedCat]);



    const request = `${apiUrl}/Product_API/updateProduct`;
   // const request = `http://localhost:8080/Product_API/updateProduct`;
    const [formData, setFormData] = useState({
      id: "",
      name_pl: "",
      name_en: "",
      name_de: "",
      description_pl: "",
      description_en: "",
      description_de: "",
      price: "",
      category: "",
      subCategory: "",
      stock_quantity: "",
      photo: null
    })

    useEffect(()=>{
        axios.get(`${apiUrl}/list`)
        .then(res => setProducts(res.data))
        .then(console.log(products))
    }, {apiUrl})
    console.log(products)

    const handleEditClick = (product) => {
        setShow(true);
        setEditRow(product.id);

        const categoryValue = product.category?.en || product.category;
        const subCategoryValue = product.subcategory?.value || product.subcategory;

        setselectedCategory(categoryValue);
        setSelectedSubCategory(subCategoryValue);

        setFormData({
            id: product.id,
            name_pl: product.translations[0].name,
            name_en: product.translations[1].name,
            name_de: product.translations[2].name,
            description_pl: product.translations[0].description,
            description_en: product.translations[1].description,
            description_de: product.translations[2].description,
            price: product.price,
            category: categoryValue,
            subCategory: subCategoryValue,
            stock_quantity: product.stock_quantity,
            photo: null, // ZAWSZE null na start!
            oldPhotoUrl: product.image_url // zapamiętaj stary URL
        });
    };

    const handleImage = (e) => {
        setFormData((prev) => ({
            ...prev,
            photo: e.target.files[0] || null
        }));
    };

    const handleChange = (event) => {
        const { name, value} = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
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
    const handleCategoryChange = (event) => {
    setSelectedCat(event.target.value);
    setSelectedSubCat(''); // resetuj podkategorię przy zmianie kategorii
    };

    const handleSubCategoryChange = (event) => {
    setSelectedSubCat(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

  

        const formDataPost = new FormData();
        formDataPost.append("dto",new Blob([JSON.stringify({
                id: parseInt(formData.id),
                name_pl: formData.name_pl,
                name_en: formData.name_en,
                name_de: formData.name_de,
                description_pl: formData.description_pl,
                description_en: formData.description_en,
                description_de: formData.description_de,
                price: parseFloat(formData.price),
                category: selectedCat,
                subCategory: selectedSubCat,
                stock_quantity: parseInt(formData.stock_quantity),
            }),
            ],
            { type: "application/json" }
        )
        );

        if (formData.photo) {
            formDataPost.append("photo", formData.photo);
            }

        try {
            await axios.put(request, formDataPost, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("Produkt zaktualizowany.");
            setShow(false);
        } catch (error) {
            console.error("Błąd wysyłki:", error);
        }
    };


    return(
        <>
        <Table striped bordered hover style={{marginTop: "200px"}}>
            <thead style={{position: "sticky", top: "181px"}}>
                <tr>
                <th>id</th>
                <th>Nazwa PL</th>
                <th>Nazwa EN</th>
                <th>Nazwa DE</th>
                <th>Opis PL</th>
                <th>Opis EN</th>
                <th>Opis DE</th>
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
                            <td>{product.translations[2].name}</td>
                            <td>{product.translations[0].description}</td>
                            <td>{product.translations[1].description}</td>
                            <td>{product.translations[2].description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock_quantity}</td>
                            <td>
                                {
                                    product.category?.translations?.find(t => t.locale === "PL")?.label ||
                                    product.category?.translations?.[0]?.label ||
                                    "-"
                                }
                                </td>
                                <td>
                                {
                                    product.subcategory?.translations?.find(t => t.locale === "PL")?.label ||
                                    product.subcategory?.translations?.[0]?.label ||
                                    "-"
                                }
                                </td>
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
                          <Form.Label>Nazwa niemiecka</Form.Label>
                          <Form.Control type="text" placeholder="Nazwa" name="name_de" value={formData.name_de} onChange={handleChange} required/>
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
                          <Form.Label>Opis nimiecki</Form.Label>
                          <Form.Control type="text" placeholder="Opis" name="description_de" value={formData.description_de} onChange={handleChange} required/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Cena</Form.Label>
                          <Form.Control type="number" placeholder="Opis" name="price" value={formData.price} onChange={handleChange} required/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="categorySelect">
                        <Form.Label>Kategoria</Form.Label>
                        <Form.Select value={selectedCat} onChange={handleCategoryChange} required>
                            <option value="" disabled hidden>Wybierz kategorię...</option>
                            {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.LabelPL}
                            </option>
                            ))}
                        </Form.Select>
                        </Form.Group>

                        {selectedCat && (
                        <Form.Group className="mb-3" controlId="subcategorySelect">
                            <Form.Label>Podkategoria</Form.Label>
                            <Form.Select value={selectedSubCat} onChange={handleSubCategoryChange} required>
                            <option value="" disabled hidden>Wybierz podkategorię...</option>
                            {subcategories.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                {sub.LabelPL}
                                </option>
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
                            <Form.Control type="file" name="photo" onChange={handleImage} />
                            {typeof formData.photo === "string" && formData.photo && (
                                <div style={{marginTop: 8}}>
                                <img src={formData.photo} alt="Aktualne zdjęcie" style={{maxWidth: 150}} />
                                <div style={{fontSize: 12, color: "#888"}}>Aktualne zdjęcie produktu</div>
                                </div>
                            )}
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