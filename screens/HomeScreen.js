import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, StatusBar, FlatList,
} from 'react-native';
import { Avatar, SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Fuse from 'fuse.js';
import * as firebase from 'firebase';

import { useAuth } from '../context/AuthProvider';
import OverviewItemCard from '../components/OverviewItemCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#44555f',
  },
});

const greetingStyles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
    color: '#fff',
  },
  body: {
    letterSpacing: 2,
    color: '#fff',
  },
});

const barStyles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    backgroundColor: '#1B2021',
    paddingBottom: 30,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterIcon: {
    width: 50,
    alignItems: 'center',
  },
});

const searchOptions = {
  keys: [
    'englishName',
    'mandarinName',
    'ingredients.key',
    'analysis.alcohol',
    'analysis.method',
    'analysis.glass',
  ],
};

export default function HomeScreen() {
  const { userInfo, setRefetchUserInfo } = useAuth();
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [result, setResult] = useState(recipes);
  const fuse = new Fuse(recipes, searchOptions);

  const updateSearch = (val) => {
    setSearch(val);
  };

  const fetchRecipes = async () => {
    try {
      const querySnapshot = await firebase.firestore().collection('recipes').get();
      const newRecipes = [];

      querySnapshot.forEach((doc) => {
        newRecipes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setRecipes(newRecipes);
    } catch (e) {
      console.log(e.message);
    }
  };

  const filterRecipes = () => {
    if (search.trim().length !== 0) {
      const searchResult = fuse.search(search).map(({ item }) => item);
      setResult(searchResult);
    }
  };

  useEffect(() => {
    filterRecipes();
  }, [search]);

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      setRefetchUserInfo(true);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    setResult(recipes);
  }, [recipes]);

  return (
    <>
    <StatusBar barStyle="light-content" />
    <View style={styles.container}>
      <View style={barStyles.container}>
        <View style={greetingStyles.container}>
          <View style={greetingStyles.textContainer}>
            <Text style={greetingStyles.title}>Hi, {userInfo.firstname}</Text>
            <Text style={greetingStyles.body}>今天想喝點什麼呢？</Text>
          </View>
          <Avatar
            size="medium"
            rounded
            source={{
              uri: userInfo.profilePicture,
            }}
          />
        </View>
        <View style={barStyles.filterContainer}>
          <SearchBar
            round
            placeholder="搜尋..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={{
              padding: 0,
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              flex: 1,
              marginRight: 10,
            }}
          />
          <View style={barStyles.filterIcon}>
            <Ionicons
              name="ios-funnel"
              size={24}
              color="#86939e"
            />
          </View>
        </View>
      </View>
      <FlatList
        data={result}
        renderItem={({ item }) => {
          const {
            mandarinName, englishName, ingredients, analysis, imageName,
          } = item;

          return (
            <OverviewItemCard
              mandarinName={mandarinName}
              englishName={englishName}
              ingredients={ingredients}
              analysis={analysis}
              imageName={imageName}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
    </>
  );
}
