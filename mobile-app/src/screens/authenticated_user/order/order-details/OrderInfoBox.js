import { View, Text, StyleSheet } from "react-native"

export default function OrderInfoBox({orderData}) {

    const {purchaserEmail, address, orderDate, totalPrice} = orderData;

    return (
        <View style = {styles.orderDetailsContainer}>
                <Text style = {styles.orderDetailsTitle}>Szczegóły zamówienia</Text>
                <Text style = {styles.orderDetailsText}>Zamawiający: {purchaserEmail}</Text>
                <Text style = {styles.orderDetailsText}>Adres dostawy: {address}</Text>
                <Text style = {styles.orderDetailsText}>Data zamówienia: {orderDate}</Text>
                <Text style = {styles.orderDetailsText}>Wartość zamówienia: {totalPrice.toFixed(2)} zł</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    orderDetailsContainer: {
        width: '100%',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 4,
        padding: 10,
        marginBottom: 20
    },
    
    orderDetailsTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 15
    },
    
    orderDetailsText: {
        fontSize: 16,
        color: '#bfbeba',
        marginBottom: 8
    },
})
