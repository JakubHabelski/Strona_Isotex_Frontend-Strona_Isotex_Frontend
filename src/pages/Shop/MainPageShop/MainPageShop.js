import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Modal,
  Placeholder,
  Row,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Helmet } from "react-helmet";

import Navbar from "../../../components/Navbar_v2/Navbar";
import Footer from "../../../components/Footer";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import ImageComponent from "../../../components/ImageComponent/ImageComponent";

import { useLocalStorage } from "../../../utils/localStorage";
import apiURL from "../../../config";
import style from "./MainPageShop.module.css";

function MainPageShopMain() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [showLists, setShowLists] = useState({});
  const [modal, setModal] = useState({ show: false, image: "", title: "" });

  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const [toast, setToast] = useState({ show: false, message: "" });

  const [loading, setLoading] = useState({
    categories: false,
    subcategories: false,
    products: false,
  });

  const listRefs = useRef({});
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const getTranslatedLabel = (item) =>
    i18n.language === "en"
      ? item.LabelEN
      : i18n.language === "de"
      ? item.LabelDE
      : item.LabelPL;

  // Fetch categories with subcategories
  useEffect(() => {
    setLoading((prev) => ({ ...prev, categories: true }));
    axios
      .get(`${apiURL}/Category_API/GetCategories`)
      .then(async (response) => {
        if (!Array.isArray(response.data)) throw new Error("Invalid categories");

        const categoriesData = await Promise.all(
          response.data.map(async (cat) => {
            const subRes = await axios
              .get(`${apiURL}/Category_API/GetSubCategoriesByCategory`, {
                params: { CategoryId: cat.id },
              })
              .catch(() => ({ data: [] }));

            return {
              key: cat.id,
              icon: cat.icon_url,
              image: cat.photo_url,
              blurhash: cat.blurhash,
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

        setCategories(categoriesData);
        setShowLists(
          categoriesData.reduce((acc, cat) => ({ ...acc, [cat.key]: false }), {})
        );
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
        setCategories([]);
      })
      .finally(() =>
        setLoading((prev) => ({ ...prev, categories: false }))
      );
  }, [i18n.language]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      setProducts([]);
      return;
    }

    setLoading((prev) => ({ ...prev, subcategories: true }));
    axios
      .get(`${apiURL}/Category_API/GetSubCategoriesByCategory`, {
        params: { CategoryId: selectedCategory.key },
      })
      .then((res) => setSubcategories(res.data))
      .catch(() => setSubcategories([]))
      .finally(() =>
        setLoading((prev) => ({ ...prev, subcategories: false }))
      );
  }, [selectedCategory]);

  // Fetch products when subcategory changes
  useEffect(() => {
    if (!selectedSubcategory) {
      setProducts([]);
      return;
    }

    setLoading((prev) => ({ ...prev, products: true }));
    axios
      .get(
        `${apiURL}/products/subcategory/${selectedSubcategory}/${i18n.language}`
      )
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading((prev) => ({ ...prev, products: false })));
  }, [selectedSubcategory, i18n.language]);

  const toggleList = (key) =>
    setShowLists((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleCategorySelect = (key, label) => {
    setSelectedCategory({ key, label });
    setSelectedSubcategory(null);
    setProducts([]);
  };

  const handleSubcategorySelect = (subKey, catKey) => {
    if (selectedCategory?.key !== catKey) {
      setSelectedCategory({
        key: catKey,
        label: categories.find((c) => c.key === catKey)?.label,
      });
    }
    setSelectedSubcategory(subKey);
  };

  const addToCart = (product) => {
    setCartItems({ id: product.id, price: product.price, name: product.name });
    setToast({
      show: true,
      message: t("cart.added", { name: product.name }),
    });
  };

const renderCategoryCard = (category) => {
  console.log("category.image", category.image, "blurhash", category.blurhash);
  return (
    <div key={category.key} className={style.MainPageShopLinks}>
      <div
        className={style.MainCategoryCard}
        onClick={() => handleCategorySelect(category.key, category.label)}
      >
        <div className={style.CardText}>
          <h5>{category.label}</h5>
        </div>
        <ImageComponent src={category.image} blurhash={category.blurhash} />
      </div>
    </div>
  );
};

  const renderProductCard = (product) => (
    <Card
      key={product.id}
      className={`${style.card} ${
        product.stockQuantity === 0 ? style.outOfStock : ""
      }`}
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
        <ImageComponent src={product.imageUrl} blurhash={product.blurhash} />
      </div>
      <Card.Body
        onClick={() => navigate(`/Sklep/${product.category}/${product.id}`)}
      >
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price} PLN</Card.Text>
        {product.stockQuantity === 0 && (
          <span className={style.outOfStockText}>
            {t("products.outOfStock")}
          </span>
        )}
      </Card.Body>
      <Button
        variant="primary"
        onClick={() => addToCart(product)}
        style={{ margin: "15px" }}
        disabled={product.stockQuantity === 0}
      >
        {product.stockQuantity === 0
          ? t("products.unavailable")
          : t("products.addToCart")}
      </Button>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>{t("page_titles.Shop.Shop_v2.MainPageShop")}</title>
        <link rel="icon" type="image/png" href="/assets/logo.png" />
      </Helmet>

      <ImageCarousel />

      <div className={style.MainPageShopContainer}>
        <Row
          style={{ minHeight: "500px", marginBottom: "100px" }}
          className={style.MainPageShopRow}
        >
          <Col className={style.MainPageShopProducts}>
            <div style={{ width: "100%", padding: "0 20px" }}>
              <Breadcrumb>
                <Breadcrumb.Item
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                  }}
                >
                  Home
                </Breadcrumb.Item>
                {selectedCategory && (
                  <Breadcrumb.Item
                    active={!selectedSubcategory}
                    onClick={() => !selectedSubcategory && setSelectedSubcategory(null)}
                  >
                    {
                      categories.find((cat) => cat.key === selectedCategory.key)
                        ?.label || selectedCategory.label
                    }
                  </Breadcrumb.Item>
                )}
                {selectedSubcategory && (
                  <Breadcrumb.Item active>
                    {
                      subcategories.find((sub) => sub.id === selectedSubcategory)
                        ? getTranslatedLabel(
                            subcategories.find((sub) => sub.id === selectedSubcategory)
                          )
                        : "..."
                    }
                  </Breadcrumb.Item>
                )}
              </Breadcrumb>

              {/* Categories */}
              {!selectedCategory &&
                (loading.categories ? (
                  <Spinner animation="border" />
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    {categories.map(renderCategoryCard)}
                  </div>
                ))}

              {/* Subcategories */}
              {selectedCategory && !selectedSubcategory && (
                loading.subcategories ? (
                  <Spinner animation="border" />
                ) : (
                  <div className={style.MainCategoryList}>
                    {subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        className={style.MainCategoryCard}
                        onClick={() =>
                          handleSubcategorySelect(sub.id, selectedCategory.key)
                        }
                      >
                        <div className={style.CardText}>
                          <h5>{sub.label}</h5>
                          <p>{t("products.count", { count: sub.product_count })}</p>
                        </div>
                        <ImageComponent src={sub.photo_url} blurhash={sub.blurhash}></ImageComponent>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Products */}
              {selectedSubcategory && (
                loading.products ? (
                  <Spinner animation="border" />
                ) : products.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    {products.map(renderProductCard)}
                  </div>
                ) : (
                  <p>{t("products.noProducts")}</p>
                )
              )}
            </div>
          </Col>
        </Row>

        {/* Modal */}
        <Modal
          show={modal.show}
          onHide={() => setModal({ show: false, image: "", title: "" })}
          centered
          size="xl"
          className={style.modal_custom}
        >
          <Modal.Header closeButton>
            <Modal.Title>{modal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={modal.image}
              alt={modal.title}
              className={style.modal_custom_img}
              style={{ maxWidth: "100%", height: "auto", maxHeight: "70vh" }}
            />
          </Modal.Body>
        </Modal>

        {/* Toast */}
        <ToastContainer position="top-end" className="p-3" style={{ marginTop: "50px" }}>
          <Toast
            show={toast.show}
            onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            delay={3000}
            autohide
          >
            <Toast.Body>{toast.message}</Toast.Body>
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
