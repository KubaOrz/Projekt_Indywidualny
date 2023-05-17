import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AxiosContext } from '../../context/AxiosContext';
import LoadingSpinner from '../LoadingSpinner';
import Alert from '../Alert';
import DefaultStyles from '../../styles/DefaultStyles';
import OrderStatusBox from './OrderStatusBox';
import OrderInfoBox from './OrderInfoBox';
import ShoppingList from './ShoppingList';

export default function OrderDetailsScreen({navigation, route}) {

    const [orderData, setOrderData] = useState([]);
    const [status, setStatus] = useState('loading');
    const [shops, setShops] = useState([]);
    const [showShoppingList, setShowShoppingList] = useState(false);
    const url = useRef(displayType === 'USER' ? '/purchaser/orders/': '/supplier/orders/');
    const {id, displayType} = route.params;

    const {getWithRefresh} = useContext(AxiosContext);

    async function loadShops() {
        const [data, error] = await getWithRefresh('/products/shop');
        if (!error) {
            setShops(data);
        } else {
            console.log(error);
            setStatus('error');
        }
    }

    async function loadOrderData(url) {
        const [data, error] = await getWithRefresh(url + id);
        if (data) {
            setOrderData(data);
            setStatus('ok');
        } else {
            console.log(error);
            setStatus('error');
        }
    }

    useEffect(() => {
        async function loadData() {
            await loadShops();
            await loadOrderData(url.current);
            console.log(orderData.status + " " + displayType);
        }

        loadData();
    }, [])

    function Body() {
        if (status === 'ok') {
            return (
                <View style = {styles.body}>
                    <OrderStatusBox status = {orderData.status}/>

                    <OrderInfoBox orderData = {orderData}/>

                    <TouchableOpacity onPress = {() => setShowShoppingList(true)} style = {DefaultStyles.defaultButton}>
                        <Text style = {DefaultStyles.defaultText}>Pokaż listę zakupów</Text>
                    </TouchableOpacity>

                    {displayType === 'USER' && orderData.status === 'IN_PROGRESS' && 

                        <TouchableOpacity onPress = {() => console.log('Wyświetlam mapkę')} style = {DefaultStyles.defaultButton}>
                            <Text style = {DefaultStyles.defaultText}>Pokaż lokalizację dostawcy</Text>
                        </TouchableOpacity>
                    }

                    {displayType === 'SUPPLIER' && orderData.status === 'IN_PROGRESS' &&

                        <TouchableOpacity onPress = {() => console.log('Wyświetlam mapkę')} style = {DefaultStyles.defaultButton}>
                            <Text style = {DefaultStyles.defaultText}>Pokaż trasę</Text>
                        </TouchableOpacity>
                    }

                    {displayType === 'SUPPLIER' && orderData.status === 'ACTIVE' &&

                        <TouchableOpacity onPress = {() => console.log('Podejmuję zamówienie')} style = {DefaultStyles.defaultButton}>
                            <Text style = {DefaultStyles.defaultText}>Podejmij zamówienie</Text>
                        </TouchableOpacity>
                    }

                    {showShoppingList &&
                    <ShoppingList 
                        shoppingList = {orderData.shoppingList}
                        shops = {shops}
                        onClose = {setShowShoppingList}
                    />
                    }

                </View>
            )   
        } else {
            return (
                <LoadingSpinner/>
            )
        }
    }

    return (
         <View style = {styles.container}>
            <Text style = {styles.title}>Zamówienie numer {id}</Text>
            
            <Body/>

            {status === 'error' &&
                <Alert title = {'Błąd!'} message = {'Wystapił błąd przy połączeniu z serwerem!'} onClose={() => navigation.goBack()}/>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#8232B9',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    },

    body: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
});
