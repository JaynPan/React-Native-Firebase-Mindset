import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, StatusBar,
} from 'react-native';
import { Avatar, SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

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
    ingredients: ['琴酒', '通寧水', '檸檬'],
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
    ingredients: ['伏特加', '琴酒', '萊姆酒', '龍舌蘭', '君度橙酒', '檸檬', '糖漿', '可樂'],
    analysis: {
      alcohol: '濃酒精',
      glass: '高球杯',
      method: '搖盪法',
    },
  },
];

export default function HomeScreen() {
  const { userInfo, setRefetchUserInfo } = useAuth();
  const [search, setSearch] = useState('');

  const updateSearch = (val) => {
    setSearch(val);
  };

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      console.log('refetch');
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
      {cocktails.map(({
        id, mandarinName, englishName, ingredients, analysis, imageName,
      }) => (
        <OverviewItemCard
          key={id}
          mandarinName={mandarinName}
          englishName={englishName}
          ingredients={ingredients}
          analysis={analysis}
          imageName={imageName}
        />
      ))}
    </View>
    </>
  );
}
