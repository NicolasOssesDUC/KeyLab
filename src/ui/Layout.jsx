import { forwardRef } from 'react';

// Container Component
export const Container = forwardRef(({
  fluid = false,
  className = '',
  children,
  ...rest
}, ref) => {
  const classes = [
    fluid ? 'container-fluid' : 'container',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

Container.displayName = 'Container';

// Row Component
export const Row = forwardRef(({
  className = '',
  children,
  ...rest
}, ref) => {
  const classes = ['row', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

Row.displayName = 'Row';

// Col Component
export const Col = forwardRef(({
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className = '',
  children,
  ...rest
}, ref) => {
  const colClasses = [];
  
  if (xs) colClasses.push(`col-${xs}`);
  if (sm) colClasses.push(`col-sm-${sm}`);
  if (md) colClasses.push(`col-md-${md}`);
  if (lg) colClasses.push(`col-lg-${lg}`);
  if (xl) colClasses.push(`col-xl-${xl}`);
  if (xxl) colClasses.push(`col-xxl-${xxl}`);
  
  // Si no hay breakpoints específicos, usar col genérico
  if (colClasses.length === 0) {
    colClasses.push('col');
  }

  const classes = [...colClasses, className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

Col.displayName = 'Col';
