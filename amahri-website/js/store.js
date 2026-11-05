/* Shared cart + wishlist state, using original product catalogue and localStorage. */
(function () {
  "use strict";
  const CART = "cart";
  const WISH = "wishlist";
  const listeners = new Set();
  let ephemeral = Object.create(null);
  const allProducts = () => typeof products !== "undefined" ? products : [];
  const productById = id => allProducts().find(p => p.id === Number(id));
  function read(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : (ephemeral[key] || []);
    } catch (_) {
      return ephemeral[key] || [];
    }
  }
  function write(key, value) {
    ephemeral[key] = value;
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
    document.dispatchEvent(new CustomEvent("amahri:change", {detail: {key}}));
  }
  function getCart() {
    const raw = read(CART);
    if (!Array.isArray(raw)) return [];
    return raw.map(row => {
      const product = productById(row.id);
      if (!product) return null;
      const size = String(row.size) === "50" ? "50" : "30";
      const quantity = Math.min(99, Math.max(1, Math.round(Number(row.quantity) || 1)));
      return {id:product.id, name:product.name, brand:product.brand, image:product.image,
        size, quantity, price: size === "50" ? product.price50 : product.price30};
    }).filter(Boolean);
  }
  function saveCart(rows) { write(CART, rows); }
  function getWishlist() {
    const raw = read(WISH);
    if (!Array.isArray(raw)) return [];
    return [...new Set(raw.map(Number).filter(id => !!productById(id)))];
  }
  function toggleWishlist(id) {
    id = Number(id);
    if (!productById(id)) return false;
    const wishlist = getWishlist();
    const selected = wishlist.includes(id);
    write(WISH, selected ? wishlist.filter(v => v !== id) : [...wishlist, id]);
    return !selected;
  }
  function addToCart(id, size = "30", quantity = 1) {
    const product = productById(id);
    if (!product) return;
    size = String(size) === "50" ? "50" : "30";
    const qty = Math.min(99, Math.max(1, Math.round(Number(quantity) || 1)));
    const cart = getCart(), existing = cart.find(i => i.id === product.id && i.size === size);
    if (existing) existing.quantity = Math.min(99, existing.quantity + qty);
    else cart.push({id:product.id, name:product.name, brand:product.brand, image:product.image,
      size, quantity:qty, price: size === "50" ? product.price50 : product.price30});
    saveCart(cart);
  }
  function updateQuantity(id,size,delta) {
    const cart=getCart();
    const row=cart.find(i=>i.id===Number(id) && i.size===String(size));
    if (!row) return;
    row.quantity=Math.min(99,row.quantity+Number(delta));
    saveCart(cart.filter(i=>i.quantity>0));
  }
  function removeCart(id,size) {saveCart(getCart().filter(i=>!(i.id===Number(id) && i.size===String(size))));}
  function total() {return getCart().reduce((sum,item)=>sum+item.price*item.quantity,0);}
  function quantity() {return getCart().reduce((sum,item)=>sum+item.quantity,0);}
  function escapeHTML(value) {return String(value ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function money(value) {return new Intl.NumberFormat("fr-MA",{maximumFractionDigits:0}).format(value) + " DH";}
  window.Amahri = {allProducts,productById,getCart,saveCart,getWishlist,toggleWishlist,addToCart,updateQuantity,removeCart,total,quantity,escapeHTML,money};
})();
