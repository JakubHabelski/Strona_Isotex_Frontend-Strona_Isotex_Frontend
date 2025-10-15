import { useEffect, useState } from 'react'
import style from './ManageSubCategories.module.css'
import { Button, Form, FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { Helmet } from 'react-helmet';
import { baseURL, apiURL, logoURL, faviconURL } from '../../../../config';

export default function ManageSubCategories(){
   // const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
   
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    const getTranslatedLabel = (item) => (i18n.language === "en" ? item.LabelEN : item.LabelPL);

    const [subCategoryForm, setSubCategoryForm] = useState({
        category_id: selectedCategory,
        LabelPL: "",
        LabelEN: "",
        LabelDE: "",
        photo: null
    })

    useEffect(() =>{
        axios.get(`${apiURL}/Category_API/GetCategories`)
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
        const token = localStorage.getItem("token");
        e.preventDefault();
        const formData = new FormData();
        formData.append('dto', new Blob([JSON.stringify({
            LabelPL: subCategoryForm.LabelPL,
            LabelEN: subCategoryForm.LabelEN,
            LabelDE: subCategoryForm.LabelDE,
            category_id: subCategoryForm.category_id
        })], {type: 'application/json'}));
        if(subCategoryForm.photo){
            formData.append('photo', subCategoryForm.photo)
        }
        console.log(formData.get('categoryId'))

        try{
            await axios.post(`${apiURL}/Category_API/AddSubCategory`, formData, {
             headers: {
                    'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
                }
            });
            console.log('Category added successfully');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    }


    return(
        <>
        <Helmet>
          <title>{t("page_titles.Shop.ShopManager.ManageSubCategories")}</title>
          <link rel="icon" type="image/png" href="/assets/logo.png" />
          <meta name="description" content="Wysokiej jakości tkaniny i maty izolacyjne od Isotex Group. Przeglądaj nasze produktu i zamawiaj online!" />
          <meta name="keywords" content="tkaniny izolacyjne, maty izolacyjne, Isotex Group, materiały ognioodporne, sklep online" />
          <meta name="robots" content="index, follow" />
          <script type="application/ld+json">{`
              {
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  "name": "Isotex Group Sklep",
                  "description": "Sklep online z tkaninami i matami izolacyjnymi od Isotex Group.",
                  "publisher": {
                      "@type": "Organization",
                      "name": "Isotex Group",
                      "logo": {
                          "@type": "ImageObject",
                          "url": "https://testfunkcjonalonscisklepu.pl/assets/logo.png"
                      }
                  }
              }
          `}</script>
        </Helmet>
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
                        placeholder="Podkategoria w języku Angielskim"
                        onChange={handleChangeSubCategory}
                        value={subCategoryForm.LabelEN}    
                    />
                    <Form.Label>Nazwa niemiecka</Form.Label>
                    <Form.Control 
                        name="LabelDE"
                        placeholder="Podkategoria w języku niemieckim"
                        onChange={handleChangeSubCategory}
                        value={subCategoryForm.LabelDE}    
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