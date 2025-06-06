import Navbar_v2 from "../../../components/Navbar_v2/Navbar";
import Footer from "../../../components/Footer"
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";
import style from "./Check_order.module.css"
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";


function OrderInfo(){
   // const { orderid } = useParams();
    const { i18n } = useTranslation();

    const [OrderInfo, SetOrderInfo] = useState({});
    const [form_order_id, Setfrom_order_id] = useState("");
    const [showCustomerInfo, setShowCustomerInfo] = useState(false);
    const [showBlankPage, setShowBlankPage] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;

    
    const handleChange = (event) =>{
        const { value } = event.target;
        Setfrom_order_id(value);        
    }
    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const res = await axios.get(`${apiUrl}/test_api/getOrder/${form_order_id}`);
        if (res.data && Object.keys(res.data).length > 0) {
        SetOrderInfo(res.data);
        setShowCustomerInfo(true);
        setShowBlankPage(false);
        } else {
        setShowCustomerInfo(false);
        setShowBlankPage(true);
        }
    } catch (error) {
        console.error(error);
        setShowCustomerInfo(false);
        setShowBlankPage(true);
    }
    };




    return(
        <>

        <div style={{marginTop:"200px"}}>
        <Form onSubmit={handleSubmit} className={style.CustomerInfo} style={{marginTop: "32px"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Podaj id zamówienia:</Form.Label>
                <Form.Control type="text" placeholder="Id zamówienia" value={form_order_id} onChange={handleChange}/>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3 w-100">Sprawdź</Button>
        </Form>

        <h1>Order Info</h1>
        {showCustomerInfo && (
        <div className={style.CustomerInfo}>
            <p>Imię i nazwisko: {OrderInfo.customerName}</p>
            <p>Email: {OrderInfo.customerEmail}</p>
            <p>Miasto:{OrderInfo.customerCity}</p>
            <p>Kod pocztowy: {OrderInfo.customerPostCode}</p>
            <p>Ulica: {OrderInfo.customerStreet}</p>
            <p>Nr domu: {OrderInfo.customerHomeNr}</p>
            <p>Łączna cena zamówienia: {OrderInfo.totalPrice?.toLocaleString('pl-PL')} PLN</p>            
            <h2>Zamówione produkty: </h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Id</th>                    
                <th>Nazwa produktu</th>
                <th>Ilość</th>
                <th>Cena</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(OrderInfo.orderProductsInfo) ? (
                    OrderInfo.orderProductsInfo.map((ProductsInfo) => {
                    // Pobierz tłumaczenie zgodnie z językiem
                    const translation = ProductsInfo.product?.translations?.find(
                        t => t.locale === i18n.language.toUpperCase()
                    );
                    return (
                        <tr key={ProductsInfo.id}>
                        <td>{ProductsInfo.product?.id}</td>
                        <td>{translation?.name || "Brak nazwy"}</td>
                        <td>{ProductsInfo.quantity}</td>
                        <td>{ProductsInfo.product?.price}</td>
                        </tr>
                    );
                    })
                ) : (
                    <tr>
                    <td colSpan={4}>Ładowanie danych lub brak produktów...</td>
                    </tr>
                )}
            </tbody>

        </Table>
        </div>
        )}
        {showBlankPage &&(
            <div className={style.CustomerInfo}>
                <p>Podaj poprawny nr zamówienia</p>
            </div>
        )}
        
        
        <div>
        
        </div>
        </div>
        
        

        
        </>
    )
}



export default function Check_order(){
    return(
        <>
        <Navbar_v2></Navbar_v2>
        <OrderInfo/>
        <Footer></Footer>
        </>
    )
}