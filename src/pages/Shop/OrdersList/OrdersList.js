import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import styles from "./OrdersList.module.css";
import Footer from "../../../components/Footer";
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";

export default function OrdersList() {
  const apiUrl = process.env.REACT_APP_API_URL || "http://testfunkcjonalonscisklepu.pl/api";
  const [allOrders, setAllOrders] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(new Map());

  useEffect(() => {
    axios
      .get(`/api/getOrders`)
      .then((response) => {
        console.log("Dane zamówień:", response.data);
        setAllOrders(response.data);
        // Inicjalizacja Map z wartościami false dla każdego zamówienia
        const newShowOrderDetails = new Map();
        response.data.forEach((order) => {
          newShowOrderDetails.set(order.id, false);
        });
        setShowOrderDetails(newShowOrderDetails);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania zamówień:", error);
      });
  }, []);

  const toggleDetails = (orderId) => {
    setShowOrderDetails((prev) => {
      const newMap = new Map(prev);
      newMap.set(orderId, !newMap.get(orderId));
      return newMap;
    });
  };

  return (
    <>
    <Navbar_v2/>
    <div className={styles.container}>
      <h2 className={styles.title}>Lista zamówień</h2>
      {allOrders.length === 0 ? (
        <p className={styles.emptyMessage}>Brak zamówień</p>
      ) : (
        <Table striped bordered hover className={styles.orderTable}>
          <thead>
            <tr>
              <th>Id zamówienia</th>
              <th>Imię i nazwisko</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Miasto</th>
              <th>Ulica</th>
              <th>Kod pocztowy</th>
              <th>Status</th>
              <th>Szczegóły</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <>
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.customerEmail}</td>
                  <td>{order.customerNR}</td>
                  <td>{order.customerCity}</td>
                  <td>
                    ul. {order.customerStreet} {order.customerHomeNr}
                  </td>
                  <td>{order.customerPostCode}</td>
                  <td>{order.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      className={styles.detailsButton}
                      onClick={() => toggleDetails(order.id)}
                    >
                      {showOrderDetails.get(order.id) ? "Ukryj" : "Więcej"}
                    </Button>
                  </td>
                </tr>
                {showOrderDetails.get(order.id) && (
                  <tr className={styles.detailsRow}>
                    <td colSpan="9">
                      <Table className={styles.productTable}>
                        <thead>
                          <tr>
                            <th>ID produktu</th>
                            <th>Nazwa</th>
                            <th>Cena</th>
                            <th>Obraz</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderProductsInfo.map((productInfo) => (
                            <tr key={productInfo.product.id}>
                              <td>{productInfo.product.id}</td>
                              <td>{productInfo.product.translations[0].name}</td>
                              <td>{productInfo.product.price} PLN</td>
                              <td>
                                <img
                                  src={
                                    productInfo.product.image_url.endsWith(".jpg") &&
                                    (productInfo.product.image_url.includes("aramid-silikon") ||
                                      productInfo.product.image_url.includes("odpornosc-mechaniczna"))
                                      ? productInfo.product.image_url.replace(".jpg", ".png")
                                      : productInfo.product.image_url
                                  }
                                  alt={productInfo.product.translations[0].name}
                                  className={styles.productImage}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    <Footer/>
    </>
  );
}