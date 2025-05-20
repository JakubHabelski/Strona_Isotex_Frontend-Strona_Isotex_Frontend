import Navbar from "../../../components/Navbar_v2/Navbar";
import Footer from '../../../components/Footer';
import { Col, Image, Row, Spinner } from "react-bootstrap";
import style from './MainPageShop.module.css';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import axios from "axios";

function MainPageShopMain() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [categories, setCategories] = useState([]);
  const [subcategoriesbycat, setSubcategoriesbycat] = useState([]);
  const [subcatbottomlist, setSubcatbottomlist] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [subcatBottomList, SetSubcatBottomList] = useState('');
  const [showLists, setShowLists] = useState({});
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState(null);

  const listRefs = useRef({});
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios.get('http://192.168.68.103:8080/Category_API/GetCategories')
      .then(async (response) => {
        const categoriesData = response.data;
        const categoriesWithSub = await Promise.all(
          categoriesData.map(async (cat) => {
            let subcategories = [];
            try {
              const subRes = await axios.get('http://192.168.68.103:8080/Category_API/GetSubCategoriesByCategory', {
                params: { CategoryId: cat.id }
              });
              subcategories = subRes.data;
            } catch (e) {
              subcategories = [];
            }
            // Dynamiczny label wg języka
            const label = i18n.language === 'en' ? cat.LabelEN : cat.LabelPL;
            return {
              key: cat.id,
              icon: cat.icon_url,
              image: '/assets/materials/fabrics/glass/Silikon_szary.jpg',
              label,
              arrowId: `arrow_${cat.id}`,
              subcategories: subcategories.map(sub => ({
                key: sub.id,
                label: i18n.language === 'en' ? sub.LabelEN : sub.LabelPL
              }))
            };
          })
        );
        setCategories(categoriesWithSub);

        // Domyślnie wszystkie listy zwinięte
        const initialShowLists = {};
        categoriesWithSub.forEach(cat => {
          initialShowLists[cat.key] = false;
        });
        setShowLists(initialShowLists);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania kategorii:', error);
        setLoading(false);
      });
  }, [i18n.language]);

  useEffect(() => {
    if (selectedCat) {
      axios.get('http://192.168.68.103:8080/Category_API/GetSubCategoriesByCategory', {
        params: { CategoryId: selectedCat }
      })
        .then((response) => {
          setSubcategoriesbycat(response.data);
        })
        .catch((error) => {
          setSubcategoriesbycat([]);
        });
    }
  }, [selectedCat]);


  const toggleList = (key, arrowId) => {
    setShowLists((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      const arrow = document.getElementById(arrowId);
      if (arrow) {
        arrow.style.transition = 'transform 0.3s';
        arrow.style.transform = newState[key] ? 'rotate(90deg)' : 'rotate(0deg)';
      }
      return newState;
    });
  };

  const showBottomList = (key) =>{
    console.log(key)
    axios.get('http://192.168.68.103:8080/Category_API/GetSubCategoriesByCategory', {
      params : { CategoryId: key}
    })
      .then((response) =>{
        console.log("setSubcatbottomlist: ",response.data)
        setSubcatbottomlist(response.data)
      })
  }
  const handleSelectSubCatBottomList = (key) =>{
    setSelectedSubCat(key);
    console.log(key)
    axios.get(`${apiUrl}/products/subcategory/${key}/pl`)
    .then((response) =>{
      console.log(response.data)
      setProductList(response.data)
    })
  }


  useEffect(() => {
    Object.keys(listRefs.current).forEach((key) => {
      const ref = listRefs.current[key];
      if (ref) {
        ref.style.maxHeight = showLists[key] ? `${ref.scrollHeight}px` : '0';
      }
    });
  }, [showLists]);

  return (
    <Row style={{ margin: 0 }}>
      <Col xs={12} md={2} className={style.MainPageShopLinksContainer}>
        {loading ? (
          <>
          <Spinner animation="border" role="status">
            
          </Spinner><span  style={{color: "black"}}> &nbsp; Loading...</span>
          </>
          
        ) : (
          categories.map((category) => (
            <div key={category.key} className={style.MainPageShopLinks}>
              <div
                style={{ cursor: 'pointer' }}
                className={style.MainCategory}
                
              >
                <Image src={category.icon} alt={category.label} width={32} height={32} />
                <h3 onClick={() => showBottomList(category.key)}>{category.label}</h3>
                <Image
                  src="/assets/icons/right-arrow.png"
                  id={category.arrowId}
                  alt="Arrow"
                  width={32}
                  height={32}
                  onClick={() => toggleList(category.key, category.arrowId)}
                />
              </div>
              <div
                ref={(el) => (listRefs.current[category.key] = el)}
                className={`${style.subcategorylist} ${showLists[category.key] ? style.open : ''}`}
              >
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.key} className={style.listitem}>
                    <div className={style.bar}></div>
                    <p>{subcategory.label}</p>
                    <Image src="/assets/icons/right-arrow.png" alt="Arrow" width={32} height={32} onClick={() => navigate(`/Sklep/${subcategory.key}`)}/>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </Col>
      <Col xs={12} md={10}>
        <div style={{ width: '100%', padding: '20px' }}>
          <ImageCarousel />
          <div>
            <h5 style={{fontWeight: "lighter", margin: "20px 0px"}}>
              {subcatbottomlist.length > 0 && subcatbottomlist[0].categoryShowDTO
                ? (i18n.language === "en"
                    ? subcatbottomlist[0].categoryShowDTO.LabelEN
                    : subcatbottomlist[0].categoryShowDTO.LabelPL)
                : null}
            </h5>
            <div className={style.MainCategoryList}>
              {selectedSubCat && productList.length > 0 ? (
                productList.map((product) => (
                  <div key={product.id}>
                    {product.id}
                    {/* Możesz tu dodać więcej informacji o produkcie */}
                  </div>
                ))
              ) : subcatbottomlist && subcatbottomlist.length > 0 ? (
                subcatbottomlist.map((subcat) => (
                  <div
                    className={style.MainCategoryCard}
                    key={subcat.id}
                    onClick={() => handleSelectSubCatBottomList(subcat.id)}
                  >
                    <h5>{i18n.language === "en" ? subcat.LabelEN : subcat.LabelPL}</h5>
                    <p>{subcatbottomlist.length}</p>
                    <img src={subcat.photo_url} />
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className={style.FeaturedProducts}>
            <h2>{t('MainPageShop.FeaturedProducts.Title')}</h2>
            <div className={style.ProductList}>
           
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default function MainPageShop() {
  return (
    <>
      <Navbar />
      <MainPageShopMain />
      <Footer />
    </>
  );
}