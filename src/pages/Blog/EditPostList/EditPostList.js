import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";
import { apiURL } from '../../../config';
import axios from "axios";
import style from '../BlogMain/BlogMain.module.css'
import ImageComponent from "../../../components/ImageComponent/ImageComponent";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function BlogList(){

    const [blogList, setBlogList] = useState([]);
    const [listLoaded, setListLoaded] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    async function handlePostLoaded (res) {
        console.log('Dane z API:', res.data); // Debug: loguj dane
        setBlogList(res.data || []); // Ustaw listę
        setListLoaded(true);
    };

    useEffect(() => {
        setListLoaded(false);
        setError(null); // Reset błędu
        axios
        .get(`${apiURL}/Blog/GetAllPosts`)
        .then(handlePostLoaded) // Chain: przekaż funkcję, nie wywołaj od razu
        .catch((err) => {
            console.error('Błąd:', err);
            setError('Nie udało się pobrać listy postów'); // Poprawiony komunikat
            setListLoaded(true);
        });
    }, []);


    async function deletePost(id) {
        console.log(id)
        try{
            await axios.delete(`${apiURL}/Blog/DeletePost/${id}`)
                .then(res => {
                    setListLoaded(false);
                    setError(null); // Reset błędu
                    axios
                    .get(`${apiURL}/Blog/GetAllPosts`)
                    .then(handlePostLoaded) // Chain: przekaż funkcję, nie wywołaj od razu
                    .catch((err) => {
                        console.error('Błąd:', err);
                        setError('Nie udało się pobrać listy postów'); // Poprawiony komunikat
                        setListLoaded(true);
                    });
                })
        } catch{

        }
    }

    const getTranslatedLabel = (item) =>
        i18n.language === "en"
        ? item.LabelEN
        : i18n.language === "de"
        ? item.LabelDE
        : item.LabelPL;

    if (error) return <div style={{margin:" auto", color: "red"}}>Błąd: {error}</div>;
    if (!listLoaded) return <div style={{margin:" auto", color: "red"}}><Spinner></Spinner></div>;
    
    return(
        <>
        <div className={style.blogContainer}>
            <div className={style.BlogMain}>
                {blogList.map((post, index) => (
                    <div key={index} className={style.blogPost}>
                        {post.blogPostPhotoURL && (
                            <ImageComponent
                                src={post.blogPostPhotoURL}
                                blurhash={post.blurHash}
                                width={'300px'} height={'300px'}
                            />
                        )}
                        <Button 
                            variant="danger"
                            onClick={() =>deletePost(post.postID)}
                            >Usuń post
                        </Button>
                        <h3 className={style.blogPostTag}>{getTranslatedLabel(post)}</h3>
                        <h3 onClick={() => navigate(`/EditPost/${post.postID}`)}>{post.postTitle || 'Brak tytułu'}</h3>                        
                    </div>
                ))}
            </div>   
        </div>
        </>
    )
}





export default function EditPostList(){    


    return(
        <>
        <Navbar_v2/>
        <BlogList/>
        <Footer/>
        </>
    )
}