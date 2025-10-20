import { forwardRef } from 'react';

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  danger: 'btn-danger',
  warning: 'btn-warning',
  info: 'btn-info',
  light: 'btn-light',
  dark: 'btn-dark',
  link: 'btn-link',
};

const SIZES = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  outline = false,
  block = false,
  type = 'button',
  disabled = false,
  className = '',
  children,
  ...rest
}, ref) => {
  const variantClass = outline 
    ? `btn-outline-${variant}` 
    : VARIANTS[variant] || VARIANTS.primary;
  
  const sizeClass = SIZES[size] || '';
  const blockClass = block ? 'w-100' : '';
  
  const classes = [
    'btn',
    variantClass,
    sizeClass,
    blockClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
