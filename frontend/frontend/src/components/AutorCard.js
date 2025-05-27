// AutorCard Component
        function AutorCard({ autor }) {
            return (
                <div className="bg-white rounded-lg shadow-md p-6 hover-scale fade-in">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{autor.nombre}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Nacionalidad:</strong> {autor.nacionalidad}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {autor.fechaNacimiento}</p>
                        <p><strong>Biografía:</strong> {autor.biografia}</p>
                        <p><strong>Libros:</strong> {autor.libros.length}</p>
                    </div>
                </div>
            );
        }