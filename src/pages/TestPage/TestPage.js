import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import axios from "axios";
import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap";


export default function TestPage() { 

    const apiUrl = process.env.REACT_APP_API_URL;
    const [color, setColor] = useState("");
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [subcategoriesbycat, setSubcategoriesbycat] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');
    const [selectedSubCat, setSelectedSubCat] = useState('');
    
    const setBgcolor = () => {
        let elo = document.getElementById("1");
        elo.style.backgroundColor=setColor("red");
    };

    const [redirectUri, setRedirectUri] = useState(null);

    useEffect(() => {
      axios.get('http://192.168.68.103:8080/Category_API/GetCategories')
        .then((response) => {
          console.log(response.data);
          setCategories(response.data);
        })
        .catch((error) => {
          console.error('Błąd podczas pobierania kategorii:', error);
        });
    }, []);
  
  let lang = localStorage.getItem('i18nextLng');
  console.log(lang)

    useEffect(() =>{
      axios.get('http://192.168.68.103:8080/Category_API/GetSubCategories')
        .then((response) =>{
          console.log(response.data)
          setSubcategories(response.data)
        })
        .catch((error) =>{
          console.log('Błąd: ' ,error)
        });
    }, []);


    useEffect(() =>{
      if(selectedCat){axios.get('http://192.168.68.103:8080/Category_API/GetSubCategoriesByCategory', {
        params:{
          CategoryId: selectedCat
        }
      })
      .then((response) =>{
        console.log("setSubcategoriesbycat: ",response.data)
        setSubcategoriesbycat(response.data)
      })
      .catch((error) =>{
        console.log("Błąd: " , error)
        setSubcategoriesbycat([])
      });}
    }, [selectedCat]);

    const handleCategoryChange = (event) =>{
      const {name, value} = event.target;
      setSelectedCat(value)
      console.log("selectedCat: ", selectedCat)
    }
    const handleSubCategoryChange = (event) =>{
      const {name, value} = event.target;
      setSelectedSubCat(value);
      console.log("selectedsubcat: ", value);
    }

    return(
        <>
        <div>
          <p>Kategorie: </p>
          <Form>
          <Form.Label>Kategoria</Form.Label>
          <Form.Select value={selectedCat} onChange={handleCategoryChange}>
            <option value="" disabled hidden>Wybierz kategorię...</option>
            {categories.map((category) =>(
            <option name={category.id} value={category.id}>{category.LabelPL}</option>
          ))}
          </Form.Select>
          
          </Form>
          {selectedCat &&(
            <Form>
              <Form.Label>Podkategoria</Form.Label>
              <Form.Select value={selectedSubCat} onChange={handleSubCategoryChange}>
                <option value='' disabled hidden>Wybierz podkategorię</option>
                {subcategoriesbycat.map((subcategory) =>(
                  <option value={subcategory.id}>{subcategory.LabelPL}</option>
                ))}
              </Form.Select>
            </Form>
          )}
        </div>
        <div>
          <p>Podkategorie</p>
          {subcategories.map((subcategory) =>(
            subcategory.LabelPL
          ))}
        </div>
        <div>
          <p>Podkategorie by cat:</p>
          {subcategoriesbycat.map((subcategorybycat) =>(
            subcategorybycat.LabelPL
          ))}
        </div>
            <div style={{backgroundColor: "white"}} id="1">
                <h1>Test Page</h1>
                <p>This is a test page.</p>
                <button onClick={() => setColor("red")}>Test</button>
                <h1>{color}</h1>
            </div>
            <div>
      {redirectUri ? (
        <a href={redirectUri} target="_blank" rel="noopener noreferrer">
          Przejdź do płatności
        </a>
      ) : (
        <p>Ładowanie...</p>
      )}
    </div>
        </>
    )
}