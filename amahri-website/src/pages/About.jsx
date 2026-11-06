import { Link } from 'react-router-dom';

export default function About() {
  return <>
    <section className="editorial-hero"><div className="container editorial-hero-grid">
      <div className="editorial-hero-copy"><span className="eyebrow">Notre univers</span><h1>Un parfum.<br/><em>Une histoire.</em></h1><p>AMAHRI Collections Parfums est née d'une idée simple : rendre le plaisir des fragrances inspirées plus accessible, sans renoncer à une expérience soignée et à une identité élégante.</p></div>
      <div className="editorial-hero-visual"><img src="/images/amahri-men.jpeg" alt="Flacon signature noir AMAHRI"/></div>
    </div></section>
    <section className="section"><div className="container">
      <div className="category-intro"><div><span className="eyebrow">Notre philosophie</span><h2 className="section-title">Des senteurs qui racontent.</h2></div><p className="section-lead">Chaque note évoque un souvenir, un tempérament, une émotion. Nous sélectionnons des fragrances inspirées pour vous aider à trouver celle qui vous ressemble.</p></div>
      <div className="values-grid">
        <div className="value-card"><span className="number">01</span><h3>Le sens du détail</h3><p>Une expérience de découverte simple, de la sélection du parfum au choix du format.</p></div>
        <div className="value-card"><span className="number">02</span><h3>Votre personnalité</h3><p>Des compositions fraîches, boisées et florales pour explorer différents univers olfactifs.</p></div>
        <div className="value-card"><span className="number">03</span><h3>Le plaisir d'offrir</h3><p>Le parfum comme attention pour soi ou pour les autres, au quotidien comme lors des moments spéciaux.</p></div>
      </div>
    </div></section>
    <section className="story-band"><div className="container story-inner"><div className="story-visual"><img src="/images/amahri-women.jpeg" alt="Flacon AMAHRI rose" loading="lazy"/></div><div className="story-copy"><span className="eyebrow">Notre collection</span><h2>À chacun sa <em>signature.</em></h2><p>Découvrez nos collections Homme et Femme, et choisissez entre nos formats 30 ml et 50 ml.</p><Link to="/shop" className="button button-light-outline">Explorer les parfums ↗</Link></div></div></section>
  </>;
}
