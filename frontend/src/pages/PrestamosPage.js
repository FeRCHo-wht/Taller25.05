function PrestamosPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPrestamo, setNewPrestamo] = useState({
        usuarioId: '1', // Default user
        libroId: '',
        fechaDevolucion: ''
    });

    const { loading, error, data, refetch } = useQuery(GET_PRESTAMOS);
    const { data: librosData } = useQuery(GET_LIBROS);
    const [crearPrestamo] = useMutation(CREAR_PRESTAMO);
    const [devolverLibro] = useMutation(DEVOLVER_LIBRO);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearPrestamo({ variables: { input: newPrestamo } });
            setIsModalOpen(false);
            setNewPrestamo({ usuarioId: '1', libroId: '', fechaDevolucion: '' });
            refetch();
        } catch (error) {
            console.error('Error al crear préstamo:', error);
        }
    };

    const handleDevolver = async (prestamoId) => {
        try {
            await devolverLibro({ variables: { prestamoId } });
            refetch();
        } catch (error) {
            console.error('Error al devolver libro:', error);
        }
    };

    if (loading) return <div className="text-center py-8">Cargando préstamos...</div>;
    if (error) return <div className="text-center py-8 text-red-600">Error al cargar préstamos</div>;

    const librosDisponibles = librosData?.libros.filter(libro => libro.disponible) || [];

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Préstamos</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Nuevo Préstamo
                </button>
            </div>

            <div className="space-y-4">
                {data.prestamos.map(prestamo => (
                    <div key={prestamo.id} className="border p-4 rounded">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-medium">{prestamo.libro.titulo}</h3>
                                <p className="text-sm text-gray-600">{prestamo.usuario.nombre}</p>
                                <p className="text-sm">
                                    <span>Préstamo: {prestamo.fechaPrestamo}</span> | 
                                    <span> Devolución: {prestamo.fechaDevolucion}</span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span className={`px-2 py-1 text-xs rounded ${
                                    prestamo.estado === 'ACTIVO' ? 'bg-yellow-100 text-yellow-800' :
                                    prestamo.estado === 'DEVUELTO' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {prestamo.estado}
                                </span>
                                {prestamo.estado === 'ACTIVO' && (
                                    <button 
                                        onClick={() => handleDevolver(prestamo.id)}
                                        className="ml-2 bg-green-500 text-white px-3 py-1 text-sm rounded"
                                    >
                                        Devolver
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para nuevo préstamo */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-medium mb-4">Nuevo Préstamo</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Libro</label>
                                <select
                                    value={newPrestamo.libroId}
                                    onChange={(e) => setNewPrestamo({...newPrestamo, libroId: e.target.value})}
                                    className="w-full border p-2 rounded"
                                    required
                                >
                                    <option value="">Seleccionar libro</option>
                                    {librosDisponibles.map(libro => (
                                        <option key={libro.id} value={libro.id}>
                                            {libro.titulo} ({libro.autor.nombre})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Fecha de devolución</label>
                                <input
                                    type="date"
                                    value={newPrestamo.fechaDevolucion}
                                    onChange={(e) => setNewPrestamo({...newPrestamo, fechaDevolucion: e.target.value})}
                                    className="w-full border p-2 rounded"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}