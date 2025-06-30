import Navbar_v2 from './../../../../components/Navbar_v2/Navbar'
import Footer  from './../../../../components/Footer'
import style from './EditSubCagegory.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Button, Card, Form, Modal, Table, useAccordionButton } from 'react-bootstrap';

export default function EditSubCagegory(){
    const apiUrl = process.env.REACT_APP_API_URL;
    const [categories, setCategores] = useState([]);
    const [openedCatId, setOpenedCatId] = useState(null);
    const [subcategories, setSubcategories] = useState({}); // { [catId]: [subcat, ...] }
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        LabelPL: '',
        LabelEN: '',
        LabelDE: '',
        photo: null
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Pobierz kategorie
    useEffect(() =>{
        axios.get(`${apiUrl}/Category_API/GetCategories`)
        .then((response) =>{
            setCategores(response.data);
        })
    }, []);

    // Pobierz subkategorie, gdy otwierasz kategorię
    useEffect(() => {
        if (openedCatId && !subcategories[openedCatId]) {
            axios.get(`${apiUrl}/Category_API/GetSubCategoriesByCategory`, {
                params: { CategoryId: openedCatId }
            })
            .then((response) => {
                console.log(response.data)
                setSubcategories(prev => ({
                    ...prev,
                    [openedCatId]: response.data
                }));
            });
        }
    }, [openedCatId, subcategories, apiUrl]);

    function CustomToggle({ children, eventKey, onClick }) {
        const decoratedOnClick = useAccordionButton(eventKey, onClick);
        return (
            <button
                type="button"
                style={{ backgroundColor: 'pink' }}
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    }


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

        const formDataSubmit = new FormData();

        formDataSubmit.append('dto', new Blob([JSON.stringify({
            category_id: formData.id, // Dodaj ID jeśli backend go potrzebuje
            LabelPL: formData.LabelPL,
            LabelEN: formData.LabelEN,
            LabelDE: formData.LabelDE
        })], { type: 'application/json' }));

        if (formData.photo) {
            formDataSubmit.append('icon', formData.photo); // Uwaga: użyj `icon`, nie `photo`
        }

        try {
            await axios.put(`${apiUrl}/Category_API/EditSubCategory`, formDataSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Category edited successfully');
            setShow(false); // zamknij modal
        } catch (error) {
            console.error('Error editing category:', error);
        }
    }
    async function handleDelete(id) {
        try {
            await axios.delete(`${apiUrl}/Category_API/DeleteSubCategory?id=${id}`);
            console.log('Podkategoria usunięta pomyślnie');
            // Aktualizuj stan subcategories
            setSubcategories(prev => ({
                ...prev,
                [openedCatId]: prev[openedCatId].filter(sub => sub.id !== id)
            }));
        } catch (error) {
            console.error('Błąd przy usuwaniu podkategorii:', error);
        }
    }

    return(
        <>
        <Navbar_v2/>
        <div className={style.EditSubCagegoryForm}>
            {categories.length > 0 ? (
                <Accordion>
                    {categories.map((cat) =>(
                        <Card key={cat.id}>
                            <Card.Header>
                                <CustomToggle
                                    eventKey={cat.id}
                                    onClick={() => setOpenedCatId(cat.id)}
                                >
                                    {`Kategoria: ${cat.LabelPL}`}
                                </CustomToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={cat.id}>
                                <Card.Body>
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
                                        </thead>
                                        <tbody>
                                        {subcategories[cat.id]
                                            ? subcategories[cat.id].map(sub => (
                                                <tr key={sub.id}>
                                                    <td>{sub.id}</td>
                                                    <td>{sub.LabelPL}</td>
                                                    <td>{sub.LabelEN}</td>
                                                    <td>{sub.LabelDE}</td>
                                                    <td><img src={sub.photo_url}></img></td>
                                                    <td>
                                                        <Button 
                                                            variant="outline-secondary"
                                                            onClick={() =>editcat(sub)}
                                                        >
                                                            Edytuj
                                                        </Button>
                                                        <Button
                                                            variant="outline-danger"
                                                            onClick={() => handleDelete(sub.id)}
                                                            style={{ marginLeft: '10px' }}
                                                        >
                                                            Usuń
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                            : <tr><td colSpan="6">Ładowanie subkategorii...</td></tr>}
                                        </tbody>   
                                    </Table>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                </Accordion>
            ) : (
                <p>Brak kategorii do wyświetlenia.</p>
            )}
        </div>


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
        <Footer/>
        </>
    )
}