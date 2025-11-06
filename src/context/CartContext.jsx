// Context del carrito de compras con persistencia en localStorage
import { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Estado del carrito con persistencia
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (producto) => {
    const itemExistente = cart.find((item) => item.id === producto.id);

    if (itemExistente) {
      // Producto ya existe, verificar stock
      if (itemExistente.cantidad >= producto.stock) {
        Swal.fire({
          icon: 'error',
          title: 'Stock insuficiente',
          text: `Solo hay ${producto.stock} unidades disponibles`,
        });
        return;
      }

      // Incrementar cantidad
      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );

      Swal.fire({
        icon: 'success',
        title: 'Cantidad actualizada',
        text: `Ahora tienes ${itemExistente.cantidad + 1} unidades`,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      // Producto nuevo, verificar stock
      if (producto.stock <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Sin stock',
          text: 'Este producto no está disponible',
        });
        return;
      }

      // Agregar al carrito
      setCart([...cart, { ...producto, cantidad: 1 }]);

      Swal.fire({
        icon: 'success',
        title: '¡Añadido al carrito!',
        text: `${producto.nombre} fue agregado`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    const producto = cart.find((item) => item.id === productId);

    Swal.fire({
      title: '¿Eliminar producto?',
      text: `¿Quieres eliminar "${producto?.nombre}" del carrito?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(cart.filter((item) => item.id !== productId));
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Producto eliminado del carrito',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    // Si la cantidad es 0 o menor, eliminar
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const item = cart.find((item) => item.id === productId);
    
    if (!item) return;

    // Verificar stock
    if (newQuantity > item.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Stock insuficiente',
        text: `Solo hay ${item.stock} unidades disponibles`,
      });
      return;
    }

    // Actualizar cantidad
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    Swal.fire({
      title: '¿Vaciar carrito?',
      text: '¿Estás seguro de eliminar todos los productos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        Swal.fire({
          icon: 'success',
          title: 'Carrito vaciado',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Obtener total de items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.cantidad, 0);
  };

  // Obtener precio total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  // Obtener cantidad de un producto específico
  const getItemQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.cantidad : 0;
  };

  // Verificar si un producto está en el carrito
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemQuantity,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personalizado para usar el carrito
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}
