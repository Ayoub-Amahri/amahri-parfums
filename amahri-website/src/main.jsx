import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './style.css';

const TITLES = {
  '/': 'Accueil', '/shop': 'Boutique', '/men': 'Homme', '/women': 'Femme',
  '/wishlist': 'Favoris', '/cart': 'Panier', '/checkout': 'Commander',
  '/about': 'Notre univers', '/contact': 'Contact',
};

function App() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const clean = pathname.replace(/\.html$/, '') || '/';
    const label = clean.startsWith('/product') ? 'Fiche produit' : TITLES[clean] || 'AMAHRI';
    document.title = `${label} | AMAHRI Collections Parfums`;
  }, [pathname]);
  return <Layout>
    <Routes>
      <Route path="/" element={<Home/>}/><Route path="/index.html" element={<Home/>}/>
      <Route path="/shop" element={<Catalogue page="shop"/>}/><Route path="/shop.html" element={<Catalogue page="shop"/>}/>
      <Route path="/men" element={<Catalogue page="men"/>}/><Route path="/men.html" element={<Catalogue page="men"/>}/>
      <Route path="/women" element={<Catalogue page="women"/>}/><Route path="/women.html" element={<Catalogue page="women"/>}/>
      <Route path="/product/:id" element={<Product/>}/><Route path="/product.html" element={<Product/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/><Route path="/wishlist.html" element={<Wishlist/>}/>
      <Route path="/cart" element={<Cart/>}/><Route path="/cart.html" element={<Cart/>}/>
      <Route path="/checkout" element={<Checkout/>}/><Route path="/checkout.html" element={<Checkout/>}/>
      <Route path="/about" element={<About/>}/><Route path="/about.html" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/><Route path="/contact.html" element={<Contact/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </Layout>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><ShopProvider><App/></ShopProvider></BrowserRouter></React.StrictMode>
);
