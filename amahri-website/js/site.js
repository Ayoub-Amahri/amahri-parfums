/* Site-wide interactions, product cards, counters, keyboard-friendly menu. */
(function() {
"use strict";
const A=window.Amahri, e=A.escapeHTML;
const images = {
  wishlist: "♡", selected: "♥"
};
function priceMarkup(p,size="30") {
  if(String(size)==="50") {
    return `<span class="price-label">50 ml</span> <strong class="current-price">${A.money(p.price50)}</strong>`;
  }
  return `<span class="price-label">30 ml</span> <del class="old-price" aria-label="Ancien prix ${A.money(p.oldPrice30 || 30)}">${A.money(p.oldPrice30 || 30)}</del> <strong class="current-price">${A.money(p.price30)}</strong>`;
}
function productCard(p) {
  const liked=A.getWishlist().includes(p.id);
  return `<article class="product-card" data-product-card="${p.id}">
    <div class="product-image-wrap">
      ${p.badge ? `<span class="product-tag">${e(p.badge)}</span>` : ""}
      <button type="button" class="wish-button ${liked?"is-active":""}" data-wish="${p.id}"
        aria-label="${liked?"Retirer des favoris":"Ajouter aux favoris"} : ${e(p.name)}" aria-pressed="${liked}">${liked ? images.selected : images.wishlist}</button>
      ${p.illustrativeImage ? `<span class="illustration-tag">Photo de référence</span>` : ""}
      <a href="product.html?id=${p.id}" aria-label="Voir ${e(p.name)}">
        <img src="${e(p.image)}" alt="Photo du parfum de référence ${e(p.name)}" loading="lazy">
      </a>
    </div>
    <div class="product-card-info">
      <div class="product-category">Collection ${p.category === "men" ? "Homme" : "Femme"}</div>
      <h3><a href="product.html?id=${p.id}">${e(p.name)}</a></h3>
      <p class="product-description">${e(p.brand)}</p>
      <p class="product-price">${priceMarkup(p)}</p>
      <div class="product-card-actions">
        <a class="button button-outline" href="product.html?id=${p.id}">Découvrir</a>
        <button class="button button-dark" type="button" data-add="${p.id}">Ajouter au panier</button>
      </div>
    </div>
  </article>`;
}
function updateHeader() {
  const cart=A.quantity(), wish=A.getWishlist().length;
  document.querySelectorAll("[data-cart-count]").forEach(n=>n.textContent=cart);
  document.querySelectorAll("[data-wishlist-count]").forEach(n=>n.textContent=wish);
  document.querySelectorAll("[data-wish]").forEach(button=>{
    const selected=A.getWishlist().includes(Number(button.dataset.wish));
    button.classList.toggle("is-active",selected);
    button.setAttribute("aria-pressed",String(selected));
    button.textContent=selected?"♥":"♡";
    button.setAttribute("aria-label", selected?"Retirer des favoris":"Ajouter aux favoris");
  });
}
let toastTimer;
function toast(message) {
  const el=document.getElementById("toast");
  if (!el) return;
  el.textContent=message;
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove("visible"),2600);
}
document.addEventListener("click",event=>{
  const add=event.target.closest("[data-add]");
  if (add) {
    A.addToCart(Number(add.dataset.add),add.dataset.size || "30",Number(add.dataset.quantity)||1);
    toast("Parfum ajouté au panier");
    return;
  }
  const wish=event.target.closest("[data-wish]");
  if (wish) {
    const selected=A.toggleWishlist(wish.dataset.wish);
    toast(selected?"Ajouté à vos favoris":"Retiré des favoris");
  }
});
const menuButton=document.querySelector("[data-menu-toggle]");
const nav=document.getElementById("primary-nav");
if (menuButton && nav) {
 menuButton.addEventListener("click",()=>{
   const open=nav.classList.toggle("is-open");
   menuButton.setAttribute("aria-expanded", String(open));
   menuButton.setAttribute("aria-label",open?"Fermer le menu":"Ouvrir le menu");
 });
 document.addEventListener("keydown",event=>{if(event.key==="Escape"){nav.classList.remove("is-open");menuButton.setAttribute("aria-expanded","false");}});
}
const searchToggle=document.querySelector("[data-search-toggle]"), mobileSearch=document.querySelector(".mobile-search");
if(searchToggle && mobileSearch) searchToggle.addEventListener("click",()=>{
  mobileSearch.hidden=!mobileSearch.hidden;
  if(!mobileSearch.hidden) mobileSearch.querySelector("input").focus();
});
function cardGrid(container,list) {
 if(!container) return;
 container.innerHTML=list.length?list.map(productCard).join(""):`<div class="empty-state"><span class="empty-symbol">◇</span><h3>Aucun parfum trouvé</h3><p>Essayez une autre recherche ou explorez toutes les collections.</p><a class="button button-dark" href="shop.html">Voir la boutique</a></div>`;
}
document.addEventListener("amahri:change", updateHeader);
updateHeader();
window.AmahriUI={productCard,priceMarkup,cardGrid,toast,updateHeader};
})();
