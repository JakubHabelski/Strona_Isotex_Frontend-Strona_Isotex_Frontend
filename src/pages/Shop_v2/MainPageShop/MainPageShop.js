import Navbar from "../../../components/Navbar_v2/Navbar";
import Footer from "../../../components/Footer";
import { Breadcrumb, Button, Card, Col, Image, Modal, Placeholder, Row, Spinner, Toast, ToastContainer } from "react-bootstrap";
import style from "./MainPageShop.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import axios from "axios";
import { useLocalStorage } from "../../../utils/localStorage";

function MainPageShopMain() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showLists, setShowLists] = useState({});
  const [modalImage, setModalImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [categoriesLoading, setCcategoriesLoading] = useState(false);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [pendingCat, setPendingCat] = useState([]);
  const [pendingSubCat, setPendingSubCat] = useState([])
  const [pendingProducts, setPendingProducts] = useState([]);


  const listRefs = useRef({});
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Helper to get translated label
  const getTranslatedLabel = (item) => {
    if (i18n.language === "en") return item.LabelEN;
    if (i18n.language === "de") return item.LabelDE;
    return item.LabelPL;
  };


  // Fetch categories and their subcategories
  useEffect(() => {
    setCcategoriesLoading(true);
    axios
      .get(`/api/Category_API/GetCategories`)
      .then(async (response) => {
        if (!Array.isArray(response.data)) {
          throw new Error("Dane kategorii nie są tablicą");
        }
        const categoriesData = response.data;
        const categoriesWithSub = await Promise.all(
          categoriesData.map(async (cat) => {
            const subRes = await axios
              .get(`api/Category_API/GetSubCategoriesByCategory`, {
                params: { CategoryId: cat.id },
              })
              .catch(() => ({ data: [] }));
            return {
              key: cat.id,
              icon: cat.icon_url,
              image: cat.photo_url,
              label: getTranslatedLabel(cat),
              subcategories: subRes.data.map((sub) => ({
                key: sub.id,
                label: getTranslatedLabel(sub),
                photo_url: sub.photo_url,
                product_count: sub.product_count || 0,
              })),
            };
          })
        );
        setPendingCat(categoriesWithSub); // Zapisz do pendingCat zamiast categories
        setShowLists(categoriesWithSub.reduce((acc, cat) => ({ ...acc, [cat.key]: false }), {}));
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania kategorii:", error);
        setPendingCat([]);
        setCcategoriesLoading(false);
      });
  }, [i18n.language]);

  // Load category images
  useEffect(() => {
    if (pendingCat.length > 0) {
      let loaded = 0;
      const total = pendingCat.length;
      pendingCat.forEach((cat) => {
        if (cat.image) { // Sprawdź, czy photo_url istnieje
          const img = new window.Image();
          img.src = cat.image;
          img.onload = img.onerror = () => {
            loaded += 1;
            if (loaded === total) {
              setCategories(pendingCat);
              setCcategoriesLoading(false);
              setPendingCat([]);
            }
          };
        } else {
          loaded += 1;
          if (loaded === total) {
            setCategories(pendingCat);
            setCcategoriesLoading(false);
            setPendingCat([]);
          }
        }
      });
    }
  }, [pendingCat]);

  // Fetch subcategories and products when category or subcategory changes
  useEffect(() => {
    if (selectedCategory) {
      setSubcategoriesLoading(true);
      axios
        .get(`api/Category_API/GetSubCategoriesByCategory`, {
          params: { CategoryId: selectedCategory.key },
        })
        .then((response) => {
          setPendingSubCat(response.data);
          if (!pendingSubCat) setProducts([]);
        })
        .catch(() => setSubcategories([]))
       /// .finally(() => setSubcategoriesLoading(false));
    } else {
      setSubcategories([]);
      setProducts([]);
     // setSubcategoriesLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() =>{
    if(pendingSubCat.length > 0){
      let loaded = 0;
      pendingSubCat.forEach((subCat) =>{
        const img = new window.Image();
        img.src = subCat.photo_url;
        img.onload = img.onerror = () =>{
          loaded += 1;
          if(loaded === pendingSubCat.length){
            setSubcategories(pendingSubCat);
            setSubcategoriesLoading(false);
            setPendingSubCat([]);
          }
        }
      })
    }
  }, [pendingSubCat])

  useEffect(() => {
    if (selectedSubcategory) {
      setProductsLoading(true);
      axios
        .get(`api/products/subcategory/${selectedSubcategory}/${i18n.language}`)
        .then((response) => {
          setPendingProducts(response.data);
        })
        .catch(() => {
          setProducts([]);
          setProductsLoading(false);
        });
    } else {
      setProducts([]);
      setProductsLoading(false);
    }
  }, [selectedSubcategory, i18n.language]);

  useEffect(() => {
    if (pendingProducts.length > 0) {
      let loaded = 0;
      pendingProducts.forEach((product) => {
        const img = new window.Image();
        img.src = product.imageUrl;
        img.onload = img.onerror = () => {
          loaded += 1;
          if (loaded === pendingProducts.length) {
            setProducts(pendingProducts);
            setProductsLoading(false);
            setPendingProducts([]); // czyść tymczasowy stan
          }
        };
      });
    }
  }, [pendingProducts]);

  // Toggle subcategory list visibility
  const toggleList = (key) => {
    setShowLists((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle category selection
  const handleCategorySelect = (key, label) => {
    setSelectedCategory({ key, label });
    setSelectedSubcategory(null);
    setProducts([]);
  };

  const handleSubcategorySelect = (subKey, catKey) => {
    setProductsLoading(true);
    if (selectedCategory?.key !== catKey) {
      setSelectedCategory({ key: catKey, label: categories.find(c => c.key === catKey)?.label });
      setSelectedSubcategory(subKey);
    } else {
      setSelectedSubcategory(subKey);
    }
  };

  // Handle image modal
  const handleImageClick = (imageUrl, title) => {
    setModalImage(imageUrl);
    setModalTitle(title);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage("");
    setModalTitle("");
  };

  // Add product to cart
  const addToCart = (product) => {
    console.log("addToCart:",product)
    setCartItems({ id: product.id, price: product.price, name: product.name });
    setToastMessage(t("cart.added", { name: product.name }));
    setShowToast(true);
  };

  // Update subcategory list height
  useEffect(() => {
    Object.entries(listRefs.current).forEach(([key, ref]) => {
      if (ref) ref.style.maxHeight = showLists[key] ? `${ref.scrollHeight}px` : "0";
    });
  }, [showLists]);

  // Render category list item
  const renderCategory = (category) => (
    <div key={category.key} className={style.MainPageShopLinks}>
      <div className={style.MainCategory} onClick={() => handleCategorySelect(category.key, category.label)}>
        <Image src={category.icon} alt={category.label} width={32} height={32} />
        <h3>{category.label}</h3>
        <Image
          src="/assets/icons/right-arrow.png"
          alt="Arrow"
          width={32}
          height={32}
          className={`${style.arrow} ${showLists[category.key] ? style.arrowOpen : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleList(category.key);
          }}
        />
      </div>
      <div
        ref={(el) => (listRefs.current[category.key] = el)}
        className={`${style.subcategorylist} ${showLists[category.key] ? style.open : ""}`}
      >
        {category.subcategories.map((subcategory) => (
          <div key={subcategory.key} className={style.listitem}>
            <div className={style.bar}></div>
            <p
              onClick={() => handleSubcategorySelect(subcategory.key, category.key)}
              style={{cursor: "pointer"}}
            >
              {subcategory.label}
            </p>
          </div>
        ))}
              </div>
    </div>
  );
  const renderCategory2 = (category) => (
    <div key={category.key} className={style.MainPageShopLinks}>
      <div className={style.MainCategoryCard} onClick={() => handleCategorySelect(category.key, category.label)}>
        <div className={style.CardText}>
            <h5>{category.label}</h5>
            
          </div>
          <img src={category.image}  />        
        
      </div>
              
    </div>
    
  );

  // Render product card
  const renderProduct = (product) => (
    <Card
      key={product.id}
      className={`${style.card} ${product.stockQuantity === 0 ? style.outOfStock : ""}`}
      style={{ backgroundColor: "#f8f9fa", border: "none" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "lightgray",
          borderRadius: "var(--bs-border-radius)",
          aspectRatio: "1/1",
        }}
      >
        <Card.Img
          variant="top"
          src={product.imageUrl}
          style={{  objectFit: "cover" }}
          onClick={() => handleImageClick(product.imageUrl, product.name)}
        />
      </div>
      <Card.Body onClick={() => navigate(`/Sklep/${product.category}/${product.id}`)}>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price} PLN</Card.Text>
        {product.stockQuantity === 0 && (
          <span className={style.outOfStockText}>{t("products.outOfStock")}</span>
        )}
      </Card.Body>
      <Button
        variant="primary"
        onClick={() => addToCart(product)}
        style={{ margin: "15px" }}
        disabled={product.stockQuantity === 0}
      >
        {product.stockQuantity === 0 ? t("products.unavailable") : t("products.addToCart")}
      </Button>
    </Card>
  );

  // Renderuje siatkę kategorii (gdy nie wybrano subkategorii)
  function renderCategoriesGrid() {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
        justifyContent: "space-between"
      }}>
        {categories.map(renderCategory2)}
      </div>
    );
  }

  // Renderuje siatkę subkategorii (gdy wybrano kategorię, ale nie subkategorię)
  function renderSubcategoriesGrid() {
    return (
      <div className={style.MainCategoryList}>
        {subcategories.map((subcat) => (
          <div
            className={style.MainCategoryCard}
            key={subcat.id}
            onClick={() => handleSubcategorySelect(subcat.id, selectedCategory?.key)}
          >
            <div className={style.CardText}>
              <h5>{getTranslatedLabel(subcat)}</h5>
              <p>Ilość produktów: {subcat.product_count}</p>
            </div>
            <img src={subcat.photo_url} alt={getTranslatedLabel(subcat)} />
          </div>
        ))}
      </div>
    );
  }

  // Renderuje produkty (gdy wybrano subkategorię)
  function renderProductsList() {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
        justifyContent: "space-between"
      }}>
        {productsLoading ? (
          Array.from({ length: pendingProducts.length }).map((_, idx) => (
            <Card
              key={idx}
              className={`${style.card}`}
              style={{ backgroundColor: "#f8f9fa", border: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "lightgray",
                  borderRadius: "var(--bs-border-radius)",
                  aspectRatio: "1/1",
                }}
              >
                <Placeholder  animation="glow">
                      <div style={{display:"flex", height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
                        <Placeholder xs={12} style={{display:"flex", height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}/>
                      </div>
                       
                    </Placeholder>
              </div>
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
              </Card.Body>
              <Placeholder.Button variant="primary" xs={6} style={{ margin: "15px" }} />
            </Card>
          ))
        ) : products.length > 0 ? (
          products.map(renderProduct)
        ) : (
          <div style={{
            gridColumn: "1/-1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 200
          }}>
            <span style={{ color: "black", marginLeft: 8 }}>Brak produktów</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
    <ImageCarousel />
    <div className={style.MainPageShopContainer}>
      <Row style={{minHeight: "500px", marginBottom: "100px"}} className={style.MainPageShopRow}>
      {
      /*
      <Col xs={12} lg={3} className={style.MainPageShopLinksContainer}>
        {loading ? (
          <div>
            <Spinner animation="border" role="status" />
            <span style={{ color: "black" }}> Loading...</span>
          </div>
        ) : (
          categories.map(renderCategory)
        )}
        
        
      </Col>
      */}
      
      <Col  className={style.MainPageShopProducts}>
        <div style={{ width: "100%", padding: "0 20px 0"}}>
          
          <Breadcrumb>
            <Breadcrumb.Item
              href="#"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setProducts([]);
              }}
            >
              Home
            </Breadcrumb.Item>
            {selectedCategory && (
              <Breadcrumb.Item
                href="#"
                active={!selectedSubcategory}
                onClick={() => !selectedSubcategory || setSelectedSubcategory(null)}
              >
                {categories.find((cat) => cat.key === selectedCategory.key)?.label || selectedCategory.label}
              </Breadcrumb.Item>
            )}
            {selectedSubcategory && (
              <Breadcrumb.Item active>
                {
                  subcategories.find((sub) => sub.id === selectedSubcategory)
                    ? subcategories.find((sub) => sub.id === selectedSubcategory)[i18n.language === "en" ? "LabelEN" : "LabelPL"]
                    : (
                      <span style={{ display: "inline-flex", alignItems: "center" }}>
                        <Spinner animation="border" size="sm" role="status" style={{ marginRight: 8 }} />
                        <span style={{ color: "black" }}>Loading...</span>
                      </span>
                    )
                }
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
          <div>
          {/* Kategorie (gdy nie wybrano kategorii) */}
          {!selectedCategory && (
            categoriesLoading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
                <Spinner animation="border" role="status" />
                <span style={{ color: "black", marginLeft: 8 }}>Loading...</span>
              </div>
            ) : (
              renderCategoriesGrid()
            )
          )}

          {/* Subkategorie (gdy wybrano kategorię, ale nie subkategorię) */}
          {selectedCategory && !selectedSubcategory && (
            subcategoriesLoading
              ? 
              <div className={style.MainCategoryList}>
                {Array.from({length: pendingSubCat.length}).map((_, idx) => (
                  <div key={idx} className={style.MainCategoryCard}>
                    <div className={style.CardText}>
                      <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={12}/>
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={12}/>
                        <Placeholder xs={12}/>
                        <Placeholder xs={12}/>
                      </Placeholder>
                    </div>
                    <Placeholder  animation="glow">
                      <div style={{display:"flex", height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
                        <Placeholder xs={12} style={{display:"flex", height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}/>
                      </div>
                       
                    </Placeholder>
                    
                  </div>
                ))}
              </div>
              : renderSubcategoriesGrid()
        )}

          {/* Produkty (gdy wybrano subkategorię) */}
          {selectedSubcategory && renderProductsList()}
          </div>
        </div>
      </Col>

      </Row>
      
      <Modal show={showModal} onHide={handleCloseModal} centered size="xl" className={style.modal_custom}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalImage} alt="Product" className={style.modal_custom_img} />
        </Modal.Body>
      </Modal>
      <ToastContainer position="top-end" className="p-3" style={{ marginTop: "50px" }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
    </>
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