import { useState } from "react";
import Swal from "sweetalert2"; 
import FormField from "../ui/FormField"; 
import { Container, Button } from "../ui"; 

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const [error, setError] = useState("");

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validación y envío
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (formData.nombre.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nombre debe tener al menos 3 caracteres",
      });
      return;
    }

    if (!formData.correo.includes("@")) {
      setError("El correo no es válido");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor ingresa un correo válido",
      });
      return;
    }

    if (formData.mensaje.trim().length < 10) {
      setError("El mensaje debe tener al menos 10 caracteres");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Tu mensaje es demasiado corto",
      });
      return;
    }

    // Si todo está bien
    setError("");
    Swal.fire({
      icon: "success",
      title: "Mensaje enviado",
      text: "Nos pondremos en contacto contigo pronto.",
    });

    console.log("Formulario enviado:", formData);

    // ✨ Limpiar formulario después de enviar correctamente
    setFormData({
      nombre: "",
      correo: "",
      mensaje: "",
    });
  };

  return (
    <Container className="contacto-form py-5">
      <h2>Contáctanos</h2>
      <p>Si tienes alguna pregunta, siéntete libre de alcanzarnos!</p>

      {error && <p style={{ color: "tomato" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <FormField
          type="email"
          name="correo"
          label="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
        />

        <FormField
          as="textarea"
          name="mensaje"
          label="Mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
        />

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </form>
    </Container>
  );
}

export default Contacto;