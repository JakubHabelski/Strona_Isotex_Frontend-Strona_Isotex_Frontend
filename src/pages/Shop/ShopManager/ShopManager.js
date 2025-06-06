import { ListGroup } from "react-bootstrap";
import Footer from "../../../components/Footer";
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";


function ShopManagerPage(){
    return(
    <div style={{width: "min(1500px, 90%)", margin: "auto"}}>
    <h1>Zarządzamie Sklepem</h1>
    <ListGroup>
        <ListGroup.Item>
           <a href="/AddProduct"> Dodawanie produktów</a>
        </ListGroup.Item>
        <ListGroup.Item>
           <a href="/EditProducts"> Edycja produktów</a>
        </ListGroup.Item>
        <ListGroup.Item>
           <a href="/check-order"> Sprawdzanie zamówienia</a>
        </ListGroup.Item>
    </ListGroup>
    </div>
    )
}




export default function ShopManager() {
  return (
    <>
    <Navbar_v2/>
    <ShopManagerPage/>
    <Footer/>
    </>
  );
}