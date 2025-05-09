import { Button, Form } from "react-bootstrap"
import Footer from "../../components/Footer"
import Navbar_v2 from "../../components/Navbar_v2/Navbar"
import style from "./Contact.module.css"
import { form } from "motion/react-client"
import { useState } from "react"
import axios from "axios"






function ContactUs() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const request = `${apiUrl}/contact`;


    const [formData, setFormData] = useState({
        email: '',
        topic: '',
        text: ''
    })

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value })
        
    }
    console.log(formData)

    const handleSubmit = async () =>{
        const data = new FormData();
        data.append('email', formData.email);
        data.append('topic', formData.topic);
        data.append('text', formData.text);


        try{
            await axios.post(request, data, {
                headers: { "Content-Type": "application/json" }
            });

        } catch(error){

        }
    }

    return(
        <div className={style.contactUsContainer}>
            <h1>Skontaktuj się z nami!</h1>
            <div className={style.contactUsContent}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Adres e-mail</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Wpisz adres e-mail" 
                            name="email"
                            value={formData.email} 
                            onChange={handleInputChange}
                            required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTopic">
                        <Form.Label>Temat</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Wpisz temat" 
                            name="topic" 
                            value={formData.topic}
                            onChange={handleInputChange}
                            required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Wiadomość</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5} 
                            placeholder="Wpisz wiadomość" 
                            name="text" 
                            value={formData.text}
                            onChange={handleInputChange}
                            required/>
                    </Form.Group>

                    <Button  
                        type="submit" 
                        variant="outline-danger" 
                        className={`${style.contactUsButton} btn ` }>Wyślij</Button>

                </Form>
                
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.6349348736167!2d17.713546569689093!3d51.30689363662549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710064da7d2efa5%3A0x877f1ad56e03be45!2sDaszy%C5%84skiego%209A%2C%2056-500%20Syc%C3%B3w!5e1!3m2!1spl!2spl!4v1745670997885!5m2!1spl!2spl" 
                     className={style.googleMap}
                    style={{border: "0"}} 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                
                </div>
        </div>
    )
}





export default function Contact() {
    return(
        <>
            <Navbar_v2></Navbar_v2>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </>
    )
}