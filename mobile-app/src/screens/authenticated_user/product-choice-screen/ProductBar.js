import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";

export default function ProductBar(props) {

    const [count, setCount] = useState(0);
    const [isPressed, setPressed] = useState(false);

    const {addToCart} = useContext(CartContext);

    function decCount() {
        if (count === 1) {
            setPressed(false);
            setCount(0);
            return;
        }
        setCount(count - 1);
    }

    function beginAddToCart() {
        setCount(1);
        setPressed(true);
    }

    function confirmAddToCart(product, count) {
        setPressed(false);
        setCount(0);
        addToCart(product, count);
    }

    return(
        <View style = {styles.container}>
            <View style = {styles.displayBar}>
                <Image source = {props.shopImage} style = {styles.shopImage} />
                <Image source = {props.productImage} style = {styles.productImage} />
                <View style = {styles.productInfo}>
                    <Text style = {styles.productNameText}>{props.productName}</Text>
                    <Text style = {styles.productPriceText}>{props.productPrice}</Text>
                </View>
                <TouchableOpacity style = {styles.addToCartView} onPress = {() => beginAddToCart()}>
                    <Image source = {require('../../../../assets/cart.png')} style = {{height: '80%', aspectRatio: 1}}/>
                </TouchableOpacity>
            </View>
            {isPressed &&
            <View style = {styles.productMultChoiceBar}>
                <View style = {styles.choiceBarSection}>
                    <TouchableOpacity style = {styles.choiceBarButton} onPress = {() => decCount()}>
                        <Text style = {styles.choiceBarText}>-</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.choiceBarSection}>
                    <TouchableOpacity style = {styles.addToCartButton} onPress = {() => confirmAddToCart(props, count)}>
                        <Text style = {styles.addToCartText}>Dodaj: {count}</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.choiceBarSection}>
                    <TouchableOpacity style = {styles.choiceBarButton} onPress = {() => setCount(count + 1)}>
                        <Text style = {styles.choiceBarText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
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
        padding: 4
    },

    displayBar: {
        flexDirection: 'row',
    },

    productImage: {
        flex: 1.7,
        aspectRatio: 1,
    },

    shopImage: {
        flex: 0.8,
        aspectRatio: 1,
    },

    productInfo: {
        flex: 3,
        marginLeft: 5,
        flexDirection: 'column'
    },

    productNameText: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    productPriceText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
    },

    addToCartView: {
        flex: 2,
        aspectRatio: 1.3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    productMultChoiceBar: {
        flex: 1,
        flexDirection: 'row',
        padding: 8
    },

    choiceBarSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    choiceBarButton: {
        aspectRatio: 1,
        borderRadius: 20,
        backgroundColor: '#22E57D',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6
    },

    addToCartButton: {
        borderRadius: 20,
        backgroundColor: '#22E57D',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        paddingLeft: 15,
        paddingRight: 15
    },

    choiceBarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

    addToCartText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});