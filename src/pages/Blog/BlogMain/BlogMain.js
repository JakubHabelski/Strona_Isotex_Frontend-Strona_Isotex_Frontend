import { use, useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import Navbar_v2 from '../../../components/Navbar_v2/Navbar'
import style from './BlogMain.module.css'
import axios from 'axios';
import { apiURL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../../../components/ImageComponent/ImageComponent';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Blog(){
    const [blogList, setBlogList] = useState([]);
    const [recentPost, setRecentPost] = useState(null);
    const [listLoaded, setListLoaded] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();


    const getTranslatedLabel = (item) =>
    i18n.language === "en"
      ? item.LabelEN
      : i18n.language === "de"
      ? item.LabelDE
      : item.LabelPL;

    async function handlePostLoaded (res) {
        console.log('Dane z API:', res.data); // Debug: loguj dane
        setBlogList(res.data || []); // Ustaw listę
        setListLoaded(true);
    };

    useEffect(() => {
        setListLoaded(false);
        setError(null); // Reset błędu
        axios
        .get(`${apiURL}/Blog/GetPosts`)
        .then(handlePostLoaded) // Chain: przekaż funkcję, nie wywołaj od razu
        .catch((err) => {
            console.error('Błąd:', err);
            setError('Nie udało się pobrać listy postów'); // Poprawiony komunikat
            setListLoaded(true);
        });
    }, []); // Pusta tablica: raz przy montowaniu (apiURL stałe)

    useEffect(() =>{
        axios.get(`${apiURL}/Blog/GetMostRecentPost`)
            .then(res =>{ 
                setRecentPost(res.data)
                console.log("elomelo")
            })
            .catch((err) =>{
                console.log("Bład w pobraniu najnowszego postu: ", err)
            })
    }, [])

    if (error) return <div style={{margin:" auto", color: "red"}}>Błąd: {error}</div>;
    if (!listLoaded) return <div style={{margin:" auto", color: "red"}}><Spinner></Spinner></div>;
    if (!recentPost) return <div style={{margin:" auto", color: "red"}}><div>Ładowanie najnowszego postu...</div><Spinner></Spinner></div>;  // Dodaj to, żeby nie renderować bannera z null

    return (
        <div className={style.blogContainer}>
            <div className={style.blogBanner}>
                <ImageComponent
                    src={recentPost.blogPostPhotoURL}
                    blurhash={recentPost.blurHash}
                    height={'100%'}
                />
                <div className={style.blogBannerOverlay}>
                    <h3 className={style.blogBannerOverlayPostTag}>Izolacje</h3>
                    <h2>{recentPost.postTitle || 'Ładowanie...'}</h2>
                    <h6 className={style.blogBannerOverlayPostDate}>03.10.2025</h6>  
                </div>
            </div>
            <h1>Witaj na naszym blogu!</h1>
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
                        <h3 className={style.blogPostTag}>{getTranslatedLabel(post)}</h3>
                        <h3 onClick={() => navigate(`/Blog/${post.postID}`)}>{post.postTitle || 'Brak tytułu'}</h3>
                    </div>
                ))}
            </div>   
        </div>
    );
    }



export default function BlogMain(){


    return(
        <>
        <Navbar_v2/>
        <Blog/>
        <Footer/>
        </>
    )
}