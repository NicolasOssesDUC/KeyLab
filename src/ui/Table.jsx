import { forwardRef } from 'react';

const getTableClasses = ({
  striped,
  hover,
  bordered,
  borderless,
  size,
  variant,
  className
}) => {
  const classes = ['table'];

  if (striped) {
    classes.push(typeof striped === 'string' ? `table-striped-${striped}` : 'table-striped');
  }

  if (hover) {
    classes.push('table-hover');
  }

  if (bordered) {
    classes.push('table-bordered');
  }

  if (borderless) {
    classes.push('table-borderless');
  }

  if (size === 'sm') {
    classes.push('table-sm');
  }

  if (variant) {
    classes.push(`table-${variant}`);
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

const wrapResponsive = (table, responsive) => {
  if (!responsive) {
    return table;
  }

  const responsiveClass = typeof responsive === 'string'
    ? `table-responsive-${responsive}`
    : 'table-responsive';

  return (
    <div className={responsiveClass}>
      {table}
    </div>
  );
};

export const Table = ({
  striped = false,
  hover = false,
  bordered = false,
  borderless = false,
  size,
  variant,
  responsive = false,
  className = '',
  children,
  ...rest
}) => {
  const table = (
    <table className={getTableClasses({ striped, hover, bordered, borderless, size, variant, className })} {...rest}>
      {children}
    </table>
  );

  return wrapResponsive(table, responsive);
};

export const TableHead = ({ className = '', children, ...rest }) => (
  <thead className={className} {...rest}>
    {children}
  </thead>
);

export const TableBody = ({ className = '', children, ...rest }) => (
  <tbody className={className} {...rest}>
    {children}
  </tbody>
);

export const TableFoot = ({ className = '', children, ...rest }) => (
  <tfoot className={className} {...rest}>
    {children}
  </tfoot>
);

export const TableRow = ({ className = '', children, ...rest }) => (
  <tr className={className} {...rest}>
    {children}
  </tr>
);

export const TableCell = forwardRef((props, ref) => {
  const {
    as,
    className = '',
    scope,
    children,
    ...rest
  } = props;

  const Component = as ?? 'td';

  return (
    <Component ref={ref} className={className} scope={scope} {...rest}>
      {children}
    </Component>
  );
});

TableCell.displayName = 'TableCell';
