import React,{useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import projectImg1 from '../../../assets/Img3.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
const HomeScreen = () => {
  const [userData, setUserData] = useState()
  const userDetails = useSelector(state =>state.auth.userDetails)
  console.log('userDetails', userDetails)
  const projects = [
    {
      id: '1',
      image: projectImg1,
      description: '4 BHK House - 4500 Sqft Maxworth Nagar',
    },
    {
        id: '2',
        image: projectImg1,
        description: '4 BHK House - 4500 Sqft Maxworth Nagar',
      },
    // Add more projects as needed
  ];

  useEffect(()=>{
    getUserData()
  },[])

  const getUserData =async()=>{
    await AsyncStorage.getItem('userData').then(res => {
      data = JSON.parse(res);
      setUserData(data);
    });
  }

  const renderProjectItem = ({item}) => (
    (
      <View style={styles.projectItem}>
        <Image
          source={require('../../../assets/Img3.png')}
          style={styles.projectImage}
        />
        <Text style={styles.projectDescription}>{item.description}</Text>
      </View>
    )
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello {userData?.name},</Text>
        <Text style={styles.subGreeting}>
          We offer a one step solution for all your construction needs
        </Text>
      </View>

      <ScrollView>
        <View style={styles.serviceSection}>
          <Text style={styles.sectionTitle}>What are you looking for?</Text>
          <View style={styles.services}>
            <TouchableOpacity style={styles.serviceCard}>
              <Image
                source={require('../../../assets/Img1.png')}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceText}>Repair & Renovation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard}>
              <Image
                source={require('../../../assets/Img2.png')}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceText}>Design & Build</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.projectsSection}>
          <Text style={[styles.sectionTitle,{color:'#005248'}]}>Our Projects</Text>
          <FlatList
            data={projects}
            renderItem={renderProjectItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:40
  },
  header: {
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subGreeting: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  serviceSection: {
    padding: 20,
    backgroundColor: '#005248',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    height:200
  },
  serviceImage: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  projectsSection: {
    padding: 20,
  },
  projectItem: {
    marginRight: 10,
  },
  projectImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  projectDescription: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#005248',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
