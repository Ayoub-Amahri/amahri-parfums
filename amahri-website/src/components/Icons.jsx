export function Icon({ name, size = 20, ...props }) {
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></>,
    cart: <><path d="M3 4h2l2.2 11.5a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 1.9-1.5L23 8H6"/><path d="M10 21h.01M19 21h.01"/></>,
    heart: <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"/>,
    menu: <path d="M3 6h18M3 12h18M3 18h18"/>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size}
      fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {paths[name]}
  </svg>;
}
