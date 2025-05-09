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
        fetch("http://192.168.68.111:8080/PayU_API/Create_an_Order") // zmień na właściwy URL, jeśli inny
        .then(response => response.text()) // bo zwracasz String (redirectUri)
        .then(data => {
            console.log("Redirect URI:", data);
            setRedirectUri(data);
        })
        .catch(error => console.error("Błąd podczas pobierania:", error));
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