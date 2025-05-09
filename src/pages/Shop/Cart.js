import { Container, Row, Col, Button, Toast, ToastContainer } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavbarMain from "../../components/Navbar/Navbar";
import { useLocalStorage } from "../../utils/localStorage";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import Navbar_v2 from "../../components/Navbar_v2/Navbar";

function Cart_List() {
    const { t, i18n } = useTranslation();
    const [cartItems, addItem, removeItem, updateQuantity] = useLocalStorage("cartItems", []);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    // Śledzimy IDs produktów, żeby wykryć dodanie/usunięcie
    const cartItemIds = cartItems.map(item => item.id).join(",");

    useEffect(() => {
        if (cartItems.length === 0) {
            setProducts([]);
            return;
        }

        setLoading(true);
        setError(null);

        const fetchProducts = async () => {
            try {
                const ids = cartItems.map(item => item.id).join(",");
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
    }, [cartItemIds, i18n.language, apiUrl, t]); // Zależność od cartItemIds, nie cartItems

    // Synchronizacja products.quantity z cartItems.quantity
    useEffect(() => {
        setProducts(prevProducts =>
            prevProducts.map(product => ({
                ...product,
                quantity: cartItems.find(item => item.id === product.id)?.quantity || product.quantity
            }))
        );
    }, [cartItems]);

    const handleRemoveItem = (id) => {
        removeItem(id);
    };

    const orderSum = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        <Container className="py-5">
            <h2 className="mb-4">{t("cart.title")}</h2>

            {loading ? (
                <p>{t("cart.loading")}</p>
            ) : error ? (
                <p>{error}</p>
            ) : cartItems.length === 0 ? (
                <p>{t("cart.empty")}</p>
            ) : (
                <>
                    {products.map((product) => (
                        <div key={product.id} className={styles.cartItem}>
                            <img
                                src={product.imageUrl}
                                className={styles.productImage}
                                alt={product.name}
                            />
                            <div className={styles.productDetails}>
                                <p>
                                    <strong>{t("cart.product")}</strong>
                                    <br />
                                    {product.name}
                                </p>
                                <p>
                                    <strong>{t("cart.quantity")}</strong>
                                    <br />
                                    <input
                                        type="number"
                                        min={1}
                                        max={product.stockQuantity}
                                        value={product.quantity}
                                        onChange={(e) => {
                                            console.log("Input changed:", product.id, e.target.value);
                                            updateQuantity(product.id, e.target.value, product.stockQuantity);
                                        }}
                                    />
                                </p>
                                <p>
                                    <strong>{t("cart.pricePerUnit")}</strong>
                                    <br />
                                    {product.price} {t("cart.currency")}
                                </p>
                                <Button
                                    variant="danger"
                                    onClick={() => handleRemoveItem(product.id)}
                                >
                                    {t("cart.remove")}
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Row className="justify-content-end mt-5">
                        <Col className={styles.summaryBox} style={{ margin: "0" }}>
                            <h4>{t("cart.summary")}</h4>
                            <p>
                                <strong>{t("cart.total")}</strong> {orderSum.toFixed(2)} {t("cart.currency")}
                            </p>
                            <Button
                                variant="primary"
                                className="w-100"
                                onClick={() => navigate("/Sklep/Koszyk/Wysylka")}
                            >
                                {t("cart.proceedToShipping")}
                            </Button>
                        </Col>
                    </Row>
                </>
            )}

            <ToastContainer position="top-end" className="p-3" style={{ marginTop: "50px" }}>
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
}

export default function Cart() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar_v2></Navbar_v2>
            <Cart_List />
            <Footer />
        </div>
    );
}