const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  enum EstadoPrestamo {
    ACTIVO
    DEVUELTO
    VENCIDO
  }

  enum RolUsuario {
    ESTUDIANTE
    BIBLIOTECARIO
    ADMINISTRADOR
  }

  type Libro {
    id: ID!
    titulo: String!
    isbn: String!
    fecha: Int!
    disponible: Boolean!
    autor: Autor!
    genero: Genero!
    prestamos: [Prestamo!]!
  }

  type Autor {
    id: ID!
    nombre: String!
    biografia: String
    nacionalidad: String
    fechaNacimiento: Date
    libros: [Libro!]!
  }

  type Genero {
    id: ID!
    nombre: String!
    descripcion: String
    activo: Boolean!
    libros: [Libro!]!
  }

  type Usuario {
    id: ID!
    nombre: String!
    email: String!
    rol: RolUsuario!
    activo: Boolean!
    prestamos: [Prestamo!]!
  }

  type Prestamo {
    id: ID!
    usuario: Usuario!
    libro: Libro!
    fechaPrestamo: Date!
    fechaDevolucion: Date!
    estado: EstadoPrestamo!
  }

  input LibroInput {
    titulo: String!
    isbn: String!
    fecha: Int!
    autorId: ID!
    generoId: ID!
  }

  input AutorInput {
    nombre: String!
    biografia: String
    nacionalidad: String
    fechaNacimiento: Date
  }

  input GeneroInput {
    nombre: String!
    descripcion: String
    activo: Boolean
  }

  input UsuarioInput {
    nombre: String!
    email: String!
    rol: RolUsuario!
    activo: Boolean
  }

  input PrestamoInput {
    usuarioId: ID!
    libroId: ID!
    fechaDevolucion: Date!
  }

  type Query {
    libros: [Libro!]!
    libro(id: ID!): Libro
    librosPorGenero(generoId: ID!): [Libro!]!
    librosPorAutor(autorId: ID!): [Libro!]!
    buscarLibros(termino: String!): [Libro!]!
    
    autores: [Autor!]!
    autor(id: ID!): Autor
    
    generos: [Genero!]!
    genero(id: ID!): Genero
    
    usuarios: [Usuario!]!
    usuario(id: ID!): Usuario
    
    prestamos: [Prestamo!]!
    prestamo(id: ID!): Prestamo
    prestamosPorUsuario(usuarioId: ID!): [Prestamo!]!
    prestamosActivos: [Prestamo!]!
  }

  type Mutation {
    crearLibro(input: LibroInput!): Libro!
    actualizarLibro(id: ID!, input: LibroInput!): Libro!
    eliminarLibro(id: ID!): Boolean!
    
    crearAutor(input: AutorInput!): Autor!
    actualizarAutor(id: ID!, input: AutorInput!): Autor!
    eliminarAutor(id: ID!): Boolean!
    
    crearGenero(input: GeneroInput!): Genero!
    actualizarGenero(id: ID!, input: GeneroInput!): Genero!
    eliminarGenero(id: ID!): Boolean!
    
    crearUsuario(input: UsuarioInput!): Usuario!
    actualizarUsuario(id: ID!, input: UsuarioInput!): Usuario!
    
    crearPrestamo(input: PrestamoInput!): Prestamo!
    devolverLibro(prestamoId: ID!): Prestamo!
    renovarPrestamo(prestamoId: ID!, nuevaFecha: Date!): Prestamo!
  }
`;

module.exports = { typeDefs };