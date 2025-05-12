import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";
import axios from "axios";
import { Button, FormControl, Table } from "react-bootstrap";



function EditProductsList() {
  const [products, setProducts] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/list`)
      .then(res => setProducts(res.data));
  }, [apiUrl]);

  const handleEditClick = (product) => {
    setEditRowId(product.id);
    setEditedProduct({ ...product }); // kopiujemy dane produktu do edycji
  };

  const handleInputChange = (e, field, langIndex = null, isTranslation = false) => {
    const value = e.target.value;
    setEditedProduct(prev => {
      const updated = { ...prev };
      if (isTranslation && langIndex !== null) {
        updated.translations[langIndex][field] = value;
      } else {
        updated[field] = value;
      }
      return updated;
    });
  };

  const renderCell = (product, field, langIndex = null, isTranslation = false) => {
    if (editRowId === product.id) {
      const value = isTranslation ? editedProduct.translations[langIndex][field] : editedProduct[field];
      return (
        <FormControl
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e, field, langIndex, isTranslation)}
        />
      );
    } else {
      return isTranslation ? product.translations[langIndex][field] : product[field];
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Nazwa PL</th>
          <th>Nazwa EN</th>
          <th>Opis PL</th>
          <th>Opis EN</th>
          <th>Cena</th>
          <th>Stan magazynowy</th>
          <th>Kategoria</th>
          <th>Podkategoria</th>
          <th>Zdjęcie</th>
          <th>Edytuj</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{renderCell(product, "name", 0, true)}</td>
            <td>{renderCell(product, "name", 1, true)}</td>
            <td>{renderCell(product, "description", 0, true)}</td>
            <td>{renderCell(product, "description", 1, true)}</td>
            <td>{renderCell(product, "price")}</td>
            <td>{renderCell(product, "stock_quantity")}</td>
            <td>{renderCell(product, "category")}</td>
            <td>{renderCell(product, "subcategory")}</td>
            <td>{renderCell(product, "image_url")}</td>
            <td>
              {editRowId === product.id ? (
                <Button variant="success" onClick={() => console.log("Zapisz", editedProduct)}>
                  Zapisz
                </Button>
              ) : (
                <Button onClick={() => handleEditClick(product)}>Edytuj</Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default function EditProducts(){
    return(
        <>
        <Navbar_v2></Navbar_v2>
        <EditProductsList></EditProductsList>
        <Footer></Footer>
        </>
    )
}