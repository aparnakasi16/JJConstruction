import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function NewConstruction(props) {
    return (
      <View style={styles.parentContainer}>
        <Text style={styles.headerText}>
         New Construction
        </Text>
      </View>
    );
}
const styles =StyleSheet.create({
    parentContainer:{
        flex:1,    
        backgroundColor: '#005248',
        paddingTop:60,
        padding:10
    },
    headerText:{
        color: '#FFA500',
        fontWeight:'600',
        fontSize:18

    }
})
export default NewConstruction;