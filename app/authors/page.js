"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthorsPage() {

  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div>

      <h1>Lista de autores</h1>

      <input
      placeholder="Buscar"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />

      {filteredAuthors.length === 0 && (
        <p>no hay resultadoa</p>
      )}

      {filteredAuthors.map(author => (
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