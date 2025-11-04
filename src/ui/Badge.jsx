// src/ui/Badge.jsx
// Componente Badge - Etiquetas pequeñas para indicar estados, categorías o notificaciones

const VARIANTS = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning',
  info: 'bg-info',
  light: 'bg-light',
  dark: 'bg-dark',
};

const TEXT_COLORS = {
  primary: 'text-white',
  secondary: 'text-white',
  success: 'text-white',
  danger: 'text-white',
  warning: 'text-dark',
  info: 'text-dark',
  light: 'text-dark',
  dark: 'text-white',
};

const Badge = ({
  variant = 'primary',
  bg,
  text,
  pill = false,
  className = '',
  children,
  ...rest
}) => {
  // Determinar el color de fondo
  const bgClass = bg ? `bg-${bg}` : VARIANTS[variant] || VARIANTS.primary;
  
  // Determinar el color del texto
  const textClass = text 
    ? `text-${text}` 
    : TEXT_COLORS[variant] || TEXT_COLORS.primary;
  
  // Clase para badge redondeado
  const pillClass = pill ? 'rounded-pill' : '';
  
  // Unir todas las clases
  const classes = [
    'badge',
    bgClass,
    textClass,
    pillClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;
