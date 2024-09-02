import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../../modules/Home/Home';
// import NewConstructionScreen from './newConstruction';
// import ServicesScreen from './services';
// import ProfileScreen from './profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewConstruction from '../../modules/NewEnquiry/NewConstruction';
import Services from '../../modules/Services/Services';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName;
        if (route.name === 'Home') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'NewConstruction') {
          iconName = isFocused ? 'construct' : 'construct-outline';
        } else if (route.name === 'Services') {
          iconName = isFocused ? 'cog' : 'cog-outline';
        } else if (route.name === 'Profile') {
          iconName = isFocused ? 'person' : 'person-outline';
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            // accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            key={index}
          >
            <Ionicons name={iconName} size={24} color={isFocused ? '#fff' : 'gray'} />
            <Text style={{ color: isFocused ? '#fff' : 'gray' ,fontSize:12}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function BottomTab() {
  return (
      <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen}  options={{
            headerShown: false,}}/>
        <Tab.Screen name="NewConstruction" component={NewConstruction} options={{
            headerShown: false,}}/>
        <Tab.Screen name="Services" component={Services} options={{
            headerShown: false,}}/>
        <Tab.Screen name="Profile" component={HomeScreen} options={{
            headerShown: false,}}/>
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#005248',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height:80,
   
  },
  tabItem: {
    alignItems: 'center',
  },
});
