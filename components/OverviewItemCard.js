import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';

import { DARK_BLACK, DARK_BROWN, LIGHT_BROWN } from '../constant/styles';
import { useRecipe } from '../context/RecipeProvider';
import ImageLoader from './ImageLoader';
import AnalysisItem from './AnalysisItem';

const storage = firebase.storage();

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: '5%',
    backgroundColor: DARK_BLACK,
    height: 150,
    borderRadius: 20,
    flexDirection: 'row',
    shadowColor: DARK_BLACK,
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
    backgroundColor: DARK_BROWN,
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
    color: LIGHT_BROWN,
    marginRight: 3,
  },
  iconWrapper: {
    backgroundColor: DARK_BROWN,
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
});

export default function OverviewItemCard({ data, navigation }) {
  const { saveToggleRecipe } = useRecipe();
  const [imageUri, setImageUri] = useState('');
  const {
    mandarinName, englishName, ingredients, analysis, imageName,
  } = data;

  const handleCardPress = () => {
    saveToggleRecipe({ ...data, imageUri });
    navigation.navigate('RecipeScreen');
  };

  useEffect(() => {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${imageName}`);

    imageRef
      .getDownloadURL()
      .then((url) => { setImageUri(url); });
  }, []);

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUri.length > 0 && (
            <ImageLoader
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
          <AnalysisItem category="alcohol" description={analysis.alcohol} />
          <AnalysisItem category="glass" description={analysis.glass} />
          <AnalysisItem category="method" description={analysis.method} />
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
