import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import styles from './styles';

export default function Home() {

  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNavigation() {
    if (!selectedUf || !selectedCity) return;

    navigation.navigate('Points', { uf: selectedUf, city: selectedCity });
  }

  async function fetchUfs() {
    const res = await axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

    setUfs(res.data.map(state => state.sigla))
  }

  async function fetchCities() {
    const res = await axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`);

    setCities(res.data.map(state => state.nome))
  }

  useEffect(() => {
    fetchUfs();
  }, []);

  useEffect(() => {
    fetchCities();
  }, [selectedUf]);

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

          <RNPickerSelect 
            placeholder={{
              label: 'Select your state',
              value: ''
            }}
            style={{ inputAndroid: styles.picker, inputIOS: styles.picker }}
            onValueChange={value => setSelectedUf(value)}
            items={ufs.map(uf => ({
              key: uf,
              label: uf, 
              value: uf,
            }))}
          />

          <RNPickerSelect 
            placeholder={{
              label: 'Select your city',
              value: '',
            }}
            style={{ inputAndroid: styles.picker, inputIOS: styles.picker }}
            onValueChange={value => setSelectedCity(value)}
            items={cities.map(city => ({
              key: city,
              label: city, 
              value: city,
            }))}
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

