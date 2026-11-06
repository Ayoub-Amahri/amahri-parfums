import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { money, productPrice } from '../data/catalogue';

export function Price({ product, size = '30' }) {
  return <>
    <span className="price-label">{size} ml</span>
    {size === '30' && <del className="old-price" aria-label={`Ancien prix ${money(product.oldPrice30 || 30)}`}>{money(product.oldPrice30 || 30)}</del>}
    <strong className="current-price">{money(productPrice(product, size))}</strong>
  </>;
}

export function ProductCard({ product, size = '30' }) {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const liked = wishlist.includes(product.id);
  return <article className="product-card">
    <div className="product-image-wrap">
      <span className="product-tag">{product.badge || 'Collection AMAHRI'}</span>
      <button className={`wish-button ${liked ? 'is-active' : ''}`} type="button" aria-pressed={liked} aria-label={`${liked ? 'Retirer des favoris' : 'Ajouter aux favoris'} : ${product.name}`} onClick={() => toggleWishlist(product.id)}>{liked ? '♥' : '♡'}</button>
      {product.illustrativeImage && <span className="illustration-tag">Photo de référence</span>}
      <Link to={`/product/${product.id}`} aria-label={`Voir ${product.name}`}><img src={product.image} alt={`Photo de référence ${product.name}`} loading="lazy" /></Link>
    </div>
    <div className="product-card-info">
      <div className="product-category">Collection {product.category === 'men' ? 'Homme' : 'Femme'}</div>
      <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
      <p className="product-description">{product.brand}</p>
      <p className="product-price"><Price product={product} size={size} /></p>
      <div className="product-card-actions">
        <Link className="button button-outline" to={`/product/${product.id}`}>Découvrir</Link>
        <button className="button button-dark" type="button" onClick={() => addToCart(product.id, size)}>Ajouter au panier</button>
      </div>
    </div>
  </article>;
}

export function EmptyState({ title, description, action = 'Découvrir la boutique' }) {
  return <div className="empty-state"><span className="empty-symbol">◇</span><h3>{title}</h3><p>{description}</p><Link className="button button-dark" to="/shop">{action}</Link></div>;
}

export function ProductGrid({ items, size = '30' }) {
  return <div className="product-grid" aria-live="polite">
    {items.length ? items.map((product) => <ProductCard key={product.id} product={product} size={size} />)
      : <EmptyState title="Aucun parfum trouvé" description="Essayez une autre recherche ou explorez toutes les collections." action="Voir la boutique" />}
  </div>;
}

export function PageHero({ eyebrow, title, description }) {
  return <section className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></section>;
}
