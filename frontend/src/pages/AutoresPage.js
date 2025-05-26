// Autores Page Component
        function AutoresPage() {
            const [isModalOpen, setIsModalOpen] = useState(false);
            const [newAutor, setNewAutor] = useState({
                nombre: '',
                biografia: '',
                nacionalidad: '',
                fechaNacimiento: ''
            });

            const { loading, error, data, refetch } = useQuery(GET_AUTORES);
            const [crearAutor] = useMutation(CREAR_AUTOR);

            const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                    await crearAutor({ variables: { input: newAutor } });
                    setIsModalOpen(false);
                    setNewAutor({ nombre: '', biografia: '', nacionalidad: '', fechaNacimiento: '' });
                    refetch();
                } catch (error) {
                    alert('Error al crear autor: ' + error.message);
                }
            };

            if (loading) return <div className="text-center py-8">Cargando autores...</div>;
            if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;

            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Gestión de Autores</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            + Nuevo Autor
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.autores.map((autor) => (
                            <AutorCard key={autor.id} autor={autor} />
                        ))}
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Nuevo Autor"
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                value={newAutor.nombre}
                                onChange={(e) => setNewAutor({...newAutor, nombre: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Nacionalidad"
                                value={newAutor.nacionalidad}
                                onChange={(e) => setNewAutor({...newAutor, nacionalidad: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="date"
                                placeholder="Fecha de nacimiento"
                                value={newAutor.fechaNacimiento}
                                onChange={(e) => setNewAutor({...newAutor, fechaNacimiento: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <textarea
                                placeholder="Biografía"
                                value={newAutor.biografia}
                                onChange={(e) => setNewAutor({...newAutor, biografia: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                rows="3"
                            />
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
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Crear
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            );
        }