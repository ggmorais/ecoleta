import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import styles from './styles';

export default function Home() {

  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  const navigation = useNavigation();

  function handleNavigation() {
    if (!uf || !city) return;

    navigation.navigate('Points', { uf, city });
  }

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground 
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
        source={require('assets/home-background.png')}
      >
        <View style={styles.main}>
          <Image source={require('assets/logo.png')} />
          <View>
            <Text style={styles.title}>Your marketplace of residues collection</Text>
            <Text style={styles.description}>We help people to find collect points with efficiency</Text>
          </View>
        </View>
        
        <View style={styles.footer}>

          <TextInput
            style={styles.input}
            placeholder="Type your state"
            onChangeText={setUf}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Type your city"
            onChangeText={setCity}
            autoCorrect={false}
          />

          <RectButton style={styles.button} onPress={handleNavigation}>
            <View style={styles.buttonIcon}>
              <Text>
                >
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Sign in
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

