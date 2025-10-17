import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { theme } from "../constants/theme";

interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
}

// Caminho para a imagem de fundo
const BACKGROUND_IMAGE_PATH = require("../assets/images/backgroud.png");

// URL inicial para a lista paginada
const INITIAL_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

export default function PokedexList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  // NOVO: Função para resetar a busca e voltar à paginação inicial
  const handleReset = () => {
    setSearchTerm("");
    setError(null);
    setSuggestions([]);
    fetchPokemons(INITIAL_URL); // Recarrega a lista inicial
  };

  const fetchPokemons = useCallback(async (url = INITIAL_URL) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar lista de Pokémons.");
      const data = await res.json();

      const detailed = data.results.map((p: any) => {
        const id = p.url.split("/").filter(Boolean).pop();
        return {
          name: p.name,
          url: p.url,
          id: parseInt(id),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });

      setPokemons(detailed);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (error) {
      console.error("Erro ao buscar Pokémons:", error);
      setError("Não foi possível carregar a lista. Verifique sua conexão.");
      setPokemons([]);
      setNextUrl(null);
      setPrevUrl(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = async (manualQuery?: string) => {
    const query = (manualQuery || searchTerm).trim().toLowerCase();
    
    if (!query) {
      handleReset();
      return;
    }
    
    setLoading(true);
    setError(null);
    setPokemons([]); 
    setNextUrl(null); 
    setPrevUrl(null);
    setSuggestions([]);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      
      if (res.status === 404) {
        setError(`Pokémon "${query}" não encontrado.`);
        setPokemons([]); 
        return;
      }
      
      if (!res.ok) throw new Error("Erro ao buscar Pokémon.");
      
      const data = await res.json();
      
      const foundPokemon: Pokemon = {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
          id: data.id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      };
      
      setPokemons([foundPokemon]);
      
    } catch (e) {
      console.error("Erro na busca:", e);
      setError("Erro ao realizar a busca. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleTextInputChange = (text: string) => {
    setSearchTerm(text);
    setSuggestions([]);

    if (text.length === 0) {
        setError(null); 
        fetchPokemons(INITIAL_URL);
        return;
    }
    
    if (text.length > 1) {
        const filtered = allPokemonNames.filter(name => 
            name.includes(text.toLowerCase())
        ).slice(0, 8); 
        setSuggestions(filtered);
    } 
  };
  
  const handleSelectSuggestion = (name: string) => {
    setSearchTerm(name);
    setSuggestions([]);
    handleSearch(name); 
  };
  
  useEffect(() => {
      const fetchAllNames = async () => {
          try {
              const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000"); 
              const data = await res.json();
              const names = data.results.map((p: any) => p.name);
              setAllPokemonNames(names);
          } catch (error) {
              console.error("Error fetching all Pokémon names:", error);
          }
      };
      fetchAllNames();
      fetchPokemons();
  }, [fetchPokemons]);


  // --- Lógica do Botão Dinâmico ---
  const isSearching = searchTerm.length > 0 && pokemons.length === 1 && !error;
  const headerButtonIcon = isSearching ? "close" : "arrow-back"; 
  
  const headerButtonAction = () => {
    if (isSearching) {
        handleReset(); 
    } else {
        
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/(tabs)"); 
        }
    }
  };
  
  if (loading && pokemons.length === 0) {
    return (
      <ImageBackground source={BACKGROUND_IMAGE_PATH} resizeMode="repeat" style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Carregando Dados...</Text>
      </ImageBackground>
    );
  }
  
  const ListHeader = (
    <View style={styles.header}>
      
      {/* Botão de Voltar/Reset e Título */}
      <View style={styles.headerTopRow}>
        <TouchableOpacity onPress={headerButtonAction} style={styles.backButton}>
          {/* O ícone é dinâmico (arrow-back ou close) */}
          <Ionicons name={headerButtonIcon as any} size={30} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>LISTA POKÉDEX</Text>
        <View style={styles.backButtonPlaceholder} /> 
      </View>


      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Pokémon"
          placeholderTextColor={theme.colors.secondary}
          value={searchTerm}
          onChangeText={handleTextInputChange}
          onSubmitEditing={() => handleSearch()}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch()} disabled={loading}>
            <Ionicons name="search" size={24} color={theme.colors.background} /> 
        </TouchableOpacity>
      </View>
      
      {/* Lista de Sugestões (Autocomplete) */}
      {suggestions.length > 0 && (
          <View style={styles.suggestionOverlay}> 
              <FlatList
                  data={suggestions}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                      <TouchableOpacity 
                          style={styles.suggestionItem}
                          onPress={() => handleSelectSuggestion(item)}
                      >
                          <Text style={styles.suggestionText}>{item.toUpperCase()}</Text>
                      </TouchableOpacity>
                  )}
              />
          </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          {searchTerm.trim() === "" && ( 
            <TouchableOpacity style={styles.retryButton} onPress={() => fetchPokemons(INITIAL_URL)} disabled={loading}>
              <Text style={styles.retryText}>RECONECTAR</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  const PaginationFooter = () => {
    if (error || pokemons.length === 0 || loading || searchTerm) {
      return null;
    }

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.paginationButton, {opacity: prevUrl ? 1 : 0.5}]}
          onPress={() => prevUrl && fetchPokemons(prevUrl)}
          disabled={!prevUrl || loading}
        >
          <Text style={styles.buttonText}>◀ ANTERIOR</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.paginationButton, {opacity: nextUrl ? 1 : 0.5}]}
          onPress={() => nextUrl && fetchPokemons(nextUrl)}
          disabled={!nextUrl || loading}
        >
          <Text style={styles.buttonText}>PRÓXIMA ▶</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <ImageBackground 
      source={BACKGROUND_IMAGE_PATH} 
      resizeMode="cover" 
      style={styles.container}
    >
      <View style={{ flex: 1 }}> 
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={PaginationFooter}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/PokemonDetails?id=${item.id}`)}
            >
              <View style={styles.spriteContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.cardId}># {item.id.toString().padStart(3, '0')}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Lista de Sugestões (Autocomplete) Renderizada FORA da FlatList */}
      {suggestions.length > 0 && (
          <View style={styles.suggestionOverlay}> 
              <FlatList
                  data={suggestions}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                      <TouchableOpacity 
                          style={styles.suggestionItem}
                          onPress={() => handleSelectSuggestion(item)}
                      >
                          <Text style={styles.suggestionText}>{item.toUpperCase()}</Text>
                      </TouchableOpacity>
                  )}
              />
          </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, 
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    color: theme.colors.primary,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: 'rgba(204, 0, 0, 0.8)', 
    paddingHorizontal: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  backButton: {
    width: 30,
  },
  backButtonPlaceholder: {
    width: 30,
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    paddingBottom: 5,
    textTransform: 'uppercase',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.screen, 
    color: theme.colors.background, 
    paddingHorizontal: 15,
    borderRadius: 0, 
    borderWidth: 3,
    borderColor: theme.colors.primary,
    marginRight: 10,
    fontSize: 16,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderBottomColor: theme.colors.secondary,
    borderRightColor: theme.colors.secondary,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.primary, 
    borderRadius: 0, 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.accent, 
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderBottomColor: theme.colors.secondary,
    borderRightColor: theme.colors.secondary,
  },
  buttonText: {
    color: theme.colors.text, 
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  suggestionOverlay: {
      position: 'absolute',
      top: 175, 
      left: 10,
      right: 10,
      zIndex: 9999,
      elevation: 10, 
      maxHeight: 300,
      backgroundColor: 'rgba(8, 8, 8, 0.95)', 
      borderWidth: 3,
      borderColor: theme.colors.primary,
      borderRadius: 0,
      overflow: 'hidden',
  },
  suggestionItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.secondary, 
  },
  suggestionText: {
      color: theme.colors.text, 
      fontSize: 16,
      fontWeight: 'bold',
  },
  card: {
    width: '48%', 
    alignItems: "center",
    marginVertical: 8,
    padding: 15,
    backgroundColor: theme.colors.screen, 
    borderRadius: 0, 
    borderWidth: 3,
    borderColor: theme.colors.primary, 
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderBottomColor: theme.colors.secondary, 
    borderRightColor: theme.colors.secondary,
  },
  spriteContainer: {
    backgroundColor: theme.colors.card, 
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    padding: 8,
    marginBottom: 10,
    borderRadius: 0,
  },
  image: {
    width: 120,
    height: 120,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  cardId: {
    color: theme.colors.primary, 
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0, 
    marginTop: 2, 
    textTransform: 'uppercase',
  },
  name: {
    color: theme.colors.background, 
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 2, 
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'rgba(204, 0, 0, 0.8)', 
  },
  paginationButton: {
    backgroundColor: theme.colors.primary, 
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 0, 
    borderWidth: 3,
    borderColor: theme.colors.accent,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomColor: theme.colors.secondary,
    borderRightColor: theme.colors.secondary,
  },
  errorContainer: {
    backgroundColor: theme.colors.errorBackground,
    padding: 15,
    borderRadius: 0,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 0,
    marginTop: 5,
  },
  retryText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  }
});