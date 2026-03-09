"use client"

import { useState } from "react";

export default function CrearAutor() {

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !birthDate) {
      setError("Nombre y fecha de nacimiento son obligatorios");
      return;
    }

    const date = new Date(birthDate);

    if (isNaN(date.getTime())) {
      setError("La fecha de nacimiento no es válida");
      return;
    }

    const today = new Date();
    if (date > today) {
      setError("La fecha de nacimiento no puede ser en el futuro");
      return;
    }

    try {

      const response = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          birthDate,
          description,
          image
        })
      });

      if (!response.ok) {
        throw new Error("Error al crear autor");
      }

      setError("");
      alert("Autor creado correctamente");

      setName("");
      setBirthDate("");
      setDescription("");
      setImage("");

    } catch (err) {
      setError("No se pudo crear el autor. Verifique los datos.");
    }
  };

  return (
    <div>

      <h1>Crear Autor</h1>

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <label>Nombre</label>
        <input
          aria-label="Nombre del autor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <label>Fecha de nacimiento</label>
        <input
          placeholder="YYYY-MM-DD"
          aria-label="Fecha de nacimiento"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <br />

        <label>Descripción</label>
        <input
          aria-label="Descripción del autor"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />

        <label>Imagen</label>
        <input
          aria-label="URL de la imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br />

        <button type="submit">
          Crear
        </button>

      </form>

    </div>
  );
}