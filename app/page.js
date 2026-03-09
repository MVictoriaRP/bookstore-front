import Link from "next/link";

export default function Home() {
  return (
    <div>

      <h1>Bookstore</h1>

      <nav>
        <ul>

          <li>
            <Link href="/authors">
              Ver autores
            </Link>
          </li>

          <li>
            <Link href="/crear">
              Crear autor
            </Link>
          </li>

        </ul>
      </nav>

    </div>
  );
}