import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { money } from '../data/catalogue';
import { EmptyState, PageHero } from '../components/Products';

const PHONE = '212609180234';

export default function Checkout() {
  const { detailedCart, total } = useShop();
  const [fields, setFields] = useState({ name: '', phone: '', city: '', address: '' });
  const [orderLink, setOrderLink] = useState('');
  function update(event) { setFields((current) => ({ ...current, [event.target.name]: event.target.value })); setOrderLink(''); }
  function submit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || !detailedCart.length) return;
    const lines = [
      'Bonjour, je souhaite confirmer une commande AMAHRI.', '',
      `Client : ${fields.name.trim()}`, `Téléphone : ${fields.phone.trim()}`,
      `Ville : ${fields.city.trim()}`, `Adresse : ${fields.address.trim()}`, '', 'Produits :',
      ...detailedCart.map((row) => `- ${row.product.name} | ${row.size} ml | Quantité ${row.quantity} | ${money(row.lineTotal)}`),
      '', `Total produits (hors livraison) : ${money(total)}`,
      'Merci de confirmer la disponibilité et les frais de livraison.',
    ];
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;
    setOrderLink(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return <>
    <PageHero eyebrow="Votre commande" title="Finaliser la demande" description="Renseignez vos informations pour préparer votre message de commande WhatsApp."/>
    <div className="container">
      {!detailedCart.length ? <section className="section"><EmptyState title="Votre panier est vide" description="Ajoutez d’abord un parfum à votre panier."/></section>
      : <div className="two-column-layout">
        <form className="form-panel" onSubmit={submit}>
          <h2 className="panel-heading">Vos coordonnées</h2>
          <div className="form-row">
            <div className="field"><label htmlFor="full-name">Nom complet *</label><input id="full-name" name="name" type="text" autoComplete="name" required maxLength={100} value={fields.name} onChange={update}/></div>
            <div className="field"><label htmlFor="phone">Téléphone *</label><input id="phone" name="phone" type="tel" autoComplete="tel" required minLength={9} maxLength={20} value={fields.phone} onChange={update}/></div>
          </div>
          <div className="form-row">
            <div className="field"><label htmlFor="city">Ville *</label><input id="city" name="city" autoComplete="address-level2" required maxLength={100} value={fields.city} onChange={update}/></div>
            <div className="field"><label htmlFor="address">Adresse *</label><input id="address" name="address" autoComplete="street-address" required maxLength={200} value={fields.address} onChange={update}/></div>
          </div>
          <button className="button button-dark button-block" type="submit">Envoyer via WhatsApp ↗</button>
          <p className="form-help">Cette action ouvre WhatsApp avec un message pré-rempli. Aucun paiement ni enregistrement de commande n’est effectué sur ce site.</p>
          {orderLink && <p className="form-feedback">Si WhatsApp ne s’est pas ouvert, <a href={orderLink} target="_blank" rel="noopener noreferrer">cliquez ici pour ouvrir le message</a>.</p>}
        </form>
        <aside className="summary-box"><h2>Récapitulatif</h2>
          <div className="checkout-items">{detailedCart.map((row) => <div className="checkout-item" key={`${row.id}-${row.size}`}><span>{row.product.name} · {row.size} ml × {row.quantity}</span><strong>{money(row.lineTotal)}</strong></div>)}</div>
          <div className="summary-line"><span>Livraison</span><span>À confirmer</span></div>
          <div className="summary-line strong"><span>Total hors livraison</span><span>{money(total)}</span></div>
          <p className="summary-note">La commande n’est pas enregistrée sur un serveur. La confirmation est manuelle.</p>
          <Link to="/cart" className="text-link">Modifier le panier ↗</Link>
        </aside>
      </div>}
    </div>
  </>;
}
