import { forwardRef } from 'react';

// Card Component - Contenedor principal
export const Card = forwardRef(({
  shadow = false,
  className = '',
  children,
  ...rest
}, ref) => {
  const classes = [
    'card',
    shadow && 'shadow-sm',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// CardHeader Component - Encabezado de la card
export const CardHeader = forwardRef(({
  className = '',
  children,
  ...rest
}, ref) => {
  const classes = ['card-header', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

// CardBody Component - Cuerpo principal con padding
export const CardBody = forwardRef(({
  className = '',
  children,
  ...rest
}, ref) => {
  const classes = ['card-body', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

CardBody.displayName = 'CardBody';

// CardTitle Component - Título (por defecto h5)
export const CardTitle = forwardRef(({
  as: Component = 'h5',
  className = '',
  children,
  ...rest
}, ref) => {
  const classes = ['card-title', className].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={classes} {...rest}>
      {children}
    </Component>
  );
});

CardTitle.displayName = 'CardTitle';

// CardText Component - Párrafo de texto
export const CardText = forwardRef(({
  className = '',
  children,
  ...rest
}, ref) => {
  const classes = ['card-text', className].filter(Boolean).join(' ');

  return (
    <p ref={ref} className={classes} {...rest}>
      {children}
    </p>
  );
});

CardText.displayName = 'CardText';

// CardFooter Component - Pie de página
export const CardFooter = forwardRef(({
  className = '',
  children,
  ...rest
}, ref) => {
  const classes = ['card-footer', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

// CardImg Component - Imagen
export const CardImg = forwardRef(({
  variant = 'top',
  src,
  alt = '',
  className = '',
  ...rest
}, ref) => {
  const classes = [`card-img-${variant}`, className].filter(Boolean).join(' ');

  return (
    <img ref={ref} src={src} alt={alt} className={classes} {...rest} />
  );
});

CardImg.displayName = 'CardImg';
