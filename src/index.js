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
import Check_order from './pages/Shop/Check_order/Check_order';
import Check_order_form from './pages/Shop/Check_order/Check_order_form/Check_order_form';
import MainPageShop from './pages/Shop_v2/MainPageShop/MainPageShop';
import ShopManager from './pages/Shop/ShopManager/ShopManager';
import AboutUs from './pages/AboutUs/AboutUs';
import Home from './pages/Home/Home';
import Technology from './pages/AboutUs/Technology/Technology';
import ScrollToTop from './utils/ScrollToTop';
import Fastenings from './pages/Fastenings/Fastenings';
import ProjectsGallery from './pages/ProjectsGallery/ProjectsGallery';
import AddProduct from './pages/Shop/ShopManager/AddProduct/AddProduct';
import EditProducts from './pages/Shop/ShopManager/EditProducts/EditProducts';
import ManageCategories from './pages/Shop/ShopManager/ManageCategories/ManageCategories';
import ManageSubCategories from './pages/Shop/ShopManager/ManageSubCategories/ManageSubCategories';
import EditCategory from './pages/Shop/ShopManager/EditCategory/EditCategory';
import EditSubCagegory from './pages/Shop/ShopManager/EditSubCategory/EditSubCagegory';


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <CartProvider>
  <BrowserRouter>
  <ScrollToTop/>
    <Routes>
      <Route path="/" element={<Home />} />
      

      ## Fiber
      <Route path='/fabrics' element={<Fabrics />} />
      <Route path='/fabrics/glass' element={<Glass />} />
      <Route path='/fabrics/aramid' element={<Aramid />} />
      ## Filling
      <Route path='/wypelnienia' element={<Filling />} />
      <Route path='/wypelnienia/welna-mineralna' element={<MineralWool />} />
      <Route path='/wypelnienia/welna-ceramiczna' element={<Ceramic_wool />} />
      <Route path='/wypelnienia/mata-szklana' element={<Glass_Mat/>} />

      ## Fastenings
      <Route path='/Fastenings' element={<Fastenings/>} />

      ## Contact
      <Route path="/kontakt" element={<Contact />} />
      <Route path="/joinus" element={<JoinUsPage />} />

      ## About
      <Route path='/AboutUs' element={<AboutUs/>} />
      <Route path='/AboutUs/Technology' element={<Technology/>} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/certyfikaty" element={<CertificatePage/>} />

      ## Projects Gallery
      <Route path='/ProjectsGallery' element={<ProjectsGallery/>} />
      
      ## Shop
      <Route path="/Sklep" element={<Shop />} />
      <Route path="/Sklep/:category" element={<Product_List />} />
      <Route path="/Sklep/:category/:item" element={<ProductDetail />} />
      <Route path='/Sklep/Koszyk' element={<Cart/>}/>
      <Route path='/Sklep/Koszyk/Wysylka' element={<Sending/>} />
      <Route path='/success' element={<Success_payment/>}/>
      <Route path='/check-order' element={<Check_order/>} />
      <Route path='/check-order-form' element={<Check_order_form/>} />

      ## Shop Manager\
      <Route path='/ShopManager' element={<ShopManager/>} />      
      <Route path='/AddProduct' element={<AddProduct></AddProduct>} />
      <Route path='/EditProducts' element={<EditProducts/>} />
      <Route path='/ManageCategories' element={<ManageCategories/>} />
      <Route path='/ManageSubCategories' element={<ManageSubCategories/>} />
      <Route path='/EditCategory' element={<EditCategory/>} />
      <Route path='/EditSubCategory' element={<EditSubCagegory/>} />
      

      ## Test
      <Route path='/home' element={<Home/>} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path='/MainPageShop' element={<MainPageShop></MainPageShop>} />
    </Routes>
  </BrowserRouter>
  </CartProvider>
);

reportWebVitals();
