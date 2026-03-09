"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthorsPage() {

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/authors")
      .then(res => res.json())
      .then(data => setAuthors(data));
  }, []);


  const deleteAuthor = async (id) => {
    await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
      method: "DELETE"
    });

    setAuthors(authors.filter(author => author.id !== id));
  };


  return (
    <div>

      <h1>Lista de autores</h1>

      {authors.map(author => (
        <div key={author.id}>
          <h3>{author.name}</h3>
          <p>{author.description}</p>
          <p>{author.birthDate}</p>
          
        <div style={{ display: "flex", gap: "10px" }}>

          <Link href={`/editar/${author.id}`}>
          <button>Editar</button>
          </Link>

          <button onClick={() => deleteAuthor(author.id)}>
            Eliminar
          </button>

</div>
        </div>
      ))}

    </div>
  );
}