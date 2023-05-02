import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";

export default function CartItem(props) {

    const {cartState} = useContext(CartContext);
    const [count, setCount] = useState(props.productCount);

    return(
        <View style = {styles.container}>
            <View style = {styles.displayBar}>
                <Image source = {props.shopImage} style = {styles.shopImage} />
                <Image source = {props.productImage} style = {styles.productImage} />
                <View style = {styles.productInfo}>
                    <Text style = {styles.boldText}>{props.productName}</Text>
                    <Text style = {styles.productPriceText}>{props.productPrice}</Text>
                </View>
                <View style = {styles.productCountView}>
                    <Text>x{count}</Text>
                </View>
                <TouchableOpacity style = {styles.productCountView} onPress = {() => console.log('Usuwam produkt %s z koszyka', props.productName)}>
                    <Text style = {styles.removeProductButton}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        borderRadius: 5,
        marginBottom: 15,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 6
    },

    displayBar: {
        flexDirection: 'row',
    },

    productImage: {
        flex: 1.3,
        aspectRatio: 1,
    },

    shopImage: {
        flex: 0.6,
        aspectRatio: 1,
    },

    productInfo: {
        flex: 3,
        marginLeft: 5,
        flexDirection: 'column'
    },

    boldText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    productPriceText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
    },

    productCountView: {
        flex: 1,        justifyContent: 'center',
        alignItems: 'center',
    },

    removeProductButton: {
        backgroundColor: '#ff5050',
        borderRadius: 100,
        padding: 5,
        aspectRatio: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
});