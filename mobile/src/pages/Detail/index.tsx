import React, { useEffect, useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as MailComposer from 'expo-mail-composer';
import api from 'services/api';

export default function Detail() {

  const [pointData, setPointData] = useState<Point>();

  const navigator = useNavigation();
  const route = useRoute();

  const routeParams = route.params as PointDetailParams;

  function handleNavigateBack() {
    navigator.goBack();
  }

  function handleComposeMail() {
    if (pointData) MailComposer.composeAsync({
      subject: 'Interesse na coleta de residuos',
      recipients: [pointData.email]
    });
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${pointData?.whatsapp}&text="Interesse na coleta de residuos"`);
  }

  async function fetchPoint() {
    const res = await api.get<PointRequest>(`/points/${routeParams.point_id}`);

    setPointData({ ...res.data.point, items: res.data.items });
  }

  useEffect(() => {
    fetchPoint();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: pointData?.image }} />

        <Text style={styles.pointName}>{pointData?.name}</Text>
        <Text style={styles.pointItems}>{pointData?.items.map(item => item.title).join(', ')}</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Address</Text>
          <Text style={styles.addressContent}>{pointData?.city}, {pointData?.uf}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Feather name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}