import { Button, Form } from "react-bootstrap";
import Footer from "../../../../components/Footer";
import Navbar_v2 from "../../../../components/Navbar_v2/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./AddProduct.module.css";

export default function AddProduct() {
  return (
    <>
      <Navbar_v2 />
      <AddProductForm />
      <Footer />
    </>
  );
}

function AddProductForm() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const request = "http://localhost:8080/Product_API/addproduct";

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoriesByCat, setSubcategoriesByCat] = useState([]);

  const [form, setForm] = useState({
    name_pl: "",
    name_en: "",
    description_pl: "",
    description_en: "",
    price: "",
    category: "",
    subCategory: "",
    stock_quantity: "",
    photo: null,
  });

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${apiUrl}/Category_API/GetCategories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Błąd podczas pobierania kategorii:", error));
  }, [apiUrl]);

  // Fetch subcategories by selected category
  useEffect(() => {
    if (form.category) {
      axios
        .get(`${apiUrl}/Category_API/GetSubCategoriesByCategory`, {
          params: { CategoryId: form.category },
        })
        .then((response) => setSubcategoriesByCat(response.data))
        .catch((error) => setSubcategoriesByCat([]));
    }
  }, [form.category, apiUrl]);

  function handleImage(e) {
    setForm((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "dto",
      new Blob(
        [
          JSON.stringify({
            name_pl: form.name_pl,
            name_en: form.name_en,
            description_pl: form.description_pl,
            description_en: form.description_en,
            price: parseFloat(form.price),
            category: form.category,
            subCategory: form.subCategory,
            stock_quantity: parseInt(form.stock_quantity),
          }),
        ],
        { type: "application/json" }
      )
    );
    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      await axios.post(request, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Produkt dodany.");
    } catch (error) {
      console.error("Błąd wysyłki:", error);
    }
  }

  return (
    <>
      <h1>Dodaj produkt</h1>
      <Form onSubmit={handleSubmit} className={style.AddProductForm}>
        <Form.Group className="mb-3">
          <Form.Label>Nazwa Polska</Form.Label>
          <Form.Control
            type="text"
            name="name_pl"
            value={form.name_pl}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nazwa Angielska</Form.Label>
          <Form.Control
            type="text"
            name="name_en"
            value={form.name_en}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Opis Polski</Form.Label>
          <Form.Control
            type="text"
            name="description_pl"
            value={form.description_pl}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Opis Angielski</Form.Label>
          <Form.Control
            type="text"
            name="description_en"
            value={form.description_en}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cena</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Kategoria</Form.Label>
          <Form.Select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden>
              Wybierz kategorię...
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.LabelPL}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {form.category && (
          <Form.Group>
            <Form.Label>Podkategoria</Form.Label>
            <Form.Select
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Wybierz podkategorię
              </option>
              {subcategoriesByCat.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.LabelPL}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Stan magazynowy</Form.Label>
          <Form.Control
            type="number"
            name="stock_quantity"
            value={form.stock_quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Zdjęcie</Form.Label>
          <Form.Control type="file" name="photo" onChange={handleImage} required />
          {form.photo && <p>Wybrano plik: {form.photo.name}</p>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Wyślij
        </Button>
      </Form>
    </>
  );
}