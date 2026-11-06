import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/catalogue';
import { PageHero, ProductGrid } from '../components/Products';

const PAGE_META = {
  shop: ['La boutique AMAHRI', 'Toute la collection', 'Explorez nos 19 fragrances inspirées, et trouvez votre signature préférée.'],
  men: ['Collection Homme', 'Pour lui', 'Des fragrances inspirées pour accompagner chaque personnalité.'],
  women: ['Collection Femme', 'Pour elle', 'Une sélection de fragrances inspirées, entre fraîcheur et élégance.'],
};

export default function Catalogue({ page = 'shop' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(page === 'men' ? 'men' : page === 'women' ? 'women' : 'all');
  const [size, setSize] = useState('30');
  const [sort, setSort] = useState('default');
  const [query, setQuery] = useState(searchParams.get('q') || '');
  useEffect(() => { setCategory(page === 'men' ? 'men' : page === 'women' ? 'women' : 'all'); }, [page]);
  useEffect(() => { setQuery(searchParams.get('q') || ''); }, [searchParams]);

  const displayed = useMemo(() => {
    const search = query.trim().toLocaleLowerCase('fr');
    const filtered = products.filter((p) => (category === 'all' || p.category === category) &&
      [p.name, p.brand, p.description].join(' ').toLocaleLowerCase('fr').includes(search));
    if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    if (sort === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name, 'fr'));
    if (sort === 'price') filtered.sort((a, b) => (size === '50' ? a.price50 - b.price50 : a.price30 - b.price30));
    return filtered;
  }, [category, size, sort, query]);

  const [eyebrow, title, description] = PAGE_META[page];
  return <>
    <PageHero eyebrow={eyebrow} title={title} description={description}/>
    <section className="catalog-section"><div className="container">
      <div className="catalog-tools">
        <div className="results-label" aria-live="polite">{displayed.length} parfum{displayed.length !== 1 ? 's' : ''}</div>
        <div className="catalog-tools-controls">
          <label className="sr-only" htmlFor="catalog-search">Rechercher par nom</label>
          <input className="filter-search" id="catalog-search" type="search" placeholder="Rechercher un parfum..." value={query} onChange={(event) => {
            const newTerm = event.target.value;
            setQuery(newTerm);
            if (page === 'shop') setSearchParams(newTerm ? { q: newTerm } : {}, { replace: true });
          }}/>
          <label className="sr-only" htmlFor="catalog-category">Collection</label>
          <select className="filter-select" id="catalog-category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">Toutes les collections</option><option value="men">Homme</option><option value="women">Femme</option>
          </select>
          <label className="sr-only" htmlFor="catalog-size">Format</label>
          <select className="filter-select" id="catalog-size" value={size} onChange={(event) => setSize(event.target.value)}><option value="30">Prix 30 ml</option><option value="50">Prix 50 ml</option></select>
          <label className="sr-only" htmlFor="catalog-sort">Trier</label>
          <select className="filter-select" id="catalog-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="default">Trier : sélection</option><option value="name">Nom A → Z</option><option value="name-desc">Nom Z → A</option><option value="price">Prix croissant</option>
          </select>
        </div>
      </div>
      <ProductGrid items={displayed} size={size}/>
    </div></section>
  </>;
}
