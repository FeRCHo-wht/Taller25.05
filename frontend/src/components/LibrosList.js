import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_LIBROS = gql`
  query GetLibros {
    libros {
      id
      titulo
      autorId 
      generoId  
      isbn
    }
  }
`;

function LibrosList() {
  const { loading, error, data } = useQuery(GET_LIBROS);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.libros.map((libro) => (
        <li key={libro.id}>
          {libro.titulo} - {libro.autor.nombre}
        </li>
      ))}
    </ul>
  );
}

export default LibrosList;