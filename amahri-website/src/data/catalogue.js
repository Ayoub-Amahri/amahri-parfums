import products from './products.json';

export { products };
export const getProduct = (id) => products.find((product) => product.id === Number(id));
export const money = (value) => `${new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 0 }).format(value)} DH`;
export const productPrice = (product, size = '30') => String(size) === '50' ? product.price50 : product.price30;
