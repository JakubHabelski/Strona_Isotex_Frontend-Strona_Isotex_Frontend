import '../../../App.css';
import './Mattress.css'
import React, { useEffect, useState } from 'react';
import NavbarMain from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer';
import { Button, Card, Modal, Row, Col } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container } from 'react-bootstrap';
import {   useLocalStorage } from "../../../utils/localStorage";
import { Toast, ToastContainer } from 'react-bootstrap';



function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalTitle, setModalTitle] = useState(''); // Stan na nazwę produktu
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


        
  const [product_list, setProductName] = useLocalStorage("product_list", [])
  console.log({product_list});
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(`${apiUrl}/list`)

  // Pobranie danych o produktach z API
  useEffect(() => {
    fetch(`${apiUrl}/list`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleImageClick = (imageUrl, title) => {
    setModalImage(imageUrl);
    setModalTitle(title); // Ustawiamy nazwę produktu w stanie
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage('');
    setModalTitle(''); // Resetujemy tytuł
  };
  const addToCart = (product) => {
    setProductName(product); // Używa poprawnej funkcji do dodawania produktu
    setToastMessage(`Dodano do koszyka: ${product.name}`);
    setShowToast(true);
  };

  if (loading) {
    return <div className="text-center py-5">Ładowanie...</div>;
  }

  if (error) {
    return <div className="text-center py-5">Błąd: {error.message}</div>;
  }

  return (
    <Container className="py-4" style={{position: "relative", zIndex: -1}}>
      <h1 className="mb-4">Lista produktów</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Img
                variant="top"
                src={product.image_url || 'https://via.placeholder.com/150'}
                className="img-fluid"
                onClick={() => handleImageClick(product.image_url, product.name)} // Przekazujemy nazwę
                style={{ cursor: 'pointer' }} // Dodanie kursora wskazującego kliknięcie
              />
              <Card.Body>
                <Card.Title className="title">{product.name}</Card.Title>
                <Card.Text className="description">{product.description}</Card.Text>
                <Card.Text>
                  <strong>Cena: </strong>{product.price} PLN
                </Card.Text>
                <Card.Text>
                  <strong>Stan magazynowy: </strong>{product.stock_quantity}
                </Card.Text>
                <Button variant="primary"  onClick={() => addToCart(product)}>Dodaj do koszyka</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Modal z pełnym obrazkiem */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title> {/* Tytuł modala z nazwą produktu */}
        </Modal.Header>
        <Modal.Body>
          <img
            src={modalImage}
            alt="Product"
            className="img-fluid"
            style={{
              height: '80vh',  // Zachowuje proporcje
              objectFit: 'contain'  // Zachowuje proporcje, nie przycina
            }}
          />
        </Modal.Body>
      </Modal>
            {/* Toast - powiadomienie */}
      <ToastContainer position="top-end" className="p-3" style={{marginTop: "50px"}}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} // Znika po 3 sekundach
          autohide
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}


function Shop() {
  return (
    <>
    <NavbarMain></NavbarMain>
    <ProductsList></ProductsList>
    <Footer></Footer>
    
    </>
);
}

export default Shop;
