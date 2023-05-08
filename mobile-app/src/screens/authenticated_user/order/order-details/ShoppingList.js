import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import ShoppingListItem from "./ShoppingListItem";

export default function ShoppingList({shoppingList, shops, onClose}) {

    const renderItem = ({ item }) => (
        <ShoppingListItem 
            productId = {item.product.id}
            productName = {item.product.name}
            productPrice = {item.product.price}
            productImage = {{ uri: `data:image/png;base64,${item.product.image}` }}
            shopImage = {{ uri: `data:image/png;base64,${shops.find(shop => shop.id === item.product.shopId).icon}` }}
            productCount = {item.count}
            />
      );

    return (
        <Modal animationType = "fade" transparent = {true}>
            <View style = {styles.overlay}>
                <View style = {styles.alert}>
                    <Text style = {styles.cartHeading}>Lista produktów</Text>

                    <View style = {{flex: 7, width: '100%'}}>
                        <FlatList 
                            data = {shoppingList}
                            renderItem = {renderItem}
                            keyExtractor={item => item.id.toString()}
                            style = {{paddingTop: 10, paddingBottom: 10}}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                        /> 
                    </View>

                    <TouchableOpacity onPress = {() => onClose(false)}>
                        <Text>Powrót</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
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
})