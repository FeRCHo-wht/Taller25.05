import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default client;

// Cliente GraphQL simple
        const graphqlClient = {
            query: async (query, variables = {}) => {
                try {
                    const response = await axios.post(API_URL, {
                        query,
                        variables
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    
                    if (response.data.errors) {
                        throw new Error(response.data.errors[0].message);
                    }
                    
                    return response.data.data;
                } catch (error) {
                    console.error('GraphQL Error:', error);
                    throw error;
                }
            }
        };