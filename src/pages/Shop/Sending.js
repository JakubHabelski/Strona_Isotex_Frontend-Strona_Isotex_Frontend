import { Button, Col, Container, Form, Row, Spinner, Toast, ToastContainer } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavbarMain from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useLocalStorage } from "../../utils/localStorage";
import "./Sending.css";
import Navbar_v2 from "../../components/Navbar_v2/Navbar";

function SendOrder() {
    const { t, i18n } = useTranslation();
    const [cartItems, , removeItem] = useLocalStorage("cartItems", []);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [redirectUri, setRedirectUri] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    console.log("test")
    console.log(cartItems)

    // Śledzimy IDs produktów, żeby wykryć zmiany w koszyku
    const cartItemIds = cartItems.map(item => item.id).join(",");

    // Pobieranie danych produktów z API
    useEffect(() => {
        if (cartItems.length === 0) {
            setProducts([]);
            return;
        }

        setLoading(true);
        setError(null);

        const fetchProducts = async () => {
            try {
                let ids = cartItems.map(item => item.id).join(",");
                ids = ids.replace(/^,/,'')
                console.log("Fetching products for IDs:", ids); // Debugowanie
                const res = await axios.get(`${apiUrl}/products/multiple?ids=${ids}&locale=${i18n.language}`);
                console.log("API response:", res.data); // Debugowanie
                const fetchedProducts = res.data
                    .filter(product => cartItems.some(item => item.id === product.id))
                    .map((product) => ({
                        ...product,
                        quantity: cartItems.find(item => item.id === product.id)?.quantity || 1
                    }));
                setProducts(fetchedProducts);
            } catch (err) {
                console.error("API error:", err);
                setError(t("errors.apiFailed"));
                setToastMessage(t("errors.apiFailed"));
                setShowToast(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [cartItemIds, i18n.language, apiUrl, t]);

    // Synchronizacja products.quantity z cartItems.quantity
    useEffect(() => {
        setProducts(prevProducts =>
            prevProducts.map(product => ({
                ...product,
                quantity: cartItems.find(item => item.id === product.id)?.quantity || product.quantity
            }))
        );
    }, [cartItems]);

    // Obliczanie sumy zamówienia
    const orderSum = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    // Stan formularza
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        phone: "",
        regon: "",
        nip: "",
        street: "",
        homenr: "",
        postcode: "",
        order_sum: (orderSum)
    });

    console.log(formData)
    // Aktualizacja order_sum w formData przy zmianie products
    useEffect(() => {
        setFormData(prev => ({ ...prev, order_sum: (orderSum)}));
    }, [orderSum]);

    // Obsługa zmian w formularzu
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    
    
    useEffect(() => {
        fetch("https://testfunkcjonalonscisklepu.pl/PayU_API/Create_an_Order") // zmień na właściwy URL, jeśli inny
        .then(response => response.text()) // bo zwracasz String (redirectUri)
        .then(data => {
            console.log("Redirect URI:", data);
            setRedirectUri(data);
        })
        .catch(error => console.error("Błąd podczas pobierania:", error));
    }, []);

    // Obsługa wysyłania formularza
    const handleSubmit = async (event) => {
        event.preventDefault();

        const simplifiedProducts = cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price
        }));
        cartItems.forEach(element => {
            console.log(element.price)
        });

        const formDataWithProducts = {
            ...formData,
            products: simplifiedProducts
        };

        try {
            const response = await axios.post(`${apiUrl}/PayU_API/Create_an_Order`, formDataWithProducts, {
                headers: { "Content-Type": "application/json" }
            });
            console.log("Odpowiedź z serwera:", response.data);
            // Opcjonalnie: Wyczyść koszyk po udanym zamówieniu
            // setValue([]);
            //alert(t("order.success")); // Powiadomienie o sukcesie
            //alert("Oto link do płatoności: \n"+ response.data);
            window.location.href=response.data;
        } catch (error) {
            console.error("Błąd wysyłania zamówienia:", error);
            alert(t("errors.orderFailed"));
        }
    };

    // Funkcja obsługująca usunięcie produktu
    const handleRemoveItem = (id) => {
        removeItem(id);
    };

    return (
        <>
        
        <Container className="py-5" style={{marginTop:"200px"}}>
            <h1 className="mb-4 text-center">{t("order.title")}</h1>
            <Row className="g-5">
                {/* FORMULARZ */}
                <Col xs={12} lg={6}>
                    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                        <h4 className="mb-3">{t("order.customerDetails")}</h4>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("order.name")}</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("order.email")}</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("order.phone")}</Form.Label>
                            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("order.nip")}</Form.Label>
                            <Form.Control type="text" name="nip" value={formData.nip} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("order.regon")}</Form.Label>
                            <Form.Control type="text" name="regon" value={formData.regon} onChange={handleChange} />
                        </Form.Group>

                        <h4 className="mt-4 mb-3">{t("order.shippingDetails")}</h4>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>{t("order.street")}</Form.Label>
                                <Form.Control type="text" name="street" value={formData.street} onChange={handleChange} required />
                            </Col>
                            <Col>
                                <Form.Label>{t("order.homenr")}</Form.Label>
                                <Form.Control type="text" name="homenr" value={formData.homenr} onChange={handleChange} required />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>{t("order.city")}</Form.Label>
                                <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
                            </Col>
                            <Col>
                                <Form.Label>{t("order.postcode")}</Form.Label>
                                <Form.Control type="text" name="postcode" value={formData.postcode} onChange={handleChange} required />
                            </Col>
                        </Row>

                        <Button type="submit" variant="primary" className="mt-3 w-100">{t("order.submit")}</Button>
                       
                    </Form>
                </Col>

                {/* KOSZYK */}
                <Col xs={12} lg={6}>
                    <div className="p-4 border rounded shadow-sm bg-white">
                        <h4>{t("order.summary")}</h4>
                        {loading ? (
                            <>                
                            {/*<p>{t("cart.loading")}</p>*/} 
                            <Spinner animation="border" variant="danger" />
                            </>
                        ) : error ? (
                            <p>{t("errors.apiFailed")}</p>
                        ) : products.length === 0 ? (
                            <p className="text-muted">{t("cart.empty")}</p>
                        ) : (
                            <>
                                {products.map((product) => (
                                    <div key={product.id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="me-3"
                                            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                                        />
                                        <div>
                                            <p className="mb-1"><strong>{product.name}</strong></p>
                                            <p className="mb-0">{t("order.quantity")}: {product.quantity} | {t("order.price")}: {product.price} {t("cart.currency")}</p>
                                            <Button
                                                variant="link"
                                                className="p-0 text-danger"
                                                onClick={() => handleRemoveItem(product.id)}
                                            >
                                                {t("cart.remove")}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-4">
                                    <h5>{t("order.total")}: {orderSum.toFixed(2)} {t("cart.currency")}</h5>
                                </div>
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
        <ToastContainer position="top-end" className="p-3" style={{ marginTop: "50px" }}>
          <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
        </>
    );
}

export default function Sending() {
    return (
        <>
            <Navbar_v2></Navbar_v2>
            <SendOrder />
            <Footer />
        </>
    );
}