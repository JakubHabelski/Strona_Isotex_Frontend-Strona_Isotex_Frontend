import { useEffect, useState } from "react";
import Footer from "../../../../components/Footer";
import Navbar_v2 from "../../../../components/Navbar_v2/Navbar";
import style from './EditCategory.module.css'
import axios from "axios";
import { Button, Form, Modal, Table } from "react-bootstrap";

export default function EditCategory(){

    const apiUrl = process.env.REACT_APP_API_URL;
    const [categories, setCategores] = useState([]);
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        LabelPL: '',
        LabelEN: '',
        photo: null
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() =>{
        axios.get(`http://localhost:8080/Category_API/GetCategories`)
        //axios.get(`${apiUrl}/Category_API/GetCategories`)
        .then(async(response) =>{
            console.log(response.data)
            setCategores(response.data);
        })
    }, [])

    const editcat = (cat) =>{
        handleShow();
        console.log(cat.id)
        setFormData({
            id: cat.id,
            LabelPL: cat.LabelPL,
            LabelEN: cat.LabelEN,
        })
    }
    const handleChange = (event) => {
        const { name, value, files } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'photo_url' ? files[0] : value
        }));
        console.log(formData)
    };
    function handleImage(e) {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            photo: file
        }));
    }
    async function handleSubmit(e) {
    e.preventDefault();

    const formDataSubmit = new FormData();

    formDataSubmit.append('dto', new Blob([JSON.stringify({
        id: formData.id, // Dodaj ID jeśli backend go potrzebuje
        LabelPL: formData.LabelPL,
        LabelEN: formData.LabelEN
    })], { type: 'application/json' }));

    if (formData.photo) {
        formDataSubmit.append('icon', formData.photo); // Uwaga: użyj `icon`, nie `photo`
    }

    try {
        await axios.post('http://localhost:8080/Category_API/EditCategory', formDataSubmit, {
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





    

    return(
        <>
        <Navbar_v2/>
        <div className={style.EditCategoryContainer}>
            
                <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa polska</th>
                            <th>Nazwa Angielska</th>
                            <th>zdjęcie</th>
                            <th></th>
                        </tr>
                        {categories.map((cat) =>(
                            <tr>
                                <td>{cat.id} </td>
                                <td>{cat.LabelPL}</td>
                                <td>{cat.LabelEN}</td>
                                <td style={{width: "50%"}}><img src={cat.photo_url}></img></td>
                                <td>
                                    <Button 
                                        variant="outline-secondary"
                                        onClick={() =>editcat(cat)}
                                    >
                                        Edytuj
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
        </>
    )
}