const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'biblioteca.json');

// Datos iniciales
const initialData = {
  libros: [
    {
      id: "1",
      titulo: "Cien años de soledad",
      isbn: "978-0307474728",
      año: 1967,
      disponible: true,
      autorId: "1",
      generoId: "1"
    },
    {
      id: "2",
      titulo: "Don Quijote de la Mancha",
      isbn: "978-0142437230",
      año: 1605,
      disponible: true,
      autorId: "2",
      generoId: "1"
    },
    {
      id: "3",
      titulo: "1984",
      isbn: "978-0451524935",
      año: 1949,
      disponible: false,
      autorId: "3",
      generoId: "2"
    }
  ],
  autores: [
    {
      id: "1",
      nombre: "Gabriel García Márquez",
      biografia: "Escritor colombiano, Premio Nobel de Literatura",
      nacionalidad: "Colombiana",
      fechaNacimiento: "1927-03-06"
    },
    {
      id: "2",
      nombre: "Miguel de Cervantes",
      biografia: "Escritor español del Siglo de Oro",
      nacionalidad: "Española",
      fechaNacimiento: "1547-09-29"
    },
    {
      id: "3",
      nombre: "George Orwell",
      biografia: "Escritor británico, autor de novelas distópicas",
      nacionalidad: "Británica",
      fechaNacimiento: "1903-06-25"
    }
  ],
  generos: [
    {
      id: "1",
      nombre: "Realismo Mágico",
      descripcion: "Género literario que combina elementos fantásticos con realistas",
      activo: true
    },
    {
      id: "2",
      nombre: "Distopía",
      descripcion: "Género que presenta sociedades futuras deshumanizadas",
      activo: true
    },
    {
      id: "3",
      nombre: "Clásicos",
      descripcion: "Obras literarias de reconocido valor universal",
      activo: true
    }
  ],
  usuarios: [
    {
      id: "1",
      nombre: "Juan Pérez",
      email: "juan.perez@universidad.edu",
      rol: "ESTUDIANTE",
      activo: true
    },
    {
      id: "2",
      nombre: "María González",
      email: "maria.gonzalez@universidad.edu",
      rol: "BIBLIOTECARIO",
      activo: true
    },
    {
      id: "3",
      nombre: "Carlos Admin",
      email: "carlos.admin@universidad.edu",
      rol: "ADMINISTRADOR",
      activo: true
    }
  ],
  prestamos: [
    {
      id: "1",
      usuarioId: "1",
      libroId: "3",
      fechaPrestamo: "2024-01-15",
      fechaDevolucion: "2024-02-15",
      estado: "ACTIVO"
    }
  ]
};

class Database {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(dataPath)) {
        const rawData = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(rawData);
      }
    } catch (error) {
      console.log('Error al cargar datos, usando datos iniciales');
    }
    return initialData;
  }

  saveData() {
    try {
      fs.writeFileSync(dataPath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  }

  // Métodos para libros
  getLibros() {
    return this.data.libros;
  }

  getLibro(id) {
    return this.data.libros.find(libro => libro.id === id);
  }

  crearLibro(libroData) {
    const nuevoId = String(Math.max(...this.data.libros.map(l => parseInt(l.id)), 0) + 1);
    const nuevoLibro = {
      id: nuevoId,
      ...libroData,
      disponible: true
    };
    this.data.libros.push(nuevoLibro);
    this.saveData();
    return nuevoLibro;
  }

  actualizarLibro(id, libroData) {
    const index = this.data.libros.findIndex(libro => libro.id === id);
    if (index !== -1) {
      this.data.libros[index] = { ...this.data.libros[index], ...libroData };
      this.saveData();
      return this.data.libros[index];
    }
    return null;
  }

  eliminarLibro(id) {
    const index = this.data.libros.findIndex(libro => libro.id === id);
    if (index !== -1) {
      this.data.libros.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Métodos para autores
  getAutores() {
    return this.data.autores;
  }

  getAutor(id) {
    return this.data.autores.find(autor => autor.id === id);
  }

  crearAutor(autorData) {
    const nuevoId = String(Math.max(...this.data.autores.map(a => parseInt(a.id)), 0) + 1);
    const nuevoAutor = {
      id: nuevoId,
      ...autorData
    };
    this.data.autores.push(nuevoAutor);
    this.saveData();
    return nuevoAutor;
  }

  actualizarAutor(id, autorData) {
    const index = this.data.autores.findIndex(autor => autor.id === id);
    if (index !== -1) {
      this.data.autores[index] = { ...this.data.autores[index], ...autorData };
      this.saveData();
      return this.data.autores[index];
    }
    return null;
  }

  // Métodos para géneros
  getGeneros() {
    return this.data.generos;
  }

  getGenero(id) {
    return this.data.generos.find(genero => genero.id === id);
  }

  crearGenero(generoData) {
    const nuevoId = String(Math.max(...this.data.generos.map(g => parseInt(g.id)), 0) + 1);
    const nuevoGenero = {
      id: nuevoId,
      activo: true,
      ...generoData
    };
    this.data.generos.push(nuevoGenero);
    this.saveData();
    return nuevoGenero;
  }

  // Métodos para usuarios
  getUsuarios() {
    return this.data.usuarios;
  }

  getUsuario(id) {
    return this.data.usuarios.find(usuario => usuario.id === id);
  }

  crearUsuario(usuarioData) {
    const nuevoId = String(Math.max(...this.data.usuarios.map(u => parseInt(u.id)), 0) + 1);
    const nuevoUsuario = {
      id: nuevoId,
      activo: true,
      ...usuarioData
    };
    this.data.usuarios.push(nuevoUsuario);
    this.saveData();
    return nuevoUsuario;
  }

  // Métodos para préstamos
  getPrestamos() {
    return this.data.prestamos;
  }

  getPrestamo(id) {
    return this.data.prestamos.find(prestamo => prestamo.id === id);
  }

  crearPrestamo(prestamoData) {
    const nuevoId = String(Math.max(...this.data.prestamos.map(p => parseInt(p.id)), 0) + 1);
    const nuevoPrestamo = {
      id: nuevoId,
      ...prestamoData,
      fechaPrestamo: new Date().toISOString().split('T')[0],
      estado: "ACTIVO"
    };

    // Marcar libro como no disponible
    const libro = this.getLibro(prestamoData.libroId);
    if (libro) {
      this.actualizarLibro(libro.id, { ...libro, disponible: false });
    }

    this.data.prestamos.push(nuevoPrestamo);
    this.saveData();
    return nuevoPrestamo;
  }

  devolverLibro(prestamoId) {
    const prestamo = this.getPrestamo(prestamoId);
    if (prestamo) {
      prestamo.estado = "DEVUELTO";

      // Marcar libro como disponible
      const libro = this.getLibro(prestamo.libroId);
      if (libro) {
        this.actualizarLibro(libro.id, { ...libro, disponible: true });
      }

      this.saveData();
      return prestamo;
    }
    return null;
  }

  buscarLibros(termino) {
    const terminoLower = termino.toLowerCase();
    return this.data.libros.filter(libro => {
      const autor = this.getAutor(libro.autorId);
      return (
        libro.titulo.toLowerCase().includes(terminoLower) ||
        libro.isbn.includes(termino) ||
        (autor && autor.nombre.toLowerCase().includes(terminoLower))
      );
    });
  }
}

module.exports = new Database();