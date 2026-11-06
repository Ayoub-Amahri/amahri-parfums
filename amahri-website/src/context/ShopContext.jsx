import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct, productPrice } from '../data/catalogue';

const ShopContext = createContext(null);
const clampQuantity = (quantity) => Math.max(1, Math.min(99, Math.round(Number(quantity) || 1)));

function readArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function initialCart() {
  // Compatible with the cart stored by the old HTML/JavaScript version.
  const merged = new Map();
  readArray('cart').forEach((row) => {
    const product = getProduct(row?.id);
    if (!product) return;
    const size = String(row.size) === '50' ? '50' : '30';
    const key = `${product.id}-${size}`;
    const quantity = clampQuantity(row.quantity);
    merged.set(key, {
      id: product.id,
      size,
      quantity: Math.min(99, (merged.get(key)?.quantity || 0) + quantity),
    });
  });
  return [...merged.values()];
}

function initialWishlist() {
  return [...new Set(readArray('wishlist').map(Number).filter((id) => !!getProduct(id)))];
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(initialCart);
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch { /* Private browsing */ }
  }, [cart]);
  useEffect(() => {
    try { localStorage.setItem('wishlist', JSON.stringify(wishlist)); } catch { /* Private browsing */ }
  }, [wishlist]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  function addToCart(id, size = '30', quantity = 1) {
    if (!getProduct(id)) return;
    const normalizedId = Number(id);
    const normalizedSize = String(size) === '50' ? '50' : '30';
    const normalizedQty = clampQuantity(quantity);
    setCart((current) => {
      const match = current.find((row) => row.id === normalizedId && row.size === normalizedSize);
      if (match) {
        return current.map((row) => row === match ? { ...row, quantity: Math.min(99, row.quantity + normalizedQty) } : row);
      }
      return [...current, { id: normalizedId, size: normalizedSize, quantity: normalizedQty }];
    });
    setToast('Parfum ajouté au panier');
  }

  function updateQuantity(id, size, delta) {
    setCart((current) => current.map((row) => {
      if (row.id !== Number(id) || row.size !== String(size)) return row;
      return { ...row, quantity: Math.min(99, row.quantity + Number(delta)) };
    }).filter((row) => row.quantity > 0));
  }

  function removeFromCart(id, size) {
    setCart((current) => current.filter((row) => !(row.id === Number(id) && row.size === String(size))));
    setToast('Produit retiré du panier');
  }

  function toggleWishlist(id) {
    const normalizedId = Number(id);
    if (!getProduct(normalizedId)) return;
    setWishlist((current) => current.includes(normalizedId)
      ? current.filter((value) => value !== normalizedId)
      : [...current, normalizedId]);
    setToast(wishlist.includes(normalizedId) ? 'Retiré des favoris' : 'Ajouté aux favoris');
  }

  const detailedCart = useMemo(() => cart.map((row) => {
    const product = getProduct(row.id);
    if (!product) return null;
    return { ...row, product, price: productPrice(product, row.size),
      lineTotal: productPrice(product, row.size) * row.quantity };
  }).filter(Boolean), [cart]);

  const total = detailedCart.reduce((sum, row) => sum + row.lineTotal, 0);
  const cartCount = detailedCart.reduce((sum, row) => sum + row.quantity, 0);
  return <ShopContext.Provider value={{ cart, detailedCart, wishlist, toast,
    addToCart, updateQuantity, removeFromCart, toggleWishlist, cartCount, total, setToast }}>
    {children}
  </ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error('useShop doit être utilisé dans ShopProvider');
  return value;
}
