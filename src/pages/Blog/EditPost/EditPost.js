import { useEffect, useState } from "react";
import BlogEditorV2 from "../../../components/Blog/BlogEditorV2";
import Footer from "../../../components/Footer";
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";
import style from './EditPost.module.css'
import axios from "axios";
import { apiURL } from '../../../config';

export default function EditPost() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        axios.get(`${apiURL}/Blog/GetPost/102`)
            .then(res => {
                setContent(res.data);
                console.log(res.data);
            });
    }, []);

    return (
        <>
            <Navbar_v2 />
            <div style={{ marginTop: "200px" }}>
                {content ? (
                    <BlogEditorV2 post={content} />  // Przekaż cały obiekt
                ) : (
                    <div style={{ textAlign: "center", padding: "50px" }}>
                        Ładowanie edytora...
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}