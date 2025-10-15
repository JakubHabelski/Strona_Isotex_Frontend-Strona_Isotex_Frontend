import axios from "axios";
import { useEffect, useState } from "react"
import { baseURL, apiURL, logoURL, faviconURL } from '../../../config';
import DOMPurify from 'dompurify';
import style from './SinglePostView.module.css'
import Footer from "../../../components/Footer";
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";
import { useParams } from "react-router-dom";


export default function SinglePostView() {
  const [blogPost, setBlogPost] = useState(null);
  const [postLoaded, setPostLoaded] = useState(false);
  const [error, setError] = useState(null);

  const { postID } = useParams();
  console.log(postID)

  useEffect(() => {
    setPostLoaded(false);
    axios
      .get(`${apiURL}/Blog/GetPost/${postID}`)
      .then((res) => {
        console.log('Dane z API:', res.data); // Debug
        setBlogPost(res.data || { postTitle: '', postBody: '<p>Brak danych</p>' });
        setPostLoaded(true);
      })
      .catch((err) => {
        console.error('Błąd:', err);
        setError('Nie udało się pobrać postu');
        setPostLoaded(true);
      });
  }, [postID]); // Zależność tylko od postId

  if (error) return <div>{error}</div>;
  if (!postLoaded || !blogPost) return <div>Ładowanie...</div>;

  return (
    <>
    <Navbar_v2/>
    <div style={{ maxWidth: '800px', margin: '200px auto 0px' }}>
      <h1>{blogPost.postTitle || 'Brak tytułu'}</h1>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogPost.postBody) }} className={style.postBody}/>
    </div>
    <Footer/>
    </>
    
  );
}