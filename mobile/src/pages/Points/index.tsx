import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';
import api from 'services/api';
import styles from './styles';

export default function Points() {

  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [selectedItems, setSelectedItems] = useState<Number[]>([]);

  const route = useRoute();

  const routeParams = route.params as PointsParams;

  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: Number) {
    navigation.navigate('Detail', { point_id: id });
  }

  function handleItemSelection(id: Number) {
    if (selectedItems.includes(id)) {
      setSelectedItems([...selectedItems.filter(item => item !== id)]);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function fetchLocation() {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Ooops...', 'We need your permission to know your location.');
    }

    const local = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = local.coords;

    setInitialPosition([latitude, longitude]);
  }

  async function fetchPoints() {
    const points = await api.get('/points', {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItems.join(',')
      }
    });

    setPoints(points.data);
  }

  async function fetchItems() {
    const items = await api.get('/items');

    setItems(items.data);
  }

  useEffect(() => {
    fetchItems();
    fetchLocation();
  }, []);

  useEffect(() => {
    fetchPoints();
  }, [selectedItems])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Feather name="arrow-left" size={20} color="#34cb79" />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome.</Text>
      <Text style={styles.description}>Find on map a collect point.</Text>

      <View style={styles.mapContainer}>
        {initialPosition[0] !== 0 && (
          <MapView 
            style={styles.map}
            loadingEnabled={initialPosition[0] === 0}
            initialRegion={{ 
              latitude: initialPosition[0], 
              longitude: initialPosition[1], 
              latitudeDelta: 0.014, 
              longitudeDelta: 0.014 
            }} 
          >
            {points.map(point => (
              <Marker
                style={styles.mapMarker}
                key={point.id}
                onPress={() => handleNavigateToDetail(point.id)}
                coordinate={{
                  latitude: point.latitude, 
                  longitude: point.longitude
                }}
              >
                <View style={styles.mapMarkerContainer}>
                  <Image 
                    style={styles.mapMarkerImage}
                    source={{
                      uri: point.image
                    }}
                  />
                  <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        )}
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map(item => (
            <TouchableOpacity 
              key={String(item.id)} 
              style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]} 
              onPress={() => handleItemSelection(item.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}