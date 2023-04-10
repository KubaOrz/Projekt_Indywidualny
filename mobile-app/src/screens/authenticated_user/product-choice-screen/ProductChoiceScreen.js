import ProductDisplay from "./CategoryChoiceBox";
import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { AxiosContext } from "../../../context/AxiosContext";
import CategoryChoiceBox from "./CategoryChoiceBox";

export default function ProductChoiceScreen({navigation}) {

    const [categoryId, setCategoryId] = useState(null);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    var productName = useRef('');

    const authContext = useContext(AuthContext);
    const {authAxios} = useContext(AxiosContext);

    const renderItem = ({ item }) => (
        <View>
          <Text>{item.id} - {item.name} - {item.price}</Text>
        </View>
      );

    function loadProducts() {
        authAxios.get('/products')
        .then((response) => {
            setDisplayedProducts(response.data.content)
            console.log(displayedProducts);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        loadProducts();
        console.log("use effect");
    }, []);

    function loadProductsById(id) {
        authAxios.get('/products/category/'+ id)
        .then((response) => {
            setDisplayedProducts(response.data.content)
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <View style = {styles.container}>
            <CategoryChoiceBox onPress = {loadProductsById}/>
            <FlatList
                data = {displayedProducts}
                renderItem = {renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#8232B9',
        alignItems: 'center',
    }
});