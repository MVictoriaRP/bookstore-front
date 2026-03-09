import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CrearAutor from "../app/crear/page";

test("renderiza el titulo Crear Autor", () => {
  render(<CrearAutor />);
  
  const titulo = screen.getByText("Crear Autor");
  
  expect(titulo).toBeInTheDocument();
});

test("existe el input de nombre", () => {
  render(<CrearAutor />)

  const input = screen.getByLabelText("Nombre del autor")

  expect(input).toBeInTheDocument()
})