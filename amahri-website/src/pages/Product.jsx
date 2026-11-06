import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getProduct, products } from '../data/catalogue';
import { useShop } from '../context/ShopContext';
import { EmptyState, Price, ProductGrid } from '../components/Products';

export default function Product() {
  const { id: paramId } = useParams();
  const [searchParams] = useSearchParams();
  const id = paramId || searchParams.get('id'); // The old /product.html?id= link still works.
  const product = getProduct(id);
  return <>
    <div className="container"><nav className="breadcrumb" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link><span aria-hidden="true">/</span><Link to="/shop">Boutique</Link><span aria-hidden="true">/</span><span>{product?.name || 'Détails du parfum'}</span></nav>
      {product ? <ProductDetail key={product.id} product={product}/> : <EmptyState title="Parfum introuvable" description="Ce produit n’existe pas ou n’est plus disponible." />}
    </div>
    {product && <section className="section related-section"><div className="container"><div className="section-head"><div><span className="eyebrow">À explorer</span><h2 className="section-title">Vous aimerez aussi</h2></div><Link to="/shop" className="text-link">Toute la boutique ↗</Link></div><ProductGrid items={products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3)}/></div></section>}
  </>;
}

function ProductDetail({ product }) {
  const [size, setSize] = useState('30');
  const [quantity, setQuantity] = useState(1);
  const { wishlist, addToCart, toggleWishlist } = useShop();
  const liked = wishlist.includes(product.id);
  return <div className="product-detail-grid">
    <div className="product-gallery"><img src={product.image} alt={`Photo de référence du parfum ${product.name}`}/>{product.illustrativeImage && <p className="photo-note">Photo de référence — fragrance AMAHRI inspirée, flacon livré différent</p>}</div>
    <div className="product-info">
      <span className="eyebrow">Collection {product.category === 'men' ? 'Homme' : 'Femme'}</span>
      <h1>{product.name}</h1><p className="product-brand">{product.brand}</p>
      <p className="detail-price"><Price product={product} size={size}/></p>
      <p className="detail-copy">{product.description} Une fragrance pensée pour accompagner chaque occasion avec élégance.</p>
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}><legend className="option-title">Choisissez votre format</legend>
        <div className="size-options">{['30','50'].map((value) => <label key={value}><input type="radio" name="size" checked={size === value} onChange={() => setSize(value)} value={value}/><span>{value} ml</span></label>)}</div>
      </fieldset>
      <span className="option-title">Quantité</span>
      <div className="purchase-actions">
        <div className="quantity-control" aria-label="Quantité"><button type="button" aria-label="Diminuer la quantité" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button><output aria-live="polite">{quantity}</output><button type="button" aria-label="Augmenter la quantité" onClick={() => setQuantity((q) => Math.min(99, q + 1))}>+</button></div>
        <button className="button button-dark" type="button" onClick={() => addToCart(product.id, size, quantity)}>Ajouter au panier</button>
        <button className={`wish-button ${liked ? 'is-active' : ''}`} type="button" onClick={() => toggleWishlist(product.id)} aria-pressed={liked} aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}>{liked ? '♥' : '♡'}</button>
      </div>
      <div className="detail-delivery"><p>Livraison disponible au Maroc — tarifs et délais à confirmer</p><p>Commande accompagnée via WhatsApp</p></div>
      {product.top !== 'À préciser' && <div className="notes-panel"><h3>La pyramide olfactive</h3><div className="note-line"><strong>Notes de tête</strong><span>{product.top}</span></div><div className="note-line"><strong>Notes de cœur</strong><span>{product.heart}</span></div><div className="note-line"><strong>Notes de fond</strong><span>{product.base}</span></div></div>}
    </div>
  </div>;
}
