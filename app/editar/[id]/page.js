"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditarAutor() {

  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/authors/${id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setBirthDate(data.birthDate);
        setDescription(data.description);
        setImage(data.image);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAuthor = {
      name,
      birthDate,
      description,
      image
    };

    await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedAuthor)
    });

    router.push("/authors");
  };

  return (
    <div>

      <h1>Editar Autor</h1>

      <form onSubmit={handleSubmit}>

        <input value={name} onChange={(e) => setName(e.target.value)} />
        <br/>

        <input value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <br/>

        <input value={description} onChange={(e) => setDescription(e.target.value)} />
        <br/>

        <input value={image} onChange={(e) => setImage(e.target.value)} />
        <br/>

        <button type="submit">
          Guardar
        </button>

      </form>

    </div>
  );
}