import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CrearAutor from "../app/crear/page";
import userEvent from "@testing-library/user-event";

const setup = () => {
  const user = userEvent.setup();
  render(<CrearAutor />);

  const nameInput = screen.getByLabelText("Nombre del autor");
  const birthDateInput = screen.getByLabelText("Fecha de nacimiento");
  const descriptionInput = screen.getByLabelText("Descripción del autor");
  const imageInput = screen.getByLabelText("URL de la imagen");
  const submitButton = screen.getByRole("button", { name: /crear/i });

  return { user, nameInput, birthDateInput, descriptionInput, imageInput, submitButton };
};

describe("Formulario Crear Autor", () => {

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

  test("render campos accesibles y boton deshab", () => {
    const { nameInput, birthDateInput, descriptionInput, imageInput, submitButton } = setup();

    expect(nameInput).toBeInTheDocument();
    expect(birthDateInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();

    expect(submitButton).toBeDisabled();
  });

  test("uso incorrecto y boton deshab", async () => {
    const {user, nameInput, submitButton} = setup();

    await user.type(nameInput, "Gabriel");

    await user.click(submitButton);

    const errorMessage = await screen.findByRole("alert");

    expect(errorMessage).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
  
  test("uso correcto, limpia y boton hab", async () => {
    const { user, nameInput, birthDateInput, submitButton } = setup();

    await user.type(nameInput, "Gabriel Garcia Marquez");
    await user.type(birthDateInput, "1927-03-06");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

});