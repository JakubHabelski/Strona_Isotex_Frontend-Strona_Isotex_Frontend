import { Button, Card, Modal, Row, Toast, ToastContainer } from "react-bootstrap";
import Footer from "../../../components/Footer";
import NavbarMain from "../../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from './Product_list.module.css';
import { useLocalStorage } from "../../../utils/localStorage";
import { useTranslation } from "react-i18next"; // Dodajemy hook i18next
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";

function ProductList_Get() {
    const { category } = useParams();
    const { i18n, t } = useTranslation(); // Pobieramy i18n i t
    const [products, setProducts] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [product_list, setProductName] = useLocalStorage("cartItems", []);
    const navigate = useNavigate();

    const handleImageClick = (imageUrl, title) => {
        setModalImage(imageUrl);
        setModalTitle(title);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalImage('');
        setModalTitle('');
    };

    console.log("Api URL:", apiUrl); // Debugging line
    useEffect(() => {
        axios.get(`${apiUrl}/products/subcategory/${category}/${i18n.language}`)
            .then(res => setProducts(res.data))
            .then(console.log(products))
            .catch(err => console.error(err));
    }, [category, i18n.language, apiUrl]); // Dodajemy i18n.language jako zależność

    // ProductList_Get (fragment)
    const addToCart = (product) => {
        setProductName({
          id: product.id,
          price: product.price,
          name: product.name,
        });
        setToastMessage(t("cart.added", { name: product.name }));
        setShowToast(true);
      };

    // Tłumaczenia kategorii przenosimy do plików JSON
    const translatedCategory = t(`categories.${category}`, { defaultValue: category });

    return (
        <>
            <h1>{t('products.title', { category: translatedCategory })}</h1>

            <div className={styles.grid_container}>
                {products.map(product => (
                    <Card
                        key={product.id}
                        className={`${styles.card} ${product.stockQuantity === 0 ? styles.outOfStock : ''}`}
                    >
                        <Card.Img
                            variant="top"
                            src={product.imageUrl}
                            style={{ padding: "12px", objectFit: 'contain', height: "200px" }}
                            onClick={() => handleImageClick(product.imageUrl, product.name)}
                        />
                        <Card.Body onClick={() => navigate(`/Sklep/${category}/${product.id}`)}>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.price } PLN</Card.Text>
                            {product.stockQuantity === 0 && (
                                <span className={styles.outOfStockText}>
                                    {t('products.outOfStock')}
                                </span>
                            )}
                        </Card.Body>
                        <Button
                            variant="primary"
                            onClick={() => addToCart(product)}
                            style={{ margin: "15px" }}
                            disabled={product.stockQuantity === 0}
                        >
                            {product.stockQuantity === 0 ? t('products.unavailable') : t('products.addToCart')}
                        </Button>
                    </Card>
                ))}
            </div>

            {/* Modal z pełnym obrazkiem */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="xl" className={styles.modal_custom}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={modalImage}
                        alt="Product"
                        className={styles.modal_custom_img}
                    />
                </Modal.Body>
            </Modal>

            {/* Toast - powiadomienie */}
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
        </>
    );
}

export default function Product_List() {
    return (
        <>
            <Navbar_v2></Navbar_v2>
            <ProductList_Get />
            <Footer />
        </>
    );
}