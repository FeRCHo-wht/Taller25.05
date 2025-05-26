 // GeneroCard Component
        function GeneroCard({ genero }) {
            return (
                <div className="bg-white rounded-lg shadow-md p-6 hover-scale fade-in">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{genero.nombre}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            genero.activo 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                            {genero.activo ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Descripción:</strong> {genero.descripcion}</p>
                        <p><strong>Libros:</strong> {genero.libros.length}</p>
                    </div>
                </div>
            );
        }