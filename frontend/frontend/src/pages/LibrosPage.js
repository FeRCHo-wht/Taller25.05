 // Libros Page Component
        function LibrosPage() {
            const [searchTerm, setSearchTerm] = useState('');
            const [isModalOpen, setIsModalOpen] = useState(false);
            const [newLibro, setNewLibro] = useState({
                titulo: '',
                isbn: '',
                año: '',
                autorId: '',
                generoId: ''
            });

            const { loading, error, data, refetch } = useQuery(GET_LIBROS);
            const { data: autoresData } = useQuery(GET_AUTORES);
            const { data: generosData } = useQuery(GET_GENEROS);
            const [crearLibro] = useMutation(CREAR_LIBRO);

            const [buscarLibros, { data: searchData }] = useMutation(BUSCAR_LIBROS);

            const handleSearch = (e) => {
                setSearchTerm(e.target.value);
                if (e.target.value.trim()) {
                    buscarLibros({ variables: { termino: e.target.value } });
                }
            };

            const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                    await crearLibro({
                        variables: {
                            input: {
                                ...newLibro,
                                año: parseInt(newLibro.año)
                            }
                        }
                    });
                    setIsModalOpen(false);
                    setNewLibro({ titulo: '', isbn: '', año: '', autorId: '', generoId: '' });
                    refetch();
                } catch (error) {
                    alert('Error al crear libro: ' + error.message);
                }
            };

            if (loading) return <div className="text-center py-8">Cargando libros...</div>;
            if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;

            const librosToShow = searchTerm && searchData ? searchData.buscarLibros : data.libros;

            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Gestión de Libros</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            + Nuevo Libro
                        </button>
                    </div>

                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Buscar libros..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {librosToShow.map((libro) => (
                            <LibroCard
                                key={libro.id}
                                libro={libro}
                                onEdit={() => {}}
                                onDelete={() => {}}
                            />
                        ))}
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Nuevo Libro"
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Título"
                                value={newLibro.titulo}
                                onChange={(e) => setNewLibro({...newLibro, titulo: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="ISBN"
                                value={newLibro.isbn}
                                onChange={(e) => setNewLibro({...newLibro, isbn: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Año"
                                value={newLibro.año}
                                onChange={(e) => setNewLibro({...newLibro, año: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            <select
                                value={newLibro.autorId}
                                onChange={(e) => setNewLibro({...newLibro, autorId: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Seleccionar Autor</option>
                                {autoresData?.autores.map((autor) => (
                                    <option key={autor.id} value={autor.id}>{autor.nombre}</option>
                                ))}
                            </select>
                            <select
                                value={newLibro.generoId}
                                onChange={(e) => setNewLibro({...newLibro, generoId: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Seleccionar Género</option>
                                {generosData?.generos.map((genero) => (
                                    <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                                ))}
                            </select>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Crear
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            );
        }