// src/ui/Pagination.jsx
// Componente de paginación para navegar entre páginas de contenido

const SIZES = {
  sm: 'pagination-sm',
  md: '',
  lg: 'pagination-lg',
};

const ALIGNMENTS = {
  start: 'justify-content-start',
  center: 'justify-content-center',
  end: 'justify-content-end',
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  size = 'md',
  align = 'center',
  showPrevNext = true,
  prevLabel = 'Anterior',
  nextLabel = 'Siguiente',
  className = '',
}) {
  // No mostrar si hay 1 o menos páginas
  if (totalPages <= 1) {
    return null;
  }

  // Estados de deshabilitación
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  // Generar array de páginas [1, 2, 3, ...]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handlers
  const handlePrev = () => {
    if (!isPrevDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Construcción de clases CSS
  const sizeClass = SIZES[size] || '';
  const alignClass = ALIGNMENTS[align] || ALIGNMENTS.center;
  const navClasses = [alignClass, className].filter(Boolean).join(' ');
  const ulClasses = ['pagination', sizeClass].filter(Boolean).join(' ');

  return (
    <nav aria-label="Navegación de páginas" className={navClasses}>
      <ul className={ulClasses}>
        
        {/* Botón Anterior */}
        {showPrevNext && (
          <li className={`page-item ${isPrevDisabled ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={handlePrev}
              disabled={isPrevDisabled}
              aria-label="Página anterior"
            >
              {prevLabel}
            </button>
          </li>
        )}

        {/* Números de página */}
        {pages.map((page) => {
          const isActive = page === currentPage;
          
          return (
            <li 
              key={page}
              className={`page-item ${isActive ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageClick(page)}
                aria-label={`Ir a página ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Botón Siguiente */}
        {showPrevNext && (
          <li className={`page-item ${isNextDisabled ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={handleNext}
              disabled={isNextDisabled}
              aria-label="Página siguiente"
            >
              {nextLabel}
            </button>
          </li>
        )}

      </ul>
    </nav>
  );
}

Pagination.displayName = 'Pagination';

export default Pagination;
