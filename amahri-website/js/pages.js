/* Page renderers for the static AMAHRI shop. No payment processing or database. */
(function() {
"use strict";
const A=window.Amahri,UI=window.AmahriUI,e=A.escapeHTML;
const page=document.body.dataset.page;
const empty=(title,description,link="shop.html",label="Découvrir la boutique")=>`<div class="empty-state"><span class="empty-symbol">◇</span><h3>${e(title)}</h3><p>${e(description)}</p><a class="button button-dark" href="${link}">${label}</a></div>`;
if(page==="home") {
  const featured=document.getElementById("featured-products");
  const list=[A.productById(8),A.productById(7),A.productById(1),A.productById(6),A.productById(9),A.productById(17)].filter(Boolean);
  UI.cardGrid(featured,list);
}
if(page==="shop" || page==="men" || page==="women") {
  const grid=document.getElementById("catalog-grid");
  const q=document.getElementById("catalog-search");
  const category=document.getElementById("catalog-category");
  const sort=document.getElementById("catalog-sort");
  const size=document.getElementById("catalog-size");
  const count=document.getElementById("results-count");
  const qs=new URLSearchParams(location.search);
  if(qs.has("q") && q) q.value=qs.get("q").slice(0,100);
  const defaultCat=page==="men"?"men":page==="women"?"women":"all";
  if(category) category.value=defaultCat;
  function renderCatalog() {
    const term=(q?.value||"").toLocaleLowerCase("fr").trim();
    let items=A.allProducts().filter(p=>{
       return (category?.value==="all" || p.category===category?.value) &&
         [p.name,p.brand,p.description,p.top,p.heart,p.base].join(" ").toLocaleLowerCase("fr").includes(term);
    });
    if(sort?.value==="name") items.sort((a,b)=>a.name.localeCompare(b.name,"fr"));
    if(sort?.value==="name-desc") items.sort((a,b)=>b.name.localeCompare(a.name,"fr"));
    if(sort?.value==="price") items.sort((a,b)=>(size?.value==="50"?a.price50:a.price30)-(size?.value==="50"?b.price50:b.price30));
    if(count) count.textContent=items.length+" parfum"+(items.length!==1?"s":"");
    UI.cardGrid(grid,items);
    if(size && size.value==="50" && grid) {
       grid.querySelectorAll(".product-card").forEach(card=>{
         const p=A.productById(card.dataset.productCard);
         const price=card.querySelector(".product-price");
         const add=card.querySelector("[data-add]");
         if(p && price) price.innerHTML=UI.priceMarkup(p,"50");
         if(add) add.dataset.size="50";
       });
    }
  }
  [q,category,sort,size].forEach(control=>control?.addEventListener(control===q?"input":"change",renderCatalog));
  renderCatalog();
}
if(page==="product") {
  const target=document.getElementById("product-detail");
  const product=A.productById(new URLSearchParams(location.search).get("id"));
  if(!product) {
    if(target) target.innerHTML=empty("Parfum introuvable","Ce produit n'existe pas ou n'est plus disponible.");
  } else {
    document.title=product.name+" | AMAHRI Collections Parfums";
    const desc=document.querySelector('meta[name="description"]');
    if(desc) desc.content=product.description+" — Fragrance inspirée. Disponible en 30 ml et 50 ml.";
    const canonical=document.querySelector('link[rel="canonical"]');
    if(canonical) canonical.href=location.origin+location.pathname+"?id="+product.id;
    if(target) target.innerHTML=`
    <div class="product-detail-grid">
      <div class="product-gallery"><img src="${e(product.image)}" alt="${product.illustrativeImage?"Photo du parfum de référence":"Flacon"} ${e(product.name)}">${product.illustrativeImage?`<p class="photo-note">Photo de référence — fragrance AMAHRI inspirée, flacon livré différent</p>`:""}</div>
      <div class="product-info">
        <span class="eyebrow">Collection ${product.category==="men"?"Homme":"Femme"}</span>
        <h1>${e(product.name)}</h1>
        <p class="product-brand">${e(product.brand)}</p>
        <p class="detail-price" id="detail-price">${UI.priceMarkup(product,"30")}</p>
        <p class="detail-copy">${e(product.description)} Une fragrance pensée pour accompagner chaque occasion avec élégance.</p>
        <fieldset style="border:0;padding:0;margin:0">
          <legend class="option-title">Choisissez votre format</legend>
          <div class="size-options">
            <label><input type="radio" name="size" value="30" checked><span>30 ml</span></label>
            <label><input type="radio" name="size" value="50"><span>50 ml</span></label>
          </div>
        </fieldset>
        <span class="option-title">Quantité</span>
        <div class="purchase-actions">
          <div class="quantity-control" aria-label="Quantité">
            <button type="button" id="qty-minus" aria-label="Diminuer la quantité">−</button>
            <output id="qty-value" aria-live="polite">1</output>
            <button type="button" id="qty-plus" aria-label="Augmenter la quantité">+</button>
          </div>
          <button class="button button-dark" id="detail-add" type="button">Ajouter au panier</button>
          <button class="wish-button ${A.getWishlist().includes(product.id)?"is-active":""}" data-wish="${product.id}"
                  type="button" aria-label="Ajouter aux favoris">${A.getWishlist().includes(product.id)?"♥":"♡"}</button>
        </div>
        <div class="detail-delivery"><p>Livraison disponible au Maroc — tarifs et délais à confirmer</p><p>Commande accompagnée via WhatsApp</p></div>
        ${product.top === "À préciser" ? "" : `<div class="notes-panel">
          <h3>La pyramide olfactive</h3>
          <div class="note-line"><strong>Notes de tête</strong><span>${e(product.top)}</span></div>
          <div class="note-line"><strong>Notes de cœur</strong><span>${e(product.heart)}</span></div>
          <div class="note-line"><strong>Notes de fond</strong><span>${e(product.base)}</span></div>
        </div>`}
      </div>
    </div>`;
    let quantity=1;
    const qty=document.getElementById("qty-value"),price=document.getElementById("detail-price");
    document.getElementById("qty-minus")?.addEventListener("click",()=>{quantity=Math.max(1,quantity-1);qty.textContent=quantity;});
    document.getElementById("qty-plus")?.addEventListener("click",()=>{quantity=Math.min(99,quantity+1);qty.textContent=quantity;});
    document.querySelectorAll('input[name="size"]').forEach(radio=>radio.addEventListener("change",()=>{
      price.innerHTML=UI.priceMarkup(product,radio.value);
    }));
    document.getElementById("detail-add")?.addEventListener("click",()=>{
      const size=document.querySelector('input[name="size"]:checked')?.value||"30";
      A.addToCart(product.id,size,quantity);
      UI.toast(quantity+" × "+product.name+" ajouté(s) au panier");
    });
    const related=A.allProducts().filter(p=>p.id!==product.id && p.category===product.category).slice(0,3);
    UI.cardGrid(document.getElementById("related-products"),related);
    const section=document.getElementById("related-section");
    if(section && !related.length) section.hidden=true;
  }
}
if(page==="wishlist") {
  function renderWishlist() {
    const saved=A.getWishlist().map(A.productById).filter(Boolean);
    const target=document.getElementById("wishlist-grid");
    if(target) target.innerHTML=saved.length?saved.map(UI.productCard).join(""):empty("Votre liste est vide","Enregistrez vos parfums préférés pour les retrouver ici.");
  }
  document.addEventListener("amahri:change",renderWishlist);
  renderWishlist();
}
function cartEmpty(){
  const target=document.getElementById("cart-content");
  if(target) target.innerHTML=empty("Votre panier est vide","Votre prochaine fragrance n'attend que vous.");
}
if(page==="cart") {
  function renderCart(){
    const target=document.getElementById("cart-content"),items=A.getCart();
    if(!target)return;
    if(!items.length){cartEmpty();return;}
    target.innerHTML=`<div class="two-column-layout">
      <div><h2 class="panel-heading">Articles dans votre panier (${A.quantity()})</h2>
        ${items.map(item=>`<article class="cart-row">
          <a href="product.html?id=${item.id}"><img alt="Parfum ${e(item.name)}" src="${e(item.image)}"></a>
          <div><h3><a href="product.html?id=${item.id}">${e(item.name)}</a></h3>
            <p class="subline">Format ${e(item.size)} ml · ${e(item.brand)}</p>
            <div class="quantity-control" aria-label="Changer la quantité">
              <button type="button" data-qty="${item.id}" data-size="${item.size}" data-delta="-1" aria-label="Diminuer ${e(item.name)}">−</button>
              <output aria-live="polite">${item.quantity}</output>
              <button type="button" data-qty="${item.id}" data-size="${item.size}" data-delta="1" aria-label="Augmenter ${e(item.name)}">+</button>
            </div>
          </div>
          <div class="cart-right"><span class="cart-price">${A.money(item.price*item.quantity)}</span><button class="text-button" type="button" data-remove="${item.id}" data-size="${item.size}">Supprimer</button></div>
        </article>`).join("")}
      </div>
      <aside class="summary-box"><h2>Votre commande</h2>
        <div class="summary-line"><span>Sous-total</span><span>${A.money(A.total())}</span></div>
        <div class="summary-line"><span>Livraison</span><span>À confirmer</span></div>
        <div class="summary-line strong"><span>Total hors livraison</span><span>${A.money(A.total())}</span></div>
        <p class="summary-note">La commande sera envoyée via WhatsApp pour confirmation. Aucun paiement n'est effectué sur le site.</p>
        <a class="button button-dark" href="checkout.html">Continuer la commande</a>
        <a class="button button-outline" href="shop.html" style="margin-top:10px">Poursuivre mes achats</a>
      </aside>
    </div>`;
  }
  document.addEventListener("click",event=>{
    const remove=event.target.closest("[data-remove]");
    if(remove){A.removeCart(remove.dataset.remove,remove.dataset.size);UI.toast("Produit retiré du panier");return;}
    const qty=event.target.closest("[data-qty]");
    if(qty)A.updateQuantity(qty.dataset.qty,qty.dataset.size,qty.dataset.delta);
  });
  document.addEventListener("amahri:change",renderCart);
  renderCart();
}
if(page==="checkout"){
  const summary=document.getElementById("checkout-summary"),form=document.getElementById("checkout-form"),submit=document.getElementById("order-submit");
  function renderSummary(){
    const items=A.getCart();
    if(summary)summary.innerHTML=items.length?`
      <h2>Récapitulatif</h2>
      <div class="checkout-items">${items.map(i=>`<div class="checkout-item"><span>${e(i.name)} · ${e(i.size)} ml × ${i.quantity}</span><strong>${A.money(i.price*i.quantity)}</strong></div>`).join("")}</div>
      <div class="summary-line"><span>Livraison</span><span>À confirmer</span></div>
      <div class="summary-line strong"><span>Total hors livraison</span><span>${A.money(A.total())}</span></div>
      <p class="summary-note">Le bouton ouvre WhatsApp avec les détails de votre demande. La commande n'est pas enregistrée sur un serveur.</p>
    `:empty("Panier vide","Ajoutez d'abord un parfum à votre panier.");
    if(submit) submit.disabled=!items.length;
  }
  document.addEventListener("amahri:change",renderSummary);
  renderSummary();
  form?.addEventListener("submit",event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const items=A.getCart();
    if(!items.length){UI.toast("Votre panier est vide");return;}
    const name=document.getElementById("full-name").value.trim();
    const phone=document.getElementById("phone").value.trim();
    const city=document.getElementById("city").value.trim();
    const address=document.getElementById("address").value.trim();
    const lines=[
      "Bonjour, je souhaite confirmer une commande AMAHRI.",
      "",
      "Client : "+name,
      "Téléphone : "+phone,
      "Ville : "+city,
      "Adresse : "+address,
      "",
      "Produits :",
      ...items.map(i=>"- "+i.name+" | "+i.size+" ml | Quantité "+i.quantity+" | "+A.money(i.quantity*i.price)),
      "",
      "Total produits (hors livraison) : "+A.money(A.total()),
      "Merci de confirmer la disponibilité et les frais de livraison."
    ];
    window.open("https://wa.me/212609180234?text="+encodeURIComponent(lines.join("\n")),"_blank","noopener,noreferrer");
    UI.toast("WhatsApp ouvert pour la confirmation");
  });
}
if(page==="contact") {
 const form=document.getElementById("contact-form");
 form?.addEventListener("submit",event=>{
   event.preventDefault();
   if(!form.reportValidity())return;
   const name=document.getElementById("contact-name").value.trim();
   const email=document.getElementById("contact-email").value.trim();
   const subject=document.getElementById("contact-subject").value.trim();
   const message=document.getElementById("contact-message").value.trim();
   const body=`Nom : ${name}\nEmail : ${email}\n\n${message}`;
   window.location.href="mailto:ayoubamahri2001@gmail.com?subject="+encodeURIComponent("[AMAHRI] "+subject)+"&body="+encodeURIComponent(body);
   UI.toast("Votre messagerie va s’ouvrir");
 });
}
})();
