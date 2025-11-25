import { useState } from 'react';

const VARIANTS = {
  primary: 'alert-primary',
  secondary: 'alert-secondary',
  success: 'alert-success',
  danger: 'alert-danger',
  warning: 'alert-warning',
  info: 'alert-info',
  light: 'alert-light',
  dark: 'alert-dark'
};

const Alert = ({
  variant = 'primary',
  dismissible = false,
  heading,
  onClose,
  show: controlledShow,
  className = '',
  closeLabel = 'Close',
  children,
  ...rest
}) => {
  const [uncontrolledShow, setUncontrolledShow] = useState(true);
  const isControlled = controlledShow !== undefined;
  const isVisible = isControlled ? controlledShow : uncontrolledShow;

  if (!isVisible) {
    return null;
  }

  const alertClasses = [
    'alert',
    VARIANTS[variant] || VARIANTS.primary,
    dismissible && 'alert-dismissible fade show',
    className
  ].filter(Boolean).join(' ');

  const handleClose = (event) => {
    if (!isControlled) {
      setUncontrolledShow(false);
    }

    onClose?.(event);
  };

  return (
    <div className={alertClasses} role="alert" {...rest}>
      {heading && <h4 className="alert-heading">{heading}</h4>}
      {children}
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          aria-label={closeLabel}
          onClick={handleClose}
        />
      )}
    </div>
  );
};

export default Alert;
