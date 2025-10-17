import { useRouter } from "expo-router";
import React, { useRef } from "react"; // Removido useEffect
import {
  Animated,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { theme } from "../constants/theme";


const WALLPAPER_PATH = require("../assets/images/wallpaper.png"); 
const POKEDEX_LOGO_PATH = require("../assets/images/titulo.png"); 
const BUTTON_PATH = require("../assets/images/button.png"); 


export default function HomeScreen() {
  const router = useRouter();
  
  // NOVO: Usaremos um Animated.Value para reagir ao toque.
  const scaleAnim = useRef(new Animated.Value(1)).current; 

  const handleStartPress = () => {
    // Redireciona APÓS a animação de pressione, para dar tempo de feedback.
    Animated.timing(scaleAnim, {
      toValue: 0.95, 
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        router.replace("/(tabs)/explore"); 
      });
    });
  };

 
  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97, 
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1, 
      duration: 150,
      useNativeDriver: true,
    }).start();
  };


  return (
    <ImageBackground
      source={WALLPAPER_PATH} 
      resizeMode="cover"
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}> 
        <View style={styles.header}>
          
          <Image
            source={POKEDEX_LOGO_PATH}
            style={styles.pokedexLogo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity
          onPress={handleStartPress}
          onPressIn={handlePressIn}     
          onPressOut={handlePressOut}   
          activeOpacity={1}             
          style={styles.touchableButton} 
        >
          <Animated.View
            style={[
              styles.animatedButtonContainer, 
              { transform: [{ scale: scaleAnim }] }, 
            ]}
          >
            <ImageBackground
              source={BUTTON_PATH}
              style={styles.startButton}
              resizeMode="stretch" 
            >

            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, 
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    paddingBottom: 80,
  },
  header: {
    alignItems: "center",
  },
  pokedexLogo: {
    width: 300, 
    height: 500, 
  },
  
  touchableButton: {
    width: 300, 
    height: 380, 
    alignSelf: 'center', 
  },
  
  animatedButtonContainer: {
    flex: 1,
  },

  startButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  startText: {
    color: theme.colors.text, 
    fontSize: 24,
    fontWeight: 'normal', 
    letterSpacing: 1,
    fontFamily: theme.fonts.regular,
  },
});