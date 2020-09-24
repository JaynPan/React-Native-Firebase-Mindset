import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import * as firebase from 'firebase';

const storage = firebase.storage();

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: '5%',
    backgroundColor: '#1B2021',
    height: 150,
    borderRadius: 20,
    flexDirection: 'row',
    shadowColor: '#1B2021',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imageContainer: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
    width: 120,
    backgroundColor: '#A99985',
  },
  image: {
    flexShrink: 0,
    width: '100%',
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
    fontSize: 14,
    marginBottom: 10,
  },
  ingredients: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
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

export default function OverviewItemCard({
  mandarinName, englishName, ingredients, analysis, imageName,
}) {
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${imageName}`);

    imageRef
      .getDownloadURL()
      .then((url) => { setImageUri(url); });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUri.length > 0 && (
          <Image
            style={styles.image}
            source={{
              uri: imageUri,
            }}
          />
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{mandarinName} - {englishName}</Text>
       <View style={styles.ingredients}>
         {ingredients.map(({ key }, i) => (
           <Text key={i} style={styles.ingredient}>#{key}</Text>
         ))}
       </View>
       <View style={styles.analysis}>
        <View style={styles.analysisItem}>
            <View style={styles.iconWrapper}>
              <Feather name="droplet" size={16} color="#fff" />
            </View>
            <Text style={styles.text}>{analysis.alcohol}</Text>
        </View>
        <View style={styles.analysisItem}>
            <View style={styles.iconWrapper}>
              <FontAwesome name="glass" size={16} color="#fff" />
            </View>
            <Text style={styles.text}>{analysis.glass}</Text>
        </View>
        <View style={styles.analysisItem}>
            <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="cup" size={16} color="#fff" />
            </View>
            <Text style={styles.text}>{analysis.method}</Text>
        </View>
       </View>
      </View>
    </View>
  );
}
