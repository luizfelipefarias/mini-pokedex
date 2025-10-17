import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./constants/theme";

// --- Helpers de Estilo e Dados ---

const MAX_STAT_VALUE = 255; 

// Mapeamento de Tipos para Cores do Tema (Usando o tema previamente definido)
const TypeColorMap: { [key: string]: string } = {
  normal: '#A8A878',
  fire: theme.colors.typeFire || '#F08030',
  water: theme.colors.typeWater || '#6890F0',
  grass: theme.colors.typeGrass || '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  dark: '#705848',
  fairy: '#EE99AC',
};

function StatBar({ statName, baseStat }: { statName: string; baseStat: number }) {
  const statPercentage = (baseStat / MAX_STAT_VALUE) * 100;
  const barColor = baseStat > 100 ? theme.colors.typeGrass : (baseStat > 60 ? theme.colors.typeWater : theme.colors.accent);

  return (
    <View style={statStyles.statRow}>
      <Text style={statStyles.statName}>{statName.toUpperCase()}</Text>
      <Text style={statStyles.statValue}>{baseStat}</Text>
      <View style={statStyles.barBackground}>
        <View style={[statStyles.barFill, { width: `${statPercentage}%`, backgroundColor: barColor }]} />
      </View>
    </View>
  );
}
// --- Fim Helpers ---


export default function PokemonDetails() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        // CHAVE DE CORREÇÃO: Se não for ok (incluindo 404), redireciona para o +not-found
        if (!res.ok) {
           router.replace("/+not-found"); 
           return;
        }

        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes da API:", err);
        // CHAVE DE CORREÇÃO: Erro de rede/fetch/parsing também redireciona
        router.replace("/+not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id, router]);

  // Lógica de Animação 3D (Hover)
  const handlePressIn = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
            toValue: 1.05, 
            useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
            toValue: -5, 
            duration: 150,
            useNativeDriver: true,
        }),
      ]).start();
  };

  const handlePressOut = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4, 
            useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }),
      ]).start();
  };

  // Esta lógica só é executada se o fetchPokemon tiver sucesso
  const primaryType = pokemon?.types[0]?.type?.name || 'normal';
  const backgroundColor = TypeColorMap[primaryType] || theme.colors.background;

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  
  // Se loading=false e pokemon=null, significa que houve um erro, mas o useEffect já redirecionou.
  // Mantenho o retorno null por segurança, embora não deva ser alcançado.
  if (!pokemon) return null; 

  const imageUri = 
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;
  
  const abilities = pokemon.abilities.map((a: any) => a.ability.name).join(", ");
  const types = pokemon.types.map((t: any) => t.type.name).join(" / ");


  return (
    <ScrollView style={[styles.container, { backgroundColor: backgroundColor }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close-circle-sharp" size={36} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.header}>
            <Text style={styles.id}># {pokemon.id.toString().padStart(3, '0')}</Text>
            <Text style={styles.name}>{pokemon.name}</Text>
        </View>
        
        <TouchableOpacity 
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1} 
            style={styles.imageWrapper}
        >
            <Animated.View 
                style={[
                    styles.imageContainer,
                    { transform: [{ scale: scaleAnim }, { translateY: translateYAnim }] },
                ]}
            >
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
                ) : (
                    <Text style={styles.noImage}>SEM IMAGEM</Text>
                )}
            </Animated.View>
        </TouchableOpacity>
      
        <View style={styles.infoBox}>
            <Text style={styles.type}>TIPO: {types}</Text>

            <Text style={styles.detailTitle}>INFORMAÇÕES</Text>
            <Text style={styles.info}>ALTURA: {pokemon.height / 10} m</Text>
            <Text style={styles.info}>PESO: {pokemon.weight / 10} kg</Text>
            
            <Text style={styles.detailTitle}>HABILIDADES</Text>
            <Text style={styles.info}>{abilities}</Text>
        </View>

        <Text style={styles.statsTitle}>STATUS BASE</Text>
        <View style={styles.statList}>
            {pokemon.stats.map((s: any) => (
                <StatBar
                    key={s.stat.name}
                    statName={s.stat.name}
                    baseStat={s.base_stat}
                />
            ))}
        </View>
        <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colors.text,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  imageWrapper: {
    alignSelf: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    flex: 1,
    backgroundColor: theme.colors.card, 
    borderRadius: 0, 
    borderWidth: 5,
    borderColor: theme.colors.text,
    overflow: 'hidden',
  },
  noImage: {
    color: theme.colors.error,
    textAlign: 'center',
    alignSelf: 'center',
    padding: 20,
    borderWidth: 3,
    borderColor: theme.colors.error,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  id: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  name: {
    color: theme.colors.text,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  infoBox: {
    backgroundColor: theme.colors.background, 
    padding: 20,
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderBottomColor: theme.colors.secondary,
    borderRightColor: theme.colors.secondary,
  },
  type: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 24,
    marginBottom: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.primary, 
    paddingBottom: 5,
  },
  detailTitle: {
    color: theme.colors.primary, 
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    paddingBottom: 2,
  },
  info: {
    color: theme.colors.text,
    textAlign: "left",
    marginBottom: 5,
    fontSize: 18,
    textTransform: 'uppercase',
  },
  statsTitle: {
    color: theme.colors.text,
    marginTop: 30,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.primary,
    marginHorizontal: 30,
    paddingBottom: 5,
  },
  statList: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
  }
});

const statStyles = StyleSheet.create({
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: theme.colors.background, 
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        borderBottomWidth: 3,
        borderRightWidth: 3,
    },
    statName: {
        width: 100, 
        color: theme.colors.text, 
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginRight: 10,
    },
    statValue: {
        width: 40, 
        color: theme.colors.text, 
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    barBackground: {
        flex: 1,
        height: 18, 
        backgroundColor: theme.colors.card, 
        borderRadius: 0,
        marginLeft: 10,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: theme.colors.primary, 
    },
    barFill: {
        height: '100%',
        borderRadius: 0,
    }
});