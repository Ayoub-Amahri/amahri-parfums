import { products } from '../data/catalogue';
import { PageHero, ProductGrid } from '../components/Products';
import { useShop } from '../context/ShopContext';

export default function Wishlist() {
  const { wishlist } = useShop();
  return <>
    <PageHero eyebrow="Votre sélection" title="Mes favoris" description="Retrouvez ici les parfums qui ont retenu votre attention."/>
    <section className="section"><div className="container"><ProductGrid items={products.filter((p) => wishlist.includes(p.id))}/></div></section>
  </>;
}
