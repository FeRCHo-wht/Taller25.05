const database = require('../data/database');

const mutationResolvers = {
  // Mutations para Libros
  crearLibro: (_, { input }) => {
    try {
      // Validar que el autor existe
      const autor = database.autores.find(a => a.id === input.autorId);
      if (!autor) {
        throw new Error('El autor especificado no existe');
      }

      // Validar que el género existe
      const genero = database.generos.find(g => g.id === input.generoId);
      if (!genero) {
        throw new Error('El género especificado no existe');
      }

      // Validar ISBN único
      const isbnExiste = database.libros.find(l => l.isbn === input.isbn);
      if (isbnExiste) {
        throw new Error('Ya existe un libro con este ISBN');
      }

      const newId = String(database.libros.length + 1);
      const newLibro = {
        id: newId,
        titulo: input.titulo,
        isbn: input.isbn,
        ano: input.ano,
        autorId: input.autorId,
        generoId: input.generoId,
        disponible: true
      };

      database.libros.push(newLibro);
      return newLibro;
    } catch (error) {
      throw new Error(`Error al crear libro: ${error.message}`);
    }
  },

  actualizarLibro: (_, { id, input }) => {
    try {
      const index = database.libros.findIndex(libro => libro.id === id);
      if (index === -1) {
        throw new Error('Libro no encontrado');
      }

      // Validar autor si se está actualizando
      if (input.autorId) {
        const autor = database.autores.find(a => a.id === input.autorId);
        if (!autor) {
          throw new Error('El autor especificado no existe');
        }
      }

      // Validar género si se está actualizando
      if (input.generoId) {
        const genero = database.generos.find(g => g.id === input.generoId);
        if (!genero) {
          throw new Error('El género especificado no existe');
        }
      }

      // Validar ISBN único si se está actualizando
      if (input.isbn) {
        const isbnExiste = database.libros.find(l => l.isbn === input.isbn && l.id !== id);
        if (isbnExiste) {
          throw new Error('Ya existe otro libro con este ISBN');
        }
      }

      database.libros[index] = { ...database.libros[index], ...input };
      return database.libros[index];
    } catch (error) {
      throw new Error(`Error al actualizar libro: ${error.message}`);
    }
  },

  eliminarLibro: (_, { id }) => {
    try {
      const index = database.libros.findIndex(libro => libro.id === id);
      if (index === -1) {
        throw new Error('Libro no encontrado');
      }

      // Verificar que no tenga préstamos activos
      const prestamosActivos = database.prestamos.filter(
        p => p.libroId === id && p.estado === 'ACTIVO'
      );
      if (prestamosActivos.length > 0) {
        throw new Error('No se puede eliminar un libro con préstamos activos');
      }

      database.libros.splice(index, 1);
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar libro: ${error.message}`);
    }
  },

  // Mutations para Autores
  crearAutor: (_, { input }) => {
    try {
      // Validar nombre único
      const nombreExiste = database.autores.find(a => 
        a.nombre.toLowerCase() === input.nombre.toLowerCase()
      );
      if (nombreExiste) {
        throw new Error('Ya existe un autor con este nombre');
      }

      const newId = String(database.autores.length + 1);
      const newAutor = {
        id: newId,
        nombre: input.nombre,
        biografia: input.biografia || '',
        nacionalidad: input.nacionalidad || '',
        fechaNacimiento: input.fechaNacimiento || ''
      };

      database.autores.push(newAutor);
      return newAutor;
    } catch (error) {
      throw new Error(`Error al crear autor: ${error.message}`);
    }
  },

  actualizarAutor: (_, { id, input }) => {
    try {
      const index = database.autores.findIndex(autor => autor.id === id);
      if (index === -1) {
        throw new Error('Autor no encontrado');
      }

      // Validar nombre único si se está actualizando
      if (input.nombre) {
        const nombreExiste = database.autores.find(a => 
          a.nombre.toLowerCase() === input.nombre.toLowerCase() && a.id !== id
        );
        if (nombreExiste) {
          throw new Error('Ya existe otro autor con este nombre');
        }
      }

      database.autores[index] = { ...database.autores[index], ...input };
      return database.autores[index];
    } catch (error) {
      throw new Error(`Error al actualizar autor: ${error.message}`);
    }
  },

  eliminarAutor: (_, { id }) => {
    try {
      const index = database.autores.findIndex(autor => autor.id === id);
      if (index === -1) {
        throw new Error('Autor no encontrado');
      }

      // Verificar que no tenga libros asociados
      const librosAsociados = database.libros.filter(l => l.autorId === id);
      if (librosAsociados.length > 0) {
        throw new Error('No se puede eliminar un autor que tiene libros asociados');
      }

      database.autores.splice(index, 1);
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar autor: ${error.message}`);
    }
  },

  // Mutations para Géneros
  crearGenero: (_, { input }) => {
    try {
      // Validar nombre único
      const nombreExiste = database.generos.find(g => 
        g.nombre.toLowerCase() === input.nombre.toLowerCase()
      );
      if (nombreExiste) {
        throw new Error('Ya existe un género con este nombre');
      }

      const newId = String(database.generos.length + 1);
      const newGenero = {
        id: newId,
        nombre: input.nombre,
        descripcion: input.descripcion || '',
        activo: true
      };

      database.generos.push(newGenero);
      return newGenero;
    } catch (error) {
      throw new Error(`Error al crear género: ${error.message}`);
    }
  },

  actualizarGenero: (_, { id, input }) => {
    try {
      const index = database.generos.findIndex(genero => genero.id === id);
      if (index === -1) {
        throw new Error('Género no encontrado');
      }

      // Validar nombre único si se está actualizando
      if (input.nombre) {
        const nombreExiste = database.generos.find(g => 
          g.nombre.toLowerCase() === input.nombre.toLowerCase() && g.id !== id
        );
        if (nombreExiste) {
          throw new Error('Ya existe otro género con este nombre');
        }
      }

      database.generos[index] = { ...database.generos[index], ...input };
      return database.generos[index];
    } catch (error) {
      throw new Error(`Error al actualizar género: ${error.message}`);
    }
  },

  eliminarGenero: (_, { id }) => {
    try {
      const index = database.generos.findIndex(genero => genero.id === id);
      if (index === -1) {
        throw new Error('Género no encontrado');
      }

      // Verificar que no tenga libros asociados
      const librosAsociados = database.libros.filter(l => l.generoId === id);
      if (librosAsociados.length > 0) {
        throw new Error('No se puede eliminar un género que tiene libros asociados');
      }

      database.generos.splice(index, 1);
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar género: ${error.message}`);
    }
  },

  // Mutations para Préstamos
  crearPrestamo: (_, { input }) => {
    try {
      // Validar que el usuario existe
      const usuario = database.usuarios.find(u => u.id === input.usuarioId);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      // Validar que el libro existe y está disponible
      const libro = database.libros.find(l => l.id === input.libroId);
      if (!libro) {
        throw new Error('Libro no encontrado');
      }

      if (!libro.disponible) {
        throw new Error('El libro no está disponible para préstamo');
      }

      // Validar fecha de devolución
      const fechaDevolucion = new Date(input.fechaDevolucion);
      const hoy = new Date();
      if (fechaDevolucion <= hoy) {
        throw new Error('La fecha de devolución debe ser posterior a hoy');
      }

      const newId = String(database.prestamos.length + 1);
      const newPrestamo = {
        id: newId,
        usuarioId: input.usuarioId,
        libroId: input.libroId,
        fechaPrestamo: new Date().toISOString().split('T')[0],
        fechaDevolucion: input.fechaDevolucion,
        estado: 'ACTIVO'
      };

      // Marcar libro como no disponible
      libro.disponible = false;
      
      database.prestamos.push(newPrestamo);
      return newPrestamo;
    } catch (error) {
      throw new Error(`Error al crear préstamo: ${error.message}`);
    }
  },

  devolverLibro: (_, { prestamoId }) => {
    try {
      const prestamo = database.prestamos.find(p => p.id === prestamoId);
      if (!prestamo) {
        throw new Error('Préstamo no encontrado');
      }

      if (prestamo.estado !== 'ACTIVO') {
        throw new Error('El préstamo ya fue devuelto');
      }

      // Actualizar estado del préstamo
      prestamo.estado = 'DEVUELTO';
      
      // Marcar libro como disponible
      const libro = database.libros.find(l => l.id === prestamo.libroId);
      if (libro) {
        libro.disponible = true;
      }

      return prestamo;
    } catch (error) {
      throw new Error(`Error al devolver libro: ${error.message}`);
    }
  },

  renovarPrestamo: (_, { prestamoId, nuevaFechaDevolucion }) => {
    try {
      const prestamo = database.prestamos.find(p => p.id === prestamoId);
      if (!prestamo) {
        throw new Error('Préstamo no encontrado');
      }

      if (prestamo.estado !== 'ACTIVO') {
        throw new Error('Solo se pueden renovar préstamos activos');
      }

      // Validar nueva fecha
      const nuevaFecha = new Date(nuevaFechaDevolucion);
      const hoy = new Date();
      if (nuevaFecha <= hoy) {
        throw new Error('La nueva fecha de devolución debe ser posterior a hoy');
      }

      prestamo.fechaDevolucion = nuevaFechaDevolucion;
      return prestamo;
    } catch (error) {
      throw new Error(`Error al renovar préstamo: ${error.message}`);
    }
  }
};

module.exports = mutationResolvers;