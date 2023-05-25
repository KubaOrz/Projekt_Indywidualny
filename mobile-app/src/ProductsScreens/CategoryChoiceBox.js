import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import Tile from "../UniversalComponents/Tile";
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from "../AuthenticationScreens/AuthContext";
import { AxiosContext } from "../AuthenticationScreens/AxiosContext";

export default function CategoryChoiceBox(props) {

    const renderItem = ({ item }) => (
        <Tile
            onPress = {() => props.onPress('/products/category/'+ item.id)} 
            backgroundImage = {{ uri: `data:image/png;base64,${item.image}` }}
            label = {item.name} />
      );

    return(
        <View style={styles.categoryContainer}>
            <FlatList
                horizontal
                data={props.categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle = {styles.listContentContainer}
            />
        </View>
    )
}

  const styles = StyleSheet.create({
    categoryContainer: {
        height: '11%',
        width: '100%',
        marginBottom: 20,
    },

    listContentContainer: {
        justifyContent: 'space-evenly',
        flexGrow: 1
    }
  });