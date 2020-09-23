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
  textContainer: {

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
      <OverviewItemCard />
    </View>
    </>
  );
}
