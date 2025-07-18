const apiURL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8080' 
    : 'https://testfunkcjonalonscisklepu.pl/api';

export default apiURL;