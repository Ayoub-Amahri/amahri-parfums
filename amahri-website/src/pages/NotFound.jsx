import { EmptyState } from '../components/Products';
export default function NotFound() {
  return <section className="section"><div className="container"><EmptyState title="Page introuvable" description="Cette page n'existe pas ou son adresse a changé." action="Retour à la boutique"/></div></section>;
}
