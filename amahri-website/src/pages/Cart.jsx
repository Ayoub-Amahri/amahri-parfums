import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { money } from '../data/catalogue';
import { EmptyState, PageHero } from '../components/Products';

export default function Cart() {
  const { detailedCart, total, cartCount, removeFromCart, updateQuantity } = useShop();
  return <>
    <PageHero eyebrow="Vos envies" title="Mon panier" description="Vérifiez vos parfums préférés avant de préparer votre commande."/>
    <div className="container">{!detailedCart.length
      ? <div className="section"><EmptyState title="Votre panier est vide" description="Votre prochaine fragrance n’attend que vous."/></div>
      : <div className="two-column-layout">
        <div><h2 className="panel-heading">Articles dans votre panier ({cartCount})</h2>
          {detailedCart.map((row) => <article className="cart-row" key={`${row.id}-${row.size}`}>
            <Link to={`/product/${row.id}`}><img src={row.product.image} alt={`Parfum ${row.product.name}`} loading="lazy"/></Link>
            <div><h3><Link to={`/product/${row.id}`}>{row.product.name}</Link></h3><p className="subline">Format {row.size} ml · {row.product.brand}</p>
              <div className="quantity-control" aria-label={`Quantité de ${row.product.name}`}>
                <button type="button" aria-label={`Diminuer ${row.product.name}`} onClick={() => updateQuantity(row.id, row.size, -1)}>−</button><output aria-live="polite">{row.quantity}</output><button type="button" aria-label={`Augmenter ${row.product.name}`} onClick={() => updateQuantity(row.id, row.size, 1)}>+</button>
              </div>
            </div>
            <div className="cart-right"><span className="cart-price">{money(row.lineTotal)}</span><button className="text-button" type="button" onClick={() => removeFromCart(row.id, row.size)}>Supprimer</button></div>
          </article>)}
        </div>
        <aside className="summary-box"><h2>Votre commande</h2>
          <div className="summary-line"><span>Sous-total</span><span>{money(total)}</span></div>
          <div className="summary-line"><span>Livraison</span><span>À confirmer</span></div>
          <div className="summary-line strong"><span>Total hors livraison</span><span>{money(total)}</span></div>
          <p className="summary-note">La commande sera envoyée via WhatsApp pour confirmation. Aucun paiement n’est effectué sur le site.</p>
          <Link className="button button-dark" to="/checkout">Continuer la commande</Link>
          <Link className="button button-outline" to="/shop" style={{ marginTop: 10 }}>Poursuivre mes achats</Link>
        </aside>
      </div>}</div>
  </>;
}
