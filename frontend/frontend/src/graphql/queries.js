// GraphQL Queries
        const GET_LIBROS = gql`
            query GetLibros {
                libros {
                    id
                    titulo
                    isbn
                    año
                    disponible
                    autor {
                        id
                        nombre
                    }
                    genero {
                        id
                        nombre
                    }
                }
            }
        `;

        const GET_AUTORES = gql`
            query GetAutores {
                autores {
                    id
                    nombre
                    biografia
                    nacionalidad
                    fechaNacimiento
                    libros {
                        id
                        titulo
                    }
                }
            }
        `;

        const GET_GENEROS = gql`
            query GetGeneros {
                generos {
                    id
                    nombre
                    descripcion
                    activo
                    libros {
                        id
                        titulo
                    }
                }
            }
        `;

        const GET_PRESTAMOS = gql`
            query GetPrestamos {
                prestamos {
                    id
                    fechaPrestamo
                    fechaDevolucion
                    estado
                    usuario {
                        id
                        nombre
                        email
                    }
                    libro {
                        id
                        titulo
                        autor {
                            nombre
                        }
                    }
                }
            }
        `;

        const BUSCAR_LIBROS = gql`
            query BuscarLibros($termino: String!) {
                buscarLibros(termino: $termino) {
                    id
                    titulo
                    isbn
                    año
                    disponible
                    autor {
                        nombre
                    }
                    genero {
                        nombre
                    }
                }
            }
        `;

        