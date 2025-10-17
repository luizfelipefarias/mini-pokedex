import { Stack, useRouter } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './constants/theme';


const BACKGROUND_IMAGE_PATH = require("./assets/images/backgroud.png"); 
const ERROR_IMAGE_PATH = require("./assets/images/erro.png"); 

export default function NotFoundScreen() {
  const router = useRouter();

  const errorTitle = "ERRO DE CONEXÃO";
  const errorMessage = "Não foi possível carregar os dados da Pokédex (API)."; 
  const errorDetails = "Verifique sua rede e tente recarregar a lista."; 

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ImageBackground
        source={BACKGROUND_IMAGE_PATH} 
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.overlay}> 
          <View style={styles.errorBox}>
              
              {/* CHAVE: A imagem do Pokémon de erro */}
              <Image 
                source={ERROR_IMAGE_PATH} 
                style={styles.errorImage} 
                resizeMode="contain"
              />
              
              <Text style={styles.title}>{errorTitle}</Text>
              
              <Text style={styles.subtitle}>
                {errorMessage}
              </Text>

              <Text style={styles.details}>
                {errorDetails}
              </Text>

              <TouchableOpacity 
                  onPress={() => router.replace("/(tabs)/explore")} 
                  style={styles.homeButton}
              >
                  <Text style={styles.buttonText}>VOLTAR PARA A LISTA</Text>
              </TouchableOpacity> 
              
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, 
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', 
    padding: 20,
  },
  errorBox: {
    backgroundColor: theme.colors.background, 
    padding: 30,
    borderRadius: 0,
    borderWidth: 4,
    borderColor: theme.colors.error, 
    alignItems: 'center',
    marginBottom: 40,
    
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderBottomColor: '#660000', 
    borderRightColor: '#660000',
  },
  errorImage: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 25,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: 15,
  },
  details: {
    fontSize: 20,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: theme.colors.primary, 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: theme.colors.text, 
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomColor: theme.colors.secondary,
    borderRightColor: theme.colors.secondary,
    marginTop: 20,
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});