import { Container } from "../ui";

function Ubicacion() {
  return (
    <Container className="ubicacion py-5">
      <div className="ubicacion">
        <h2>¿En dónde nos encontramos ubicados?</h2>
      </div>

      <div className="ubicacion">
        <h1>Nos encontramos ubicados en:</h1>
        <h2>Padre Alonso de Ovalle, 8330196 Santiago, Región Metropolitana</h2>
        <h3>Horario de atención: Lunes a Viernes de 10:00 a 18:00 hrs</h3>
        <h3>Sábados de 10:00 a 14:00 hrs</h3>
        <h3>Domingos cerrado</h3>
        <p>Aquí tienes un mapa sobre nuestros locales</p>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208.06782628245284!2d-70.6581177863977!3d-33.447086198307645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5001eea9677%3A0x1d709d186a390c15!2sKeyLab.Co!5e0!3m2!1ses!2scl!4v1757124272005!5m2!1ses!2scl"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación KeyLab"
        ></iframe>
      </div>
    </Container>
  );
}


export default Ubicacion;