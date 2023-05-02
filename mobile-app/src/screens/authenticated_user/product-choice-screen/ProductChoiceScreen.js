import { FlatList, StyleSheet, View } from "react-native";
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { AxiosContext } from "../../../context/AxiosContext";
import CategoryChoiceBox from "./CategoryChoiceBox";
import ProductBar from "./ProductBar";
import ProductSearchBar from "./ProductSearchBar";
import LoadingSpinner from "../../../universal-components/LoadingSpinner";
import FailureAlert from "../../../alerts/FailureAlert";
import CartButton from "../cart_view/CartButton";
import CartView from "../cart_view/CartView";

export default function ProductChoiceScreen({navigation}) {

    const [categories, setCategories] = useState([]);
    const [shops, setShops] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);

    const [categoriesStatus, setCategoriesStatus] = useState('loading');
    const [shopsStatus, setShopsStatus] = useState('loading');
    const [productsStatus, setProductsStatus] = useState('loading');

    const [showError, setShowError] = useState(false);
    const [showCart, setShowCart] = useState(false);

    var url = useRef('/products');
    var page = useRef(null);
    var isLast = useRef(false);

    const authContext = useContext(AuthContext);
    const {authAxios, getWithRefresh} = useContext(AxiosContext);

    async function loadCategories() {
        const [data, error] = await getWithRefresh('/products/category');
        if (!error) {
            setCategories(data);
            setCategoriesStatus('ok');
        } else {
            setCategoriesStatus('error');
            setShowError(true);
        }
    }

    async function loadProducts(path) {
        const [data, error] = await getWithRefresh(path);
        if (!error) {
            const newDisplayedProducts = displayedProducts.concat(data.content);
            setDisplayedProducts(newDisplayedProducts);
            page.current = data.number;
            isLast.current = data.last;
            setProductsStatus('ok');
        } else {
            setProductsStatus('error');
            setShowError(true);
        }
    }

    async function loadShops() {
        const [data, error] = await getWithRefresh('/products/shop');
        if (!error) {
            setShops(data);
            setShopsStatus('ok');
        } else {
            setShopsStatus('error');
            setShowError(true);
        }
    }

    useEffect(() => {
        async function loadData() {
            await loadCategories();
            await loadShops();
            await loadProducts('/products');
        }
        loadData();
    }, []);

    function loadMoreProducts() {
        if (!isLast.current) {
            loadProducts(url.current + '?page=' + (page.current + 1));
        }
    }

    function changeUrl(newUrl) {
        setProductsStatus('loading');
        setDisplayedProducts([]);
        url.current = newUrl;
        page.current = 0;
    }

    useEffect(() => {
        if (categoriesStatus === 'ok' && shopsStatus === 'ok') {
            loadProducts(url.current);
        }
    }, [url.current])

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

            <ProductSearchBar search = {changeUrl}/>

            {categoriesStatus === 'ok' &&
            <CategoryChoiceBox categories = {categories} onPress = {changeUrl}/>
            || <LoadingSpinner/>}

            {productsStatus === 'ok' && shopsStatus === 'ok' &&
            <FlatList
                data = {displayedProducts}
                renderItem = {renderItem}
                keyExtractor={item => item.id.toString()}
                style = {{width: '90%'}}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={0.5}
            />   
            || <LoadingSpinner/>
            }
            <CartButton onPress = {setShowCart}/>
            {showError && 
                <FailureAlert title = {'Błąd!'} message = {'Wystapił błąd przy połączeniu z serwerem!'} onClose={() => navigation.goBack()}/>
            }

            {showCart && 
                <CartView onClose = {setShowCart}/>
            }

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