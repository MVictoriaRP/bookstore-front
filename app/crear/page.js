"use client"

import { useState, useEffect } from "react";

export default function CrearAutor() {

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const isValid =
  name.trim() !== "" &&
  birthDate.trim() !== "";

  useEffect(() => {

    if (name && !birthDate) {
      setError("nombre y fecha de nacimiento obligatorios");
      return;
    }

    if (name && birthDate) {

      const date = new Date(birthDate);

      if (isNaN(date.getTime())) {
        setError("fecha de nacimiento no valida");
        return;
      }

      const today = new Date();

      if (date > today) {
        setError("fecha de nacimiento no puede ser en el futuro");
        return;
      }

      setError("");
    }

  }, [name, birthDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) return;
    
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
        throw new Error("error al crear autor");
      }

      setError("");
      alert("autor creado correctamente");

      setName("");
      setBirthDate("");
      setDescription("");
      setImage("");

    } catch (err) {
      setError("no se pudo crear. Verifique los datos.");
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

        <button type="submit" disabled={!isValid}>
          Crear
        </button>

      </form>

    </div>
  );
}