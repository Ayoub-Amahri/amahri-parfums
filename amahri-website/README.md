# AMAHRI Collections Parfums — V2 Premium

Refonte **HTML / CSS / JavaScript**, réalisée à partir du dépôt original AMAHRI Parfums.
Le projet reste un **site statique**, compatible avec un hébergement Netlify, sans compilation.

## Nouveautés de V2

- Design premium responsive (noir, ivoire, champagne) avec l'identité AMAHRI.
- En-tête commun : navigation mobile, recherche, favoris et panier avec compteurs.
- Nouvelle page `shop.html` : recherche, filtre Homme/Femme, sélection du format affiché et tri.
- Page d'accueil : hero, collections, sélection de produits, univers de la marque.
- Fiches produit : **sélection 30 ml / 50 ml**, promo 30 ml 25 DH avec ancien prix 30 DH barré, prix réactif, contrôle de quantité, notes olfactives.
- Panier : articles regroupés par produit + format, modification des quantités, suppression, sous-total.
- Favoris : ajout/retrait sans rechargement.
- Checkout via WhatsApp : nom, téléphone, ville, adresse, quantités, formats, prix ligne à ligne et total hors livraison, avec URL correctement encodée.
- Formulaire de contact : ouvre le client e-mail (pas de faux envoi au serveur).
- Accessibilité de base : labels, navigation au clavier, boutons sémantiques, aria-live, responsive et reduced motion.
- Métadonnées OG, canonical et sitemap alignés sur le domaine Netlify actuellement utilisé.

## Pages

- `index.html` — accueil
- `shop.html` — catalogue intégral
- `men.html` / `women.html` — collections
- `product.html?id=1` — fiche produit (paramètre `id`)
- `wishlist.html` — favoris
- `cart.html` — panier
- `checkout.html` — préparation de commande WhatsApp
- `about.html` — histoire
- `contact.html` — contact
- `404.html` — page introuvable

## Architecture

```text
amahri-website/
├── index.html
├── shop.html, men.html, women.html
├── product.html, cart.html, wishlist.html, checkout.html
├── about.html, contact.html
├── css/style.css
├── js/
│   ├── products.js   # Catalogue 19 références : nouveaux noms et prix promotionnels
│   ├── store.js      # Panier, favoris, sauvegarde localStorage
│   ├── site.js       # Menu, compteurs, fiches produit, toasts
│   └── pages.js      # Rendu et interactions spécifiques aux pages
├── images/           # Ressources originales + photos renommées + image OG
├── sitemap.xml
└── robots.txt
```

## Démarrer en local

1. Extraire le ZIP.
2. Ouvrir le dossier `amahri-website/` dans VS Code.
3. Avec l'extension Live Server, ouvrir `index.html` (conseillé pour le stockage local).

Alternative, depuis le dossier `amahri-website` :

```bash
python -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`.

## Mettre sur Netlify

- Faites un backup du site actuel et testez V2 avant de remplacer la version en ligne.
- Pour un déploiement manuel : déposer **le contenu du dossier `amahri-website`** sur Netlify.
- Pour un déploiement Git depuis la racine de ce ZIP : `netlify.toml` fournit le **Publish directory** `amahri-website`. Aucun build command.
- Testez le catalogue, un produit, le panier et le flux WhatsApp après publication.

## À vérifier avant une mise en production

1. **WhatsApp** : numéro confirmé par le propriétaire : `0609180234` (format international `+212609180234`). Utilisé pour les commandes et les liens de contact.
2. **E-mail** : adresse communiquée par le propriétaire : `ayoubamahri2001@gmail.com`. Elle est utilisée dans la page Contact, le formulaire `mailto:` et le pied de page.
3. **Photos et noms de parfums** : les photos existantes proviennent du projet original ; les nouvelles références sans photo disposent d'une illustration AMAHRI clairement étiquetée « Visuel illustratif ». Remplacer ces illustrations par vos propres photos avant la publication. Le catalogue présente des fragrances *inspirées*, non les produits originaux des marques citées.
4. **Stocks, prix et disponibilité** : le catalogue contient maintenant 19 références (12 Homme, 7 Femme), avec 30 ml à 25 DH (ancien prix barré 30 DH) et 50 ml conservé à 45 DH ; vérifier la disponibilité de chaque fragrance avant la mise en ligne.
5. **Livraison** : les frais et délais ne sont pas calculés. Ils sont indiqués comme « à confirmer ».
6. **Domaine / SEO** : si vous utilisez un domaine personnalisé, modifier les URL `canonical`, `og:url`, `og:image`, `robots.txt`, `sitemap.xml`.
7. **Contact** : le formulaire ouvre une application mail, il n'envoie pas d'e-mail par serveur.
8. **Commande** : aucune commande n'est enregistrée en base de données. WhatsApp est une étape de confirmation manuelle. Il n'y a ni paiement en ligne ni compte utilisateur.
9. **Sécurité** : pour ajouter authentification, base de données et administration, utiliser un backend avec contrôle des permissions, validation et protection contre les abus.

## Roadmap Full Stack (future V3)

- API backend (PHP/MySQL ou Node.js avec base de données).
- Tableau d'administration avec authentification et rôles.
- CRUD produits, images, stock et catégories.
- Persistance serveur des commandes, statuts et historiques.
- Validation serveur, tests unitaires et tests end-to-end.
- Emails transactionnels, configuration d'expédition, analyse des performances et déploiement.

## Vérifications techniques effectuées

- Syntaxe JavaScript des 4 fichiers vérifiée via `node --check`.
- Tests fonctionnels navigateur réalisés sur un rendu autonome de chaque page : catalogue, filtres, recherche, changement 30/50ml, panier, favoris et génération du lien WhatsApp.
- Captures visuelles desktop, tablette et mobile ; pas de débordement horizontal détecté dans les tests de la page d'accueil.
- **Limite** : les tests automatisés ont utilisé un rendu de page autonome, pas une session complète de bout en bout sur Netlify. Valider le flux complet après publication.

Projet de portfolio : le but est de montrer un frontend propre, des interactions cohérentes et un plan réaliste pour passer au Full Stack.

## Mise à jour V2.1 — catalogue et promotion

- **Homme : 12 références** : Sauvage, Ultra Male, Bleu de Chanel, Stronger With You, Creed, Club de Nuit, Nishane, Acqua di Giò, 9PM, Versace, Imagination, Jean Paul Gaultier.
- **Femme : 7 références** : Coco Mademoiselle, Burberry Her, L’Impératrice, Kayali 81, Light Blue, Coco Chanel, Escada Taj.
- **30 ml : 25 DH** (ancien prix **30 DH** visuellement barré, économie 5 DH, réduction d’environ 17 %).
- **50 ml : 45 DH** inchangé faute d’une nouvelle consigne du propriétaire.
- Prix mis à jour dans la fiche produit, le catalogue, le panier et la commande WhatsApp. Les anciens paniers en `localStorage` sont recalculés depuis les prix du catalogue.
- Les images des références ajoutées sont des **illustrations d’attente** et ne représentent pas une photo garantie du produit réel. Remplacer par des photos de vos flacons AMAHRI.
- Les notes olfactives non vérifiées sont masquées sur les nouvelles fiches pour ne pas inventer de caractéristiques.


## Mise à jour V2.2 — 13 photos de parfums intégrées

- 13 images fournies par le propriétaire ont remplacé les illustrations temporaires dans le catalogue et les fiches produit.
- **Homme (9)** : Sauvage, Ultra Male, Bleu de Chanel, Stronger With You, Club de Nuit, 9PM, Versace **Eros**, Imagination, Jean Paul Gaultier **Le Male**.
- **Femme (4)** : Light Blue (Summer Vibes sur la photo), Coco Chanel, Escada Taj (Taj Sunset sur la photo), Kayali 81 (Yum Boujee Marshmallow sur la photo).
- Les images ont été converties au format WebP (qualité 88) pour un chargement plus léger ; elles se trouvent dans `images/products/`.
- Les six autres visuels du catalogue (Creed, Nishane, Acqua di Giò, Coco Mademoiselle, Burberry Her, L’Impératrice) ont été conservés.
- **Important** : ces images présentent les flacons *de référence* des marques. Comme le site annonce des parfums « inspirés de », ces photos ne représentent pas nécessairement les flacons réellement expédiés par AMAHRI. Les clients doivent voir clairement cette différence ; remplacer par des photos des produits effectivement livrés avant la commercialisation.
- Prix inchangés : **30 ml 25 DH** (ancien **30 DH** barré), **50 ml 45 DH**. WhatsApp `+212609180234`, email `ayoubamahri2001@gmail.com`.


## Mise à jour V2.3 — Fond crème uniforme des parfums

- Le fond des cartes de tous les parfums passe au **crème ivoire clair** (`#f5efe5`), comme la référence client, y compris sur les fiches produit et dans le panier.
- Les **six images JPG** historiques (Nishane, Acqua di Giò, Creed, Burberry Her, L'Impératrice et Coco Mademoiselle) avaient une surface noire intégrée au fichier, invisible à un simple changement CSS. Elles ont été détourées en WebP transparent et remplacées dans le catalogue. Les originaux sont conservés dans le dossier `images/` à titre d'archive.
- La photo de Kayali 81 a aussi été détourée de son ancien fond blanc/gris afin d'obtenir le même fond crème que les autres.
- Les 13 photos envoyées par le propriétaire restent intégrées. Prix et coordonnées inchangés.
- Les photographies des marques sont présentées uniquement comme **photos de référence** des fragrances inspirées ; les flacons réellement vendus peuvent différer.
