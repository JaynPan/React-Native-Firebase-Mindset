import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import * as firebase from 'firebase';

const storage = firebase.storage();

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: '5%',
    backgroundColor: '#1B2021',
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  image: {
    flexShrink: 0,
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
  body: {
    flex: 1,
    margin: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
  ingredients: {
    flexDirection: 'row',
    flex: 1,
  },
  ingredient: {
    fontSize: 11,
    color: '#DAD2BC',
    marginRight: 3,
  },
  iconWrapper: {
    backgroundColor: '#A99985',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  analysis: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  analysisItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
});

export default function OverviewItemCard() {
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    const storageRef = storage.ref();
    const ginTonicRef = storageRef.child('images/gin-tonic.jpg');

    ginTonicRef
      .getDownloadURL()
      .then((url) => { setImageUri(url); });
  }, []);

  return (
    <View style={styles.container}>
      {imageUri.length > 0 && (
        <Image
          style={styles.image}
          source={{
            uri: imageUri,
          }}
        />
      )}
      <View style={styles.body}>
       <Text style={styles.title}>琴通寧 - Gin Tonic</Text>
       <View style={styles.ingredients}>
        <Text style={styles.ingredient}>#琴酒</Text>
        <Text style={styles.ingredient}>#通寧水</Text>
        <Text style={styles.ingredient}>#檸檬</Text>
       </View>
       <View style={styles.analysis}>
        <View style={styles.analysisItem}>
            <View style={styles.iconWrapper}>
              <Feather name="droplet" size={16} color="#fff" />
            </View>
            <Text style={styles.text}>中酒精</Text>
        </View>
        <View style={styles.analysisItem}>
            <View style={styles.iconWrapper}>
              <FontAwesome name="glass" size={16} color="#fff" />
            </View>
            <Text style={styles.text}>可林杯</Text>
        </View>
        <View style={styles.analysisItem}>
            <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="cup" size={16} color="#fff" />
            </View>
            <Text style={styles.text}>直調法</Text>
        </View>
       </View>
      </View>
    </View>
  );
}
