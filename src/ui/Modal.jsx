// src/ui/Modal.jsx
// Componentes de Modal para diálogos y ventanas emergentes
import { useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

// Context para compartir onHide entre componentes del Modal
const ModalContext = createContext(null);

// Mapeo de tamaños
const SIZES = {
  sm: 'modal-sm',
  md: '',
  lg: 'modal-lg',
  xl: 'modal-xl',
};

// Componente Modal principal
export function Modal({
  show = false,
  onHide,
  size = 'md',
  centered = false,
  backdrop = true,
  keyboard = true,
  animation = true,
  scrollable = false,
  fullscreen = false,
  className = '',
  children,
}) {
  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [show]);

  // Manejar tecla ESC
  useEffect(() => {
    if (!show || !keyboard) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onHide?.();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [show, keyboard, onHide]);

  // No renderizar si no está visible
  if (!show) {
    return null;
  }

  // Manejar click en backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && backdrop !== 'static') {
      onHide?.();
    }
  };

  // Construcción de clases
  const sizeClass = SIZES[size] || '';
  const centeredClass = centered ? 'modal-dialog-centered' : '';
  const scrollableClass = scrollable ? 'modal-dialog-scrollable' : '';
  
  // Clase fullscreen
  let fullscreenClass = '';
  if (fullscreen === true) {
    fullscreenClass = 'modal-fullscreen';
  } else if (typeof fullscreen === 'string') {
    fullscreenClass = `modal-fullscreen-${fullscreen}`;
  }

  const dialogClasses = [
    'modal-dialog',
    sizeClass,
    centeredClass,
    scrollableClass,
    fullscreenClass,
  ].filter(Boolean).join(' ');

  const modalClasses = [
    'modal',
    animation ? 'fade' : '',
    'show',
    className,
  ].filter(Boolean).join(' ');

  // Renderizar usando Portal en document.body
  return createPortal(
    <ModalContext.Provider value={{ onHide }}>
      {/* Backdrop (fondo oscuro) */}
      {backdrop && <div className="modal-backdrop fade show" />}

      {/* Modal */}
      <div
        className={modalClasses}
        style={{ display: 'block' }}
        onClick={handleBackdropClick}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className={dialogClasses}>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

// Componente ModalHeader
export function ModalHeader({
  closeButton = true,
  className = '',
  children,
}) {
  const { onHide } = useContext(ModalContext);
  const classes = ['modal-header', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
      {closeButton && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onHide}
        />
      )}
    </div>
  );
}

// Componente ModalTitle
export function ModalTitle({
  as: Component = 'h5',
  className = '',
  children,
}) {
  const classes = ['modal-title', className].filter(Boolean).join(' ');

  return <Component className={classes}>{children}</Component>;
}

// Componente ModalBody
export function ModalBody({ className = '', children }) {
  const classes = ['modal-body', className].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}

// Componente ModalFooter
export function ModalFooter({ className = '', children }) {
  const classes = ['modal-footer', className].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}

// DisplayNames para debugging
Modal.displayName = 'Modal';
ModalHeader.displayName = 'ModalHeader';
ModalTitle.displayName = 'ModalTitle';
ModalBody.displayName = 'ModalBody';
ModalFooter.displayName = 'ModalFooter';
