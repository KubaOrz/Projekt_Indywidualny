import { FlatList, StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { AxiosContext } from "../../../context/AxiosContext";
import CategoryChoiceBox from "./CategoryChoiceBox";
import ProductBar from "./ProductBar";
import ProductSearchBar from "./ProductSearchBar";

export default function ProductChoiceScreen({navigation}) {

    const [categories, setCategories] = useState([]);
    const [shops, setShops] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [url, setUrl] = useState('/products');

    const authContext = useContext(AuthContext);
    const {authAxios} = useContext(AxiosContext);

    function loadCategories() {
        authAxios.get('/products/category') 
        .then((response) => {
            setCategories(response.data)
        }).catch((error) => {
            console.error(error);
        });
    }

    function loadProducts(path) {
        authAxios.get(path)
        .then((response) => {
            setDisplayedProducts(response.data.content);
            console.log('pobieranie');
        }).catch((error) => {
            console.error(error);
        });
    }

    function loadShops() {
        authAxios.get('/products/shop')
        .then((response) => {
            setShops(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        loadCategories();
        loadShops();
        loadProducts('/products');
        console.log("use effect");
    }, []);

    useEffect(() => {

    })

    function loadMoreData() {
        console.log('pobierz więcej danych');
    }

    const renderItem = ({ item }) => (
        <ProductBar 
        productId = {item.id}
        productName = {item.name}
        productPrice = {item.price}
        productImage = {{ uri: `data:image/png;base64,${item.image}` }}
        shopImage = {{ uri: `data:image/png;base64,${shops.find(shop => shop.id === item.shopId).icon}` }} />
      );

    return (
        <View style = {styles.container}>
            <ProductSearchBar search = {loadProducts}/>
            <CategoryChoiceBox categories = {categories} onPress = {loadProducts}/>
            <FlatList
                data = {displayedProducts}
                renderItem = {renderItem}
                keyExtractor={item => item.id.toString()}
                style = {{width: '90%'}}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
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
        justifyContent: 'center'
    },

});