// Generos Page Component
        function GenerosPage() {
            const [isModalOpen, setIsModalOpen] = useState(false);
            const [newGenero, setNewGenero] = useState({
                nombre: '',
                descripcion: ''
            });

            const { loading, error, data, refetch } = useQuery(GET_GENEROS);
            const [crearGenero] = useMutation(CREAR_GENERO);

            const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                    await crearGenero({ variables: { input: newGenero } });
                    setIsModalOpen(false);
                    setNewGenero({ nombre: '', descripcion: '' });
                    refetch();
                } catch (error) {
                    alert('Error al crear género: ' + error.message);
                }
            };

            if (loading) return <div className="text-center py-8">Cargando géneros...</div>;
            if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;

            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Gestión de Géneros</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        >
                            + Nuevo Género
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.generos.map((genero) => (
                            <GeneroCard key={genero.id} genero={genero} />
                        ))}
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Nuevo Género"
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nombre del género"
                                value={newGenero.nombre}
                                onChange={(e) => setNewGenero({...newGenero, nombre: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            <textarea
                                placeholder="Descripción"
                                value={newGenero.descripcion}
                                onChange={(e) => setNewGenero({...newGenero, descripcion: e.target.value})}
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
                                    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                                >
                                    Crear
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            );
        }
