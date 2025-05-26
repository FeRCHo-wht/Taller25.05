 // GraphQL Mutations
        const CREAR_LIBRO = gql`
            mutation CrearLibro($input: LibroInput!) {
                crearLibro(input: $input) {
                    id
                    titulo
                    isbn
                    año
                    disponible
                }
            }
        `;

        const CREAR_AUTOR = gql`
            mutation CrearAutor($input: AutorInput!) {
                crearAutor(input: $input) {
                    id
                    nombre
                    biografia
                    nacionalidad
                }
            }
        `;

        const CREAR_GENERO = gql`
            mutation CrearGenero($input: GeneroInput!) {
                crearGenero(input: $input) {
                    id
                    nombre
                    descripcion
                }
            }
        `;

        const CREAR_PRESTAMO = gql`
            mutation CrearPrestamo($input: PrestamoInput!) {
                crearPrestamo(input: $input) {
                    id
                    fechaPrestamo
                    fechaDevolucion
                    estado
                }
            }
        `;

        const DEVOLVER_LIBRO = gql`
            mutation DevolverLibro($prestamoId: ID!) {
                devolverLibro(prestamoId: $prestamoId) {
                    id
                    estado
                }
            }
        `;

        // Context para estado global
        const AppContext = createContext();
