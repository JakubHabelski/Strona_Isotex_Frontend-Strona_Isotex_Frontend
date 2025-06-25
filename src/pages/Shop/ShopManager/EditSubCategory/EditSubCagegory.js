import Navbar_v2 from './../../../../components/Navbar_v2/Navbar'
import Footer  from './../../../../components/Footer'
import style from './EditSubCagegory.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion } from 'react-bootstrap';

export default function EditSubCagegory(){
    const apiUrl = process.env.REACT_APP_API_URL;
    const [categories, setCategores] = useState([]);


    useEffect(() =>{
        axios.get(`${apiUrl}/Category_API/GetCategories`)
        //axios.get(`${apiUrl}/Category_API/GetCategories`)
        .then(async(response) =>{
            console.log(response.data)
            setCategores(response.data);
        })
    }, [])

    return(
        <>
        <Navbar_v2/>
        <div className={style.EditSubCagegoryForm}>
            <Accordion>
                {categories.map((cat)=>(
                    <Accordion.Item eventKey={cat.id} key={cat.id}>
                        <Accordion.Body>{cat.id}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        
        </div>
        <Footer/>
        </>
    )
}