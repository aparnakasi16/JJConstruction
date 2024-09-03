import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function Profile(props) {
    return (
       <View style={styles.container}> 
        <Text>
            Profile Screen
        </Text>
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default Profile;