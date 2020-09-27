import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Layout from '../components/Layout';
import ImageLoader from '../components/ImageLoader';
import AnalysisItem from '../components/AnalysisItem';
import {
  DARK_BROWN, CYAN_BLUE, DARK_BLACK, LIGHT_BROWN,
} from '../constant/styles';
import { useRecipe } from '../context/RecipeProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CYAN_BLUE,
  },
  banner: {
    width: '100%',
    height: 300,
    backgroundColor: DARK_BROWN,
  },
  image: {
    height: '100%',
  },
  back: {
    position: 'absolute',
    top: 50,
    left: '5%',
    zIndex: 30,
  },
  content: {
    paddingHorizontal: '5%',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  analysis: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  section: {
    marginVertical: 20,
  },
  subTitle: {
    letterSpacing: 2,
    fontWeight: 'bold',
    color: DARK_BROWN,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    letterSpacing: 1.5,
    marginBottom: 3,
    fontSize: 12,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  orderNum: {
    marginRight: 10,
    lineHeight: 20,
    color: LIGHT_BROWN,
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepText: {
    lineHeight: 20,
  },
});

export default function RecipeScreen({ navigation }) {
  const { toggleRecipe } = useRecipe();
  const {
    imageUri, mandarinName, englishName, ingredients, steps, analysis,
  } = toggleRecipe;

  return (
    <Layout shouldSafeArea={false}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <ImageLoader
            style={styles.image}
            source={{
              uri: imageUri,
            }}
          />
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={24} color={DARK_BLACK} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>{mandarinName} - {englishName}</Text>
          <View style={[styles.analysis]}>
            <AnalysisItem category="alcohol" description={analysis.alcohol} />
            <AnalysisItem category="glass" description={analysis.glass} />
            <AnalysisItem category="method" description={analysis.method} />
          </View>
          <View style={styles.section}>
            <Text style={[styles.subTitle]}>INGREDIENTS</Text>
            {ingredients.map(({ key, value }, i) => (
              <Text key={i} style={styles.text}>* {key} {value}</Text>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={[styles.subTitle]}>STEP BY STEP</Text>
            {steps.map((step, i) => (
              <View key={i} style={styles.step}>
                <Text style={styles.orderNum}>{i + 1}</Text>
                <Text style={[styles.text, styles.stepText]}>{step}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
