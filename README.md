1. Guia ejecucion
    Clonar el repo: git clone https://github.com/MVictoriaRP/bookstore-front.git
    Instalar dependencias del front: npm install
    Construir la imagen del back: docker build ./ -t bookstore
    Ejecutar back: docker run -d -p 127.0.0.1:8080:8080 bookstore
    Ejecutar app Next.js: npm run dev
    App disponible en http://localhost:3000
    Ejecutar las pruebas: npm test

2. Reporte de Cambios

La persistencia de datos se maneja por llamadas al back REST, se usa fetch para obtener y modificar los autores desde el endpoint /api/authors. Asi la informacion se mantiene consistente entre listado, creacion y edicion.

Para el buscador dinamico se implemento un estado local search que almacena el texto ingresado. El filtrado de autores se calcula directamente durante el renderizado usando Array.filter(). Se compara el nombre del autor con el texto de busqueda ignorando mayusculas y minusculas por toLowerCase(). Por esto se actualizaa la lista en tiempo real conforme el usuario escribe.