import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './Icons';
import { useShop } from '../context/ShopContext';

const NAV = [
  ['/', 'Accueil'], ['/shop', 'Boutique'], ['/men', 'Homme'],
  ['/women', 'Femme'], ['/about', 'Notre univers'], ['/contact', 'Contact'],
];

function Header() {
  const { cartCount, wishlist } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location.pathname, location.search]);
  useEffect(() => {
    const close = (e) => { if (e.key === 'Escape') { setMenuOpen(false); setSearchOpen(false); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  function submitSearch(event) {
    event.preventDefault();
    navigate(`/shop${term.trim() ? `?q=${encodeURIComponent(term.trim())}` : ''}`);
    setSearchOpen(false);
  }
  return <>
    <div className="announcement"><span>Une signature qui vous ressemble</span><span className="announcement-separator" aria-hidden="true">✦</span><span>Livraison disponible au Maroc</span></div>
    <header className="site-header">
      <div className="container header-main">
        <button className="icon-button menu-toggle" type="button" onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} aria-controls="primary-nav"><Icon name="menu" /></button>
        <Link to="/" className="brand" aria-label="AMAHRI, accueil"><span className="brand-name">AMAHRI</span><span className="brand-subtitle">COLLECTIONS PARFUMS</span></Link>
        <form className="header-search" role="search" onSubmit={submitSearch}>
          <label className="sr-only" htmlFor="header-search">Rechercher un parfum</label>
          <input id="header-search" type="search" placeholder="Rechercher une fragrance..." value={term} onChange={(e) => setTerm(e.target.value)} />
          <button type="submit" aria-label="Lancer la recherche"><Icon name="search" /></button>
        </form>
        <div className="header-actions">
          <button className="icon-button mobile-search-button" type="button" aria-label="Afficher la recherche" aria-expanded={searchOpen} onClick={() => setSearchOpen((prev) => !prev)}><Icon name="search" /></button>
          <Link to="/wishlist" className="header-action" aria-label={`Mes favoris : ${wishlist.length}`}><Icon name="heart" /><span className="action-label">Favoris</span><span className="count-dot">{wishlist.length}</span></Link>
          <Link to="/cart" className="header-action" aria-label={`Mon panier : ${cartCount}`}><Icon name="cart" /><span className="action-label">Panier</span><span className="count-dot">{cartCount}</span></Link>
        </div>
      </div>
      <nav id="primary-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
        <div className="container nav-inner">{NAV.map(([to, label]) =>
          <NavLink key={to} to={to} end className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}</div>
      </nav>
      <form className="mobile-search" role="search" hidden={!searchOpen} onSubmit={submitSearch}>
        <label className="sr-only" htmlFor="mobile-search-input">Rechercher un parfum</label>
        <input id="mobile-search-input" type="search" placeholder="Rechercher un parfum..." value={term} onChange={(e) => setTerm(e.target.value)} />
        <button className="button button-dark" type="submit">Chercher</button>
      </form>
    </header>
    <div className="promo-banner" role="note">Offre spéciale · 30 ml à <strong>25 DH</strong> au lieu de <del>30 DH</del> — Économisez 5 DH</div>
  </>;
}

function ServiceBar() {
  return <div className="service-bar"><div className="container service-grid">
    <div className="service-item"><span className="service-icon">✦</span><div><strong>Une sélection soignée</strong><span>Des fragrances inspirées à découvrir</span></div></div>
    <div className="service-item"><span className="service-icon">◇</span><div><strong>Livraison au Maroc</strong><span>Modalités confirmées à la commande</span></div></div>
    <div className="service-item"><span className="service-icon">♡</span><div><strong>Besoin de conseils ?</strong><span>Échangez avec nous via WhatsApp</span></div></div>
  </div></div>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div className="footer-brand"><Link to="/" className="brand brand-footer"><span className="brand-name">AMAHRI</span><span className="brand-subtitle">COLLECTIONS PARFUMS</span></Link><p>Le parfum comme expression de votre personnalité. Découvrez notre sélection de fragrances inspirées, imaginée pour vos instants singuliers.</p></div>
    <div><h3>Explorer</h3><Link to="/shop">Toute la boutique</Link><Link to="/men">Collection Homme</Link><Link to="/women">Collection Femme</Link><Link to="/wishlist">Mes favoris</Link></div>
    <div><h3>Informations</h3><Link to="/about">Notre histoire</Link><Link to="/contact">Nous contacter</Link><Link to="/cart">Mon panier</Link><Link to="/checkout">Commander</Link></div>
    <div><h3>Contact</h3><p>Maroc</p><a href="tel:+212609180234">06 09 18 02 34</a><a href="mailto:ayoubamahri2001@gmail.com">ayoubamahri2001@gmail.com</a><a href="https://wa.me/212609180234" target="_blank" rel="noopener noreferrer">Écrivez-nous sur WhatsApp ↗</a><p>Commande et informations produits</p></div>
  </div><div className="container footer-bottom"><span>© 2026 AMAHRI Collections Parfums. Tous droits réservés.</span><span>Fait avec soin au Maroc.</span></div></footer>;
}

export function Layout({ children }) {
  const { toast } = useShop();
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return <>
    <a className="skip-link" href="#main">Aller au contenu</a>
    <Header />
    <main id="main">{children}</main>
    <ServiceBar /><Footer />
    <div role="status" aria-live="polite" className={`toast ${toast ? 'visible' : ''}`}>{toast}</div>
  </>;
}
