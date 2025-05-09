import { useParams } from "react-router";
import Footer from "../../../components/Footer";
import NavbarMain from "../../../components/Navbar/Navbar";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../../../utils/localStorage";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import styles from "./Product_Detail.module.css";
import { useTranslation } from "react-i18next";
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";

function Product_Detail_Get() {
    const { item } = useParams();
    const [product, setProduct] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [product_list, setProductName] = useLocalStorage("cartItems", []);
    const apiUrl = process.env.REACT_APP_API_URL;
    const { t, i18n } = useTranslation();
    useEffect(() => {
      axios.get(`${apiUrl}/product/${item}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err));
    }, [item]);
  
    
    // ProductList_Get (fragment)
    const addToCart = (product) => {
      setProductName({ id: product.id }); // Dodajemy tylko id, quantity ustawiane w useLocalStorage
      setToastMessage(t('cart.added', { name: product.name }));
      setShowToast(true);
    };
      
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.productCard}>
            <div className={styles.imageContainer}>
              <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            </div>
            <div className={styles.details}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>Cena: {product.price} PLN</p>
              <Button variant="primary" className={styles.addButton} onClick={() => addToCart(product)}>
                Dodaj do koszyka
              </Button>
            </div>
          </div>
        </div>
  
        <ToastContainer position="top-end" className="p-3" style={{ marginTop: "50px" }}>
          <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  }

export default function ProductDetail() {

    
    return(
        <>
            <Navbar_v2></Navbar_v2>
            <Product_Detail_Get/>
            <Footer/>
        </>
    )
        
    
}