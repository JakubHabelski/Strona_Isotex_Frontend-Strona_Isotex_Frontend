import Navbar_v2 from "../../../../components/Navbar_v2/Navbar";
import Footer from "../../../../components/Footer"
import { Button, Form } from "react-bootstrap";


function Check_order_form_prompt(){
    return(
        <>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3 w-100">Sprawdź</Button>
        </Form>
        </>
    )
}


export default function Check_order_form(){
    return(
        <>
        <Navbar_v2></Navbar_v2>
        <Check_order_form_prompt/>
        <Footer></Footer>

        </>
    )
}