import React, { useContext, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { CartContext } from './CartContext';
import CartItem from './CartItem';

export default function CartView(props) {

    const {cartState} = useContext(CartContext);

    const renderItem = ({ item }) => (
        <CartItem 
            productId = {item.product.productId}
            productName = {item.product.productName}
            productPrice = {item.product.productPrice}
            productImage = {item.product.productImage}
            shopImage = {item.product.shopImage}
            productCount = {item.count}
            />
      );

    useEffect(() => {
        if (cartState.products.length === 0) {
            props.onClose(false);
        }
    }, [cartState.products])

    function openOrderForm() {
        props.navigation.navigate("OrderForm");
        props.onClose(false);
    }

    return (
        <Modal animationType = "fade" transparent = {true}>
            <View style = {styles.overlay}>
                <View style = {styles.alert}>
                    <Text style = {styles.cartHeading}>Podsumowanie</Text>

                    <View style = {{flex: 7, width: '100%'}}>
                        <FlatList
                            data = {cartState.products}
                            renderItem = {renderItem}
                            keyExtractor={item => item.product.productId.toString()}
                            style = {{paddingTop: 10, paddingBottom: 10}}
                            showsVerticalScrollIndicator={false}
                        /> 
                    </View>

                    <View style = {styles.summaryBox}>
                        <TouchableOpacity onPress = {() => openOrderForm()} style = {[styles.summaryBoxButton, styles.orderButton]}>
                            <Text style = {styles.summaryButtonText}>Zamów za {cartState.totalPrice.toFixed(2)} zł</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => props.onClose(false)} style = {[styles.summaryBoxButton, styles.returnButton]}>
                            <Text style = {styles.summaryButtonText}>Kontynuuj zakupy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    alert: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 5,
        width: '90%',
        aspectRatio: 0.5
    },

    button: {
        backgroundColor: '#C10D49',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderColor: 'white',
        borderWidth: 2,
        paddingHorizontal: 40
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    cartHeading: {
        flex: 0.7,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
        backgroundColor: '#f2f2f2',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 6,
        borderRadius: 10
    },

    summaryBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-evenly'
    },

    summaryBoxButton: {
        width: '45%',
        borderRadius: 10,
        aspectRatio: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 6,
    },

    orderButton: {
        backgroundColor: '#22E57D',
    },

    returnButton: {
        backgroundColor: '#ff5050',
    },

    summaryButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    }
});
