// Główna domena dla frontendu
const domain = 'testfunkcjonalonscisklepu.pl'; 
const baseURL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000' 
  : `https://${domain}`;

// URL dla API
const apiURL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080' 
  : `https://${domain}/api`;

// Stałe dla obrazów i favicona
const logoURL = `${baseURL}/images/design/logo.webp`;
const faviconURL = `${baseURL}/assets/logo.png`;

export { baseURL, apiURL, logoURL, faviconURL };