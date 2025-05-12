import { Button, Form } from "react-bootstrap";
import Footer from "../../../components/Footer";
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";
import { useState } from "react";
import axios from "axios";
import { supabase } from '../../../utils/supabase';
import style from "./AddProduct.module.css"

function AddProductform(){

    const apiUrl = process.env.REACT_APP_API_URL;
    const request = `${apiUrl}/Product_API/addproduct`;

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


    
    const [selectedCategory, setselectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const [formData, setFormData] = useState({
        name_pl: "",
        name_en: "",
        description_pl: "",
        description_en: "",
        price: "",
        category: selectedCategory,
        subCategory: selectedSubCategory,
        stock_quantity: "",
        photo: ''
    })
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

        try {
            await axios.post(request, productData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Produkt dodany.");
        } catch (error) {
            console.error("Błąd wysyłki:", error);
        }
    };


    console.log(selectedSubCategory)
    console.log(formData)
    return(
        <>
        <Form onSubmit={handleSubmit} className={style.AddProductForm}>
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
        </>
    )
}

export default function AddProduct(){
    return(
        <>

        <Navbar_v2></Navbar_v2>
        <AddProductform></AddProductform>
        <Footer></Footer>
        </>
    )
}