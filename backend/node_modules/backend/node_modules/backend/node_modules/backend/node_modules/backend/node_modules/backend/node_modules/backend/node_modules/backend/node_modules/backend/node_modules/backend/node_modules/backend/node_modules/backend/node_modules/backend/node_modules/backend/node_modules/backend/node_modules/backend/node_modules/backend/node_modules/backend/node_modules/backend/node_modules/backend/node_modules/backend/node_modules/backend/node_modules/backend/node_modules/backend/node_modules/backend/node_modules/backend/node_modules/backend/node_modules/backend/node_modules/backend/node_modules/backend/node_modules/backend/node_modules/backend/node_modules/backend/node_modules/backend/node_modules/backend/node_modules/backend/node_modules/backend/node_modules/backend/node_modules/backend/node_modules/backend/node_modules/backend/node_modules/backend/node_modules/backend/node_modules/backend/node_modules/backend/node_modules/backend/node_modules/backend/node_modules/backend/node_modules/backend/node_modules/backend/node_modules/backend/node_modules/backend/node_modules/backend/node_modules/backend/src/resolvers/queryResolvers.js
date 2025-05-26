const database = require('../data/database');

const queryResolvers = {
  // Queries para Libros
  libros: () => {
    try {
      return database.libros;
    } catch (error) {
      throw new Error(`Error al obtener libros: ${error.message}`);
    }
  },

  libro: (_, { id }) => {
    try {
      const libro = database.libros.find(libro => libro.id === id);
      if (!libro) {
        throw new Error('Libro no encontrado');
      }
      return libro;
    } catch (error) {
      throw new Error(`Error al buscar libro: ${error.message}`);
    }
  },

  librosPorGenero: (_, { generoId }) => {
    try {
      const genero = database.generos.find(g => g.id === generoId);
      if (!genero) {
        throw new Error('Género no encontrado');
      }
      return database.libros.filter(libro => libro.generoId === generoId);
    } catch (error) {
      throw new Error(`Error al buscar libros por género: ${error.message}`);
    }
  },

  librosPorAutor: (_, { autorId }) => {
    try {
      const autor = database.autores.find(a => a.id === autorId);
      if (!autor) {
        throw new Error('Autor no encontrado');
      }
      return database.libros.filter(libro => libro.autorId === autorId);
    } catch (error) {
      throw new Error(`Error al buscar libros por autor: ${error.message}`);
    }
  },

  buscarLibros: (_, { termino }) => {
    try {
      if (!termino || termino.trim() === '') {
        return database.libros;
      }
      
      const terminoLower = termino.toLowerCase();
      return database.libros.filter(libro => 
        libro.titulo.toLowerCase().includes(terminoLower) ||
        libro.isbn.toLowerCase().includes(terminoLower)
      );
    } catch (error) {
      throw new Error(`Error en búsqueda de libros: ${error.message}`);
    }
  },

  // Queries para Autores
  autores: () => {
    try {
      return database.autores;
    } catch (error) {
      throw new Error(`Error al obtener autores: ${error.message}`);
    }
  },

  autor: (_, { id }) => {
    try {
      const autor = database.autores.find(autor => autor.id === id);
      if (!autor) {
        throw new Error('Autor no encontrado');
      }
      return autor;
    } catch (error) {
      throw new Error(`Error al buscar autor: ${error.message}`);
    }
  },

  // Queries para Géneros
  generos: () => {
    try {
      return database.generos.filter(genero => genero.activo);
    } catch (error) {
      throw new Error(`Error al obtener géneros: ${error.message}`);
    }
  },

  genero: (_, { id }) => {
    try {
      const genero = database.generos.find(genero => genero.id === id);
      if (!genero) {
        throw new Error('Género no encontrado');
      }
      return genero;
    } catch (error) {
      throw new Error(`Error al buscar género: ${error.message}`);
    }
  },

  // Queries para Usuarios
  usuarios: () => {
    try {
      return database.usuarios.filter(usuario => usuario.activo);
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  },

  usuario: (_, { id }) => {
    try {
      const usuario = database.usuarios.find(usuario => usuario.id === id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error(`Error al buscar usuario: ${error.message}`);
    }
  },

  // Queries para Préstamos
  prestamos: () => {
    try {
      return database.prestamos;
    } catch (error) {
      throw new Error(`Error al obtener préstamos: ${error.message}`);
    }
  },

  prestamo: (_, { id }) => {
    try {
      const prestamo = database.prestamos.find(prestamo => prestamo.id === id);
      if (!prestamo) {
        throw new Error('Préstamo no encontrado');
      }
      return prestamo;
    } catch (error) {
      throw new Error(`Error al buscar préstamo: ${error.message}`);
    }
  },

  prestamosPorUsuario: (_, { usuarioId }) => {
    try {
      const usuario = database.usuarios.find(u => u.id === usuarioId);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return database.prestamos.filter(prestamo => prestamo.usuarioId === usuarioId);
    } catch (error) {
      throw new Error(`Error al buscar préstamos del usuario: ${error.message}`);
    }
  },

  prestamosActivos: () => {
    try {
      return database.prestamos.filter(prestamo => prestamo.estado === 'ACTIVO');
    } catch (error) {
      throw new Error(`Error al obtener préstamos activos: ${error.message}`);
    }
  },

  prestamosVencidos: () => {
    try {
      const hoy = new Date().toISOString().split('T')[0];
      return database.prestamos.filter(prestamo => 
        prestamo.estado === 'ACTIVO' && prestamo.fechaDevolucion < hoy
      );
    } catch (error) {
      throw new Error(`Error al obtener préstamos vencidos: ${error.message}`);
    }
  }
};

module.exports = queryResolvers;