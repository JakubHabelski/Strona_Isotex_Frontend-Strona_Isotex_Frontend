import { useEffect, useState } from "react";
import Footer from "../../../../components/Footer";
import Navbar_v2 from "../../../../components/Navbar_v2/Navbar";
import style from './EditCategory.module.css'
import axios from "axios";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import apiURL from '../../../../config';

export default function EditCategory(){
    
   // const apiUrl = process.env.REACT_APP_API_URL;
    const [categories, setCategores] = useState([]);
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [DeleteCatID, setDeleteCatId] = useState(null);
    const [subcategoriesByCat, setSubcategoriesByCat] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        LabelPL: '',
        LabelEN: '',
        LabelDE: '',
        photo: null
    })
    const [productsbysubcat, setproductsbysubcat] = useState(new Map())
    const { t, i18n } = useTranslation();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = (Id) => {
        setDeleteCatId(Id);
        setShowDeleteModal(true);
    };

    useEffect(() =>{
        axios.get(`${apiURL}/Category_API/GetCategories`)
        .then(async(response) =>{
            console.log(response.data)
            setCategores(response.data);
        })
    }, [])
    // Fetch subcategories by selected category
    useEffect(() => {
        if (DeleteCatID) {
        axios
            .get(`${apiURL}/Category_API/GetSubCategoriesByCategory`, {
            params: { CategoryId: DeleteCatID },
            })
            .then((response) => setSubcategoriesByCat(response.data))
            .catch((error) => setSubcategoriesByCat([]));
        }
    }, [DeleteCatID, apiURL]);

    // 2. Pobierz produkty po zmianie subcategoriesByCat
    useEffect(() => {
        if (subcategoriesByCat.length > 0) {
            subcategoriesByCat.forEach(subcat => {
                axios
                    .get(`${apiURL}/products/subcategory/${subcat.id}/${i18n.language}`)
                    .then((response) => {
                        setproductsbysubcat(prev => {
                            const newMap = new Map(prev);
                            newMap.set(subcat.id, response.data);
                            return newMap;
                        });
                    });
            });
        }
    }, [subcategoriesByCat, apiURL, i18n.language]);

    const editcat = (cat) =>{
        handleShow();
        console.log(cat.id)
        setFormData({
            id: cat.id,
            LabelPL: cat.LabelPL,
            LabelEN: cat.LabelEN,
            LabelDE: cat.LabelDE,
        })
    }
    const handleChange = (event) => {
        const { name, value} = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(formData)
    };
    function handleImage(e) {
        setFormData((prevData) => ({
            ...prevData,
            photo: e.target.files[0]
        }));
    }
    async function handleSubmit(e) {

    e.preventDefault();
    const token = localStorage.getItem("token");
    const formDataSubmit = new FormData();

    formDataSubmit.append('dto', new Blob([JSON.stringify({
        id: formData.id, // Dodaj ID jeśli backend go potrzebuje
        LabelPL: formData.LabelPL,
        LabelEN: formData.LabelEN,
        LabelDE: formData.LabelDE
    })], { type: 'application/json' }));

    if (formData.photo) {
        formDataSubmit.append('icon', formData.photo); // Uwaga: użyj `icon`, nie `photo`
    }

    try {
        await axios.put(`${apiURL}/Category_API/EditCategory`, formDataSubmit, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Category edited successfully');
        setShow(false); // zamknij modal
    } catch (error) {
        console.error('Error editing category:', error);
    }
}

    async function DeleteCategory(id) {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${apiURL}/Category_API/DeleteCategory?id=${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(id)
           // await axios.delete(`http://localhost:8080/Category_API/DeleteCategory?id=${id}`);
            
        } catch (error) {
            
        }
    }





    

    return(
        <>
        <Helmet>
          <title>{t("page_titles.Shop.ShopManager.EditCategory")}</title>
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
        <Navbar_v2/>
        <div className={style.EditCategoryContainer}>
            
                <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa polska</th>
                            <th>Nazwa Angielska</th>
                            <th>Nazwa niemiecka</th>
                            <th>zdjęcie</th>
                            <th></th>
                        </tr>
                        {categories.map((cat) =>(
                            <tr>
                                <td>{cat.id} </td>
                                <td>{cat.LabelPL}</td>
                                <td>{cat.LabelEN}</td>
                                <td>{cat.LabelDE}</td>
                                <td style={{width: "50%"}}><img src={cat.photo_url}></img></td>
                                <td>
                                    <Button 
                                        variant="outline-secondary"
                                        onClick={() =>editcat(cat)}
                                    >
                                        Edytuj
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => handleShowDeleteModal(cat.id)}
                                    >
                                        Usuń
                                    </Button>
                                </td>
                            </tr>    
                            ))}
                    </thead>
                </Table>
                </>
            
        </div>

        <Footer/>




        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Nazwa polska</Form.Label>
                <Form.Control 
                    type="text"
                    name="LabelPL"
                    value={formData.LabelPL}
                    onChange={handleChange} 
                    required
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nazwa Angielska</Form.Label>
                <Form.Control 
                    type="text"
                    name="LabelEN"
                    value={formData.LabelEN}
                    onChange={handleChange} 
                    required
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nazwa niemiecka</Form.Label>
                <Form.Control 
                    type="text"
                    name="LabelDE"
                    value={formData.LabelDE}
                    onChange={handleChange} 
                    required
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>zdjęcie</Form.Label>
                <Form.Control 
                    type="file"
                    onChange={handleImage}
                >
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Zapisz</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Usuwanie kategorii</Modal.Title>
        </Modal.Header>
        <Modal.Body>            
            {subcategoriesByCat.map((sub) => (
                <div key={sub.id} className={style.subcategoryBlock} style={{marginBottom: "2rem", padding: "1rem", border: "1px solid #eee", borderRadius: "8px"}}>
                    <h5 style={{marginBottom: "0.5rem"}}>Podkategoria: {sub.LabelPL}</h5>
                    <div style={{marginBottom: "0.5rem", fontWeight: "bold"}}>
                    Produkty w podkategorii ({productsbysubcat.get(sub.id)?.length || 0}):
                    </div>
                    <ul style={{marginLeft: "1.5rem"}}>
                    {productsbysubcat.get(sub.id)?.length > 0 ? (
                        productsbysubcat.get(sub.id).map(prod => (
                        <li key={prod.id}>{prod.name}</li>
                        ))
                    ) : (
                        <li style={{color: "#888"}}>Brak produktów</li>
                    )}
                    </ul>
                </div>
                ))}
          <Button
            variant="outline-danger"
            onClick={() => DeleteCategory(DeleteCatID)}
            style={{ marginLeft: '10px' }}
        >
            Usuń
        </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Anuluj
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}