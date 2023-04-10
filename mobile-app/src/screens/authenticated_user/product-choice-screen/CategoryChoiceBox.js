import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import DefaultStyles from "../../../styles/DefaultStyles";
import Tile from "../../../universal-components/Tile";
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { AxiosContext } from "../../../context/AxiosContext";
import { encode } from 'base-64';

export default function CategoryChoiceBox(props) {

    const authContext = useContext(AuthContext);
    const {authAxios} = useContext(AxiosContext);

    const [categories, setCategories] = useState([]);

    function loadCategories() {
        authAxios.get('/products/category') 
        .then((response) => {
            setCategories(response.data)
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        loadCategories();
        console.log("use effect");
    }, [])

    function test() {
        console.log("Działa");
    };

    //const base64Image = encode(imageData);

    const renderItem = ({ item }) => (
        <Tile
            onPress = {() => props.onPress(item.id)} 
            backgroundImage = {{ uri: `data:image/png;base64,${encode(item.image)}` }}
            label = {item.name} />
      );

    return(
        <View style={styles.categoryContainer}>
            <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    )
}

  const styles = StyleSheet.create({
    categoryTileRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    categoryContainer: {
      height: '15%',
      width: '100%'
    },
  });