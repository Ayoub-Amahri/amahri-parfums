import { Link } from 'react-router-dom';
import { products } from '../data/catalogue';
import { ProductGrid } from '../components/Products';

const featuredIds = [8, 7, 1, 6, 9, 17];

export default function Home() {
  const featured = featuredIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  return <>
    <section className="hero"><div className="container hero-grid">
      <div className="hero-content">
        <span className="eyebrow">AMAHRI · Collection Signature</span>
        <h1>L’art de <em>laisser</em> une empreinte.</h1>
        <p className="hero-description">Des fragrances inspirées pour révéler votre style. Une sélection délicate, des notes mémorables et le plaisir de trouver votre signature.</p>
        <div className="hero-buttons"><Link to="/shop" className="button button-gold">Découvrir nos parfums <span aria-hidden="true">↗</span></Link><a href="#collections" className="button button-light-outline">Nos collections</a></div>
        <div className="hero-accent"><span className="line"/><span className="diamond">✧</span><span>Élégance à chaque instant</span></div>
      </div>
      <div className="hero-art"><div className="hero-round" aria-hidden="true">Votre<br/>signature</div><img className="hero-product" src="/images/amahri-men.jpeg" alt="Flacon noir et doré AMAHRI Collections Parfums" fetchPriority="high"/><div className="hero-side-note">Collection Signature · 2026</div></div>
    </div></section>
    <section className="section" id="collections"><div className="container">
      <div className="category-intro"><div><span className="eyebrow">L’univers AMAHRI</span><h2 className="section-title">Trouvez votre essence.</h2></div><p className="section-lead">Deux univers, une même passion. Une collection pour chaque personnalité et chaque occasion.</p></div>
      <div className="collection-grid">
        <article className="collection-card men"><img src="/images/amahri-men.jpeg" alt="Flacon AMAHRI noir collection homme" loading="lazy"/><div className="collection-card-content"><small>01 · Collection</small><h3>Pour lui</h3><Link to="/men">Explorer les parfums ↗</Link></div></article>
        <article className="collection-card women"><img src="/images/amahri-women.jpeg" alt="Flacon AMAHRI rose collection femme" loading="lazy"/><div className="collection-card-content"><small>02 · Collection</small><h3>Pour elle</h3><Link to="/women">Explorer les parfums ↗</Link></div></article>
      </div>
    </div></section>
    <section className="section section-soft"><div className="container">
      <div className="section-head"><div><span className="eyebrow">Notre sélection</span><h2 className="section-title">Les incontournables</h2><p className="section-lead">Découvrez quelques fragrances appréciées dans notre catalogue.</p></div><Link className="text-link" to="/shop">Voir toute la boutique ↗</Link></div>
      <ProductGrid items={featured}/>
    </div></section>
    <section className="story-band"><div className="container story-inner">
      <div className="story-visual"><img src="/images/amahri-women.jpeg" alt="Flacon rose AMAHRI" loading="lazy"/></div>
      <div className="story-copy"><span className="eyebrow">L’esprit AMAHRI</span><h2>Bien plus qu’un parfum. <em>Une émotion.</em></h2><p>Nous croyons qu’une senteur révèle une personnalité et accompagne les souvenirs. Explorez des compositions inspirées, entre caractère et délicatesse.</p><Link to="/about" className="button button-light-outline">Découvrir notre histoire ↗</Link></div>
    </div></section>
    <section className="section"><div className="container">
      <div className="section-head"><div><span className="eyebrow">Laissez-vous inspirer</span><h2 className="section-title">La fragrance qui vous ressemble</h2></div><Link className="text-link" to="/shop">Explorer le catalogue ↗</Link></div>
      <div className="collection-grid">
        <article className="collection-card men"><img src="/images/amahri-men.jpeg" alt="Collection de parfums homme" loading="lazy"/><div className="collection-card-content"><small>Nos essentiels</small><h3>Pour lui</h3><Link to="/men">Découvrir ↗</Link></div></article>
        <article className="collection-card women"><img src="/images/amahri-women.jpeg" alt="Collection de parfums femme" loading="lazy"/><div className="collection-card-content"><small>Nos essentiels</small><h3>Pour elle</h3><Link to="/women">Découvrir ↗</Link></div></article>
      </div>
    </div></section>
  </>;
}
