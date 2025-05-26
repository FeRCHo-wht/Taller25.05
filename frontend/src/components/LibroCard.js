 // LibroCard Component
        function LibroCard({ libro, onEdit, onDelete }) {
            return (
                <div className="bg-white rounded-lg shadow-md p-6 hover-scale fade-in">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{libro.titulo}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            libro.disponible 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {libro.disponible ? 'Disponible' : 'Prestado'}
                        </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>ISBN:</strong> {libro.isbn}</p>
                        <p><strong>Año:</strong> {libro.año}</p>
                        <p><strong>Autor:</strong> {libro.autor.nombre}</p>
                        <p><strong>Género:</strong> {libro.genero.nombre}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        <button
                            onClick={() => onEdit(libro)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => onDelete(libro.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            );
        }