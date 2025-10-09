function Carrito() {
  return (
    <main className="container mt-5">
      <div className="intro_2">
        <h1>Tu Carrito</h1>
        <p>Revisa los productos que has agregado y finaliza tu compra.</p>
      </div>

      <section className="my-4">
        <div id="carrito-vacio" className="alert alert-info text-center">
          Tu carrito está vacío.
        </div>
        <div id="carrito-lista"></div>
        <div id="carrito-total" className="text-end mt-4 fw-bold fs-4"></div>
        <div className="text-end mt-3">
          <button id="vaciar-carrito" className="btn btn-outline-danger">
            Vaciar carrito
          </button>
          <button id="finalizar-compra" className="btn btn-success ms-2">
            Finalizar compra
          </button>
        </div>
      </section>
    </main>
  );
}

export default Carrito;
