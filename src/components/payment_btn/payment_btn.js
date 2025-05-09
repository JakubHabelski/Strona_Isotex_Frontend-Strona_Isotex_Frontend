import { useState } from 'react';

const PaymentButton = ({ product_list }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/payment/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculateTotalAmount(product_list), // Funkcja obliczająca łączną cenę zamówienia
          email: "klient@email.com", // Można dodać formularz z emailem klienta
          description: "Zamówienie nr. #123", // Może być numer zamówienia
          cart: product_list, // Wysyłamy całą zawartość koszyka
        }),
      });

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl; // Przekierowanie na stronę płatności
      }
    } catch (error) {
      console.error("Błąd podczas próby inicjacji płatności:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <button 
      onClick={handlePayment} 
      className="btn btn-success"
      disabled={isLoading}
    >
      {isLoading ? 'Trwa procesowanie płatności...' : 'Przejdź do płatności'}
    </button>
  );
};

export default PaymentButton;
