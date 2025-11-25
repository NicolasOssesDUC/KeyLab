import { useState } from 'react';
import { Container } from '../ui';
import Pagination from '../ui/Pagination';

function TestPagination() {
  // Estados para diferentes ejemplos
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [page3, setPage3] = useState(3);
  const [page4, setPage4] = useState(1);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Pruebas de Pagination</h1>

      {/* Ejemplo 1: Paginación básica */}
      <section className="mb-5">
        <h2>1. Paginación Básica (5 páginas)</h2>
        <p>Página actual: <strong>{page1}</strong> de 5</p>
        <Pagination
          currentPage={page1}
          totalPages={5}
          onPageChange={setPage1}
        />
      </section>

      <hr />

      {/* Ejemplo 2: Diferentes tamaños */}
      <section className="mb-5">
        <h2>2. Diferentes Tamaños</h2>
        
        <h4 className="mt-4">Pequeño (sm)</h4>
        <Pagination
          currentPage={page2}
          totalPages={5}
          onPageChange={setPage2}
          size="sm"
        />

        <h4 className="mt-4">Normal (md)</h4>
        <Pagination
          currentPage={page2}
          totalPages={5}
          onPageChange={setPage2}
          size="md"
        />

        <h4 className="mt-4">Grande (lg)</h4>
        <Pagination
          currentPage={page2}
          totalPages={5}
          onPageChange={setPage2}
          size="lg"
        />
      </section>

      <hr />

      {/* Ejemplo 3: Diferentes alineaciones */}
      <section className="mb-5">
        <h2>3. Diferentes Alineaciones</h2>
        
        <h4 className="mt-4">Izquierda (start)</h4>
        <Pagination
          currentPage={page3}
          totalPages={7}
          onPageChange={setPage3}
          align="start"
        />

        <h4 className="mt-4">Centro (center)</h4>
        <Pagination
          currentPage={page3}
          totalPages={7}
          onPageChange={setPage3}
          align="center"
        />

        <h4 className="mt-4">Derecha (end)</h4>
        <Pagination
          currentPage={page3}
          totalPages={7}
          onPageChange={setPage3}
          align="end"
        />
      </section>

      <hr />

      {/* Ejemplo 4: Sin botones Anterior/Siguiente */}
      <section className="mb-5">
        <h2>4. Solo Números (sin Anterior/Siguiente)</h2>
        <Pagination
          currentPage={page4}
          totalPages={8}
          onPageChange={setPage4}
          showPrevNext={false}
        />
      </section>

      <hr />

      {/* Ejemplo 5: Labels personalizados */}
      <section className="mb-5">
        <h2>5. Labels Personalizados</h2>
        
        <h4 className="mt-4">Con símbolos</h4>
        <Pagination
          currentPage={page1}
          totalPages={5}
          onPageChange={setPage1}
          prevLabel="←"
          nextLabel="→"
        />

        <h4 className="mt-4">Con flechas dobles</h4>
        <Pagination
          currentPage={page1}
          totalPages={5}
          onPageChange={setPage1}
          prevLabel="«"
          nextLabel="»"
        />

        <h4 className="mt-4">Con texto personalizado</h4>
        <Pagination
          currentPage={page1}
          totalPages={5}
          onPageChange={setPage1}
          prevLabel="◀ Atrás"
          nextLabel="Adelante ▶"
        />
      </section>

      <hr />

      {/* Ejemplo 6: Muchas páginas */}
      <section className="mb-5">
        <h2>6. Muchas Páginas (20 páginas)</h2>
        <p className="text-muted">
          Nota: Por ahora muestra todas. En el futuro podríamos implementar ellipsis (...)
        </p>
        <Pagination
          currentPage={page1}
          totalPages={20}
          onPageChange={setPage1}
        />
      </section>

      <hr />

      {/* Ejemplo 7: Caso extremo - 1 página */}
      <section className="mb-5">
        <h2>7. Caso Extremo: 1 Página</h2>
        <p className="text-muted">
          Cuando solo hay 1 página, el componente no renderiza nada (return null)
        </p>
        <div className="border p-3 bg-light">
          <Pagination
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
          />
          <p className="mb-0 text-center">
            ← Aquí debería estar la paginación, pero no se muestra porque solo hay 1 página
          </p>
        </div>
      </section>

      <hr />

      {/* Ejemplo 8: Uso real con productos simulados */}
      <section className="mb-5">
        <h2>8. Ejemplo Real: Listado de Productos</h2>
        <ProductList />
      </section>
    </Container>
  );
}

// Componente auxiliar para demostrar uso real
function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Simular 50 productos
  const totalItems = 50;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Calcular qué productos mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  
  return (
    <div>
      <div className="alert alert-info">
        Mostrando productos <strong>{startIndex}-{endIndex}</strong> de <strong>{totalItems}</strong>
      </div>

      {/* Grid simulado de productos */}
      <div className="row g-3 mb-4">
        {Array.from({ length: itemsPerPage }, (_, i) => {
          const productNum = startIndex + i;
          if (productNum > totalItems) return null;
          
          return (
            <div key={productNum} className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Producto {productNum}</h5>
                  <p className="card-text">Descripción del producto {productNum}</p>
                  <button className="btn btn-primary btn-sm">Ver más</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default TestPagination;
