import { Button, Form } from "react-bootstrap";
import Footer from "../../../../components/Footer";
import Navbar_v2 from "../../../../components/Navbar_v2/Navbar";
import style from './ManageCategories.module.css'
import { useState } from "react";
import { form } from "motion/react-client";
import axios from "axios";





export default function ManageCategories(){

    const [categoryFrom, setCategoryForm] = useState({
        LabelPL: "",
        LabelEN: "",
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
            LabelEN: categoryFrom.LabelEN
        })], { type: 'application/json' }));
        if (categoryFrom.icon) {
            formData.append('icon', categoryFrom.icon);
        }

        try {
            await axios.post('http://localhost:8080/Category_API/AddCategory', formData, {
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
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Dodaj Kategorię</Form.Label>
                <Form.Control
                    name="LabelPL"
                    placeholder="Kategoria w języku Polskim"
                    onChange={handleChangeCategory}
                    value={categoryFrom.LabelPL}
                />
                <Form.Control
                    name="LabelEN"
                    placeholder="Kategoria w języku Angielskim"
                    onChange={handleChangeCategory}
                    value={categoryFrom.LabelEN}
                />
                <Form.Control
                    type="file"
                    onChange={handleImage}
                />
                {categoryFrom.icon && <p>Selected file: {categoryFrom.icon.name}</p>}
                <Button type="submit" variant="primary">Submit</Button>
            </Form.Group>
        </Form>
    );
}