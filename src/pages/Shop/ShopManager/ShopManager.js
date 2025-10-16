import { ListGroup } from "react-bootstrap";
import Footer from "../../../components/Footer";
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";


function ShopManagerPage(){
    const {t} = useTranslation();
    return(
    
    <div style={{width: "min(1500px, 90%)", margin: "200px auto"}}>
     <Helmet>
          <title>{t("page_titles.Shop.ShopManager.ShopManager")}</title>
          <link rel="icon" type="image/png" href="/assets/logo.png" />
          <meta name="description" content="Wysokiej jakości tkaniny i maty izolacyjne od Isotex Group. Przeglądaj nasze produktu i zamawiaj online!" />
          <meta name="keywords" content="tkaniny izolacyjne, maty izolacyjne, Isotex Group, materiały ognioodporne, sklep online" />
          <meta name="robots" content="index, follow" />
          <script type="application/ld+json">{`
              {
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  "name": "Isotex Group Sklep",
                  "description": "Sklep online z tkaninami i matami izolacyjnymi od Isotex Group.",
                  "publisher": {
                      "@type": "Organization",
                      "name": "Isotex Group",
                      "logo": {
                          "@type": "ImageObject",
                          "url": "https://testfunkcjonalonscisklepu.pl/assets/logo.png"
                      }
                  }
              }
          `}</script>
      </Helmet>   
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
        <ListGroup.Item>
           <a href="/OrdersList"> Wszystkie zamówienia</a>
        </ListGroup.Item>
        <ListGroup.Item>
            <a href="/ManageCategories"> Dodawanie kategorii</a>
        </ListGroup.Item>
        <ListGroup.Item>
            <a href="/ManageSubCategories"> Dodawanie podkategorii</a>
        </ListGroup.Item>
        <ListGroup.Item>
            <a href="/EditCategory"> Edycja kategorii </a>
        </ListGroup.Item>
        <ListGroup.Item>
            <a href="/EditSubCategory"> Edycja podkategorii </a>
        </ListGroup.Item>
        <ListGroup.Item>
            <a href="/AddPost"> Dodanie postu na bloga </a>
        </ListGroup.Item>
        
        <ListGroup.Item>
            <a href="/EditPostList"> Edycja postów na blogu </a>
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