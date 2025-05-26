const queryResolvers = require('./queryResolvers');
const mutationResolvers = require('./mutationResolvers');
const database = require('../data/database');

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,

  // Resolvers para relaciones entre entidades
  Libro: {
    autor: (libro) => database.autores.find(autor => autor.id === libro.autorId),
    genero: (libro) => database.generos.find(genero => genero.id === libro.generoId),
    prestamos: (libro) => database.prestamos.filter(prestamo => prestamo.libroId === libro.id)
  },

  Autor: {
    libros: (autor) => database.libros.filter(libro => libro.autorId === autor.id)
  },

  Genero: {
    libros: (genero) => database.libros.filter(libro => libro.generoId === genero.id)
  },

  Usuario: {
    prestamos: (usuario) => database.prestamos.filter(prestamo => prestamo.usuarioId === usuario.id)
  },

  Prestamo: {
    usuario: (prestamo) => database.usuarios.find(usuario => usuario.id === prestamo.usuarioId),
    libro: (prestamo) => database.libros.find(libro => libro.id === prestamo.libroId)
  }
};

module.exports = resolvers;