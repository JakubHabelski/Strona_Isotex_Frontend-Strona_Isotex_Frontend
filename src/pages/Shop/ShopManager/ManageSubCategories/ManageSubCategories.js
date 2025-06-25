import { useEffect, useState } from 'react'
import style from './ManageSubCategories.module.css'
import { Button, Form, FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

export default function ManageSubCategories(){
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    console.log(apiUrl)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    const getTranslatedLabel = (item) => (i18n.language === "en" ? item.LabelEN : item.LabelPL);

    const [subCategoryForm, setSubCategoryForm] = useState({
        category_id: selectedCategory,
        LabelPL: "",
        LabelEN: "",
        photo: null
    })

    useEffect(() =>{
        axios.get(`${apiUrl}/Category_API/GetCategories`)
            .then(async(response) =>{
                const categoriesData = response.data;
                console.log(categoriesData)
                setCategories(categoriesData)
            })
    }, [])
    console.log(categories)

    const handleCategorySelect = (event) => {
        setSelectedCategory(event.target.value);
        setSubCategoryForm((prev) => ({
            ...prev,
            category_id: event.target.value
        }));
    };
    function handleImage(e) {
        setSubCategoryForm((prevData) => ({
            ...prevData,
            photo: e.target.files[0]
        }));
    }

    function handleChangeSubCategory(e) {
        const { name, value } = e.target;
        setSubCategoryForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('dto', new Blob([JSON.stringify({
            LabelPL: subCategoryForm.LabelPL,
            LabelEN: subCategoryForm.LabelEN,
            category_id: subCategoryForm.category_id
        })], {type: 'application/json'}));
        if(subCategoryForm.photo){
            formData.append('photo', subCategoryForm.photo)
        }
        console.log(formData.get('categoryId'))

        try{
            await axios.post(`${apiUrl}/Category_API/AddSubCategory`, formData, {
             headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Category added successfully');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    }


    return(
        <>

        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label>Dodaj podkategorię</Form.Label>
                <Form.Label>Wybierz Kateogrię</Form.Label>
                <Form.Select value={selectedCategory} aria-label='Wybierz kategorie' onChange={handleCategorySelect}>
                    <option value="" disabled hidden>Wybierz kategorię...</option>
                    {categories.map((category) =>(
                        <option key={category.id} value={category.id}>
                            {category.LabelPL}
                        </option>
                    ))}
                </Form.Select>
                </Form.Group>
                {selectedCategory &&(
                <Form.Group>
                    <Form.Label>Nazwa Polska</Form.Label>
                    <Form.Control 
                        name="LabelPL"
                        placeholder="Podkategoria w języku Polskim"
                        onChange={handleChangeSubCategory}
                        value={subCategoryForm.LabelPL}
                    />
                    <Form.Label>Nazwa Angielska</Form.Label>
                    <Form.Control 
                        name="LabelEN"
                        placeholder="Podkategoria w języku Polskim"
                        onChange={handleChangeSubCategory}
                        value={subCategoryForm.LabelEN}    
                    />
                    <Form.Label>Zdjęcie</Form.Label>
                    <Form.Control 
                        type="file"
                        onChange={handleImage}
                    />
                    <Button type="submit" variant="primary">Submit</Button>

                </Form.Group>
                )}
            
        </Form>
        </>
    )
}