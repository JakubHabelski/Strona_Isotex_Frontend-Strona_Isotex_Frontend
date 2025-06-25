import { Button, Form } from "react-bootstrap";
import Footer from "../../../../components/Footer";
import Navbar_v2 from "../../../../components/Navbar_v2/Navbar";
import style from './ManageCategories.module.css'
import { useState } from "react";
import { form } from "motion/react-client";
import axios from "axios";






export default function ManageCategories(){
    
    const apiUrl = process.env.REACT_APP_API_URL;

    const [categoryFrom, setCategoryForm] = useState({
        LabelPL: "",
        LabelEN: "",
        LabelDE: "",
        icon: null
    });

    function handleImage(e) {
        setCategoryForm((prevData) => ({
            ...prevData,
            icon: e.target.files[0]
        }));
    }

    function handleChangeCategory(e) {
        const { name, value } = e.target;
        setCategoryForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('dto', new Blob([JSON.stringify({
            LabelPL: categoryFrom.LabelPL,
            LabelEN: categoryFrom.LabelEN,
            LabelDE: categoryFrom.LabelDE
        })], { type: 'application/json' }));
        if (categoryFrom.icon) {
            formData.append('icon', categoryFrom.icon);
        }

        try {
            await axios.post(`${apiUrl}/Category_API/AddCategory`, formData, {
            //await axios.post('http://217.154.208.129:8080/Category_API/AddCategory', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Category added successfully');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    }

    return (
        <>
        <Navbar_v2></Navbar_v2>
        <div className={style.ManageCategoriesForm}>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Dodaj Kategorię</Form.Label>
                <Form.Control
                    name="LabelPL"
                    placeholder="Kategoria w języku Polskim"
                    onChange={handleChangeCategory}
                    value={categoryFrom.LabelPL}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    name="LabelEN"
                    placeholder="Kategoria w języku Angielskim"
                    onChange={handleChangeCategory}
                    value={categoryFrom.LabelEN}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    name="LabelDE"
                    placeholder="Kategoria w języku niemieckim"
                    onChange={handleChangeCategory}
                    value={categoryFrom.LabelDE}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="file"
                    onChange={handleImage}
                />
                {categoryFrom.icon && <p>Selected file: {categoryFrom.icon.name}</p>}
                
            </Form.Group>
            <Button type="submit" variant="primary">Submit</Button>
        </Form>
        </div>
        
        <Footer/>
        </>
        
    );
}