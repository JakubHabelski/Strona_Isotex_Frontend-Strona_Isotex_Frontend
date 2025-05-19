import axios from "axios";
import React, { useEffect, useState } from "react"


export default function TestPage() { 

    const apiUrl = process.env.REACT_APP_API_URL;
    const [color, setColor] = useState("");

    
    const setBgcolor = () => {
        let elo = document.getElementById("1");
        elo.style.backgroundColor=setColor("red");
    };

    const [redirectUri, setRedirectUri] = useState(null);

    useEffect(() => {
        try {
                const response =  axios.get(
                    'http://192.168.68.119:8080/Category_API/GetSubCategoriesByCategory',
                    {
                        params: { CategoryId: 2522 }
                    }
                );
               // setSubCategories(response.data);
              //  setLoading(false);
              console.log(response.data)
            } catch (err) {
              //  setError('Kurwa, coś poszło nie tak z API!');
              //  setLoading(false);
                console.error(err);
            }
    }, []);
   

    return(
        <>
        
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