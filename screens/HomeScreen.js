import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, StatusBar, FlatList,
} from 'react-native';
import { Avatar, SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Fuse from 'fuse.js';

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

const cocktails = [
  {
    id: 'id-01',
    mandarinName: '琴通寧',
    englishName: 'Gin Tonic',
    imageName: 'gin-tonic.jpg',
    ingredients: [
      {
        key: '琴酒',
        value: '45ml',
      },
      {
        key: '通寧水',
        value: '適量',
      },
      {
        key: '檸檬汁',
        value: '15ml',
      },
    ],
    analysis: {
      alcohol: '中酒精',
      glass: '可林杯',
      method: '直調法',
    },
  },
  {
    id: 'id-02',
    mandarinName: '長島冰茶',
    englishName: 'Long Island Iced Tea',
    imageName: 'long-island-iced-tea.jpg',
    ingredients: [
      {
        key: '伏特加',
        value: '15ml',
      },
      {
        key: '琴酒',
        value: '15ml',
      },
      {
        key: '萊姆酒',
        value: '15ml',
      },
      {
        key: '龍舌蘭',
        value: '15ml',
      },
      {
        key: '君度橙酒',
        value: '1tsp',
      },
      {
        key: '檸檬汁',
        value: '15ml',
      },
      {
        key: '糖漿',
        value: '10ml',
      },
      {
        key: '可樂',
        value: '適量',
      },
    ],
    analysis: {
      alcohol: '高酒精',
      glass: '高球杯',
      method: '搖盪法',
    },
  },
  {
    id: 'id-03',
    mandarinName: '瑪格麗特',
    englishName: 'Margarita',
    imageName: 'long-island-iced-tea.jpg',
    ingredients: [
      {
        key: '龍舌蘭',
        value: '60ml',
      },
      {
        key: '君度橙酒',
        value: '25',
      },
      {
        key: '檸檬汁',
        value: '15ml',
      },
      {
        key: '糖漿',
        value: '10ml',
      },
    ],
    analysis: {
      alcohol: '中高酒精',
      glass: '瑪格麗特杯',
      method: '搖盪法',
    },
  },
];

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

const fuse = new Fuse(cocktails, searchOptions);

export default function HomeScreen() {
  const { userInfo, setRefetchUserInfo } = useAuth();
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(cocktails);

  const updateSearch = (val) => {
    setSearch(val);
  };

  useEffect(() => {
    if (search.trim().length !== 0) {
      const searchResult = fuse.search(search).map(({ item }) => item);

      setResult(searchResult);
    } else {
      setResult(cocktails);
    }
  }, [search]);

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      setRefetchUserInfo(true);
    }
  }, []);

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
