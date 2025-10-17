import { useEffect, useState } from 'react';

// Define a estrutura básica de um Pokémon para tipagem
interface BasicPokemon {
  name: string;
  url: string;
}

export const usePokemon = (limit = 20) => {
  const [pokemons, setPokemons] = useState<BasicPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  // Estado para armazenar erros
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null); // Limpa erros de requisições anteriores
      
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        
        // Verifica se a resposta HTTP foi bem-sucedida
        if (!res.ok) {
          throw new Error(`Erro ao buscar Pokémons: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        setPokemons(data.results);
        
      } catch (err: any) {
        console.error("Erro no fetch:", err);
        setError(err); // Armazena o objeto de erro
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemons();
    // A dependência [limit] garante que a busca seja refeita 
  }, [limit]);

  // Retorna o novo estado 'error'
  return { pokemons, loading, error };
};