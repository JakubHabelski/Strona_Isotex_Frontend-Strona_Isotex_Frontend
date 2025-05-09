import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Shop/Cart';
import Sending from './pages/Shop/Sending';
import Fabrics from './pages/fabrics/main_fabrics/fabrics';
import Glass from './pages/fabrics/glass/glass';
import Aramid from './pages/fabrics/aramid/aramid';
import MineralWool from './pages/filling/mineral_wool/mineral_wool';
import Filling from './pages/filling/filling_main/filling_main';
import Ceramic_wool from './pages/filling/ceramic_wool/ceramic_wool';
import Glass_Mat from './pages/filling/glass_mat/Glass_mat';
import Product_List from './pages/Shop/Product_List/Product_List';
import ProductDetail from './pages/Shop/Product_Detail/Product_Detail';
import MainPage from './pages/mainpage/mainpage';
import Contact from './pages/Contact/Contact';
import JoinUsPage from './pages/JoinUsPage/JoinUsPage';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TestPage from './pages/TestPage/TestPage';
import { CartProvider } from './components/CartContext/CartContext';
import Success_payment from './pages/Shop/Success_payment/Success_payment';
import CertificatePage from './pages/Certificate/CertifikatePage';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <CartProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      ## Fiber
      <Route path='/fabrics' element={<Fabrics />} />
      <Route path='/fabrics/glass' element={<Glass />} />
      <Route path='/fabrics/aramid' element={<Aramid />} />
      ## Filling
      <Route path='/wypelnienia' element={<Filling />} />
      <Route path='/wypelnienia/welna-mineralna' element={<MineralWool />} />
      <Route path='/wypelnienia/welna-ceramiczna' element={<Ceramic_wool />} />
      <Route path='/wypelnienia/mata-szklana' element={<Glass_Mat/>} />

      ## Contact
      <Route path="/kontakt" element={<Contact />} />
      <Route path="/joinus" element={<JoinUsPage />} />

      ## About
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/certyfikaty" element={<CertificatePage/>} />
      
      ## Shop
      <Route path="/Sklep" element={<Shop />} />
      <Route path="/Sklep/:category" element={<Product_List />} />
      <Route path="/Sklep/:category/:item" element={<ProductDetail />} />
      <Route path='/Sklep/Koszyk' element={<Cart/>}/>
      <Route path='/Sklep/Koszyk/Wysylka' element={<Sending/>} />
      <Route path='/success' element={<Success_payment/>}/>

      ## Test
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  </BrowserRouter>
  </CartProvider>
);

reportWebVitals();
