import { View, Text, StyleSheet } from "react-native"

export default function OrderInfoBox({orderData}) {

    const {status, purchaserEmail, address, orderDate, pickUpDate, deliveryDate, totalPrice} = orderData;

    function formatLocalDateTime(dateTime) {
        const formatter = new Intl.DateTimeFormat('pl', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      
        return formatter.format(dateTime);
      }

    return (
        <View style = {styles.orderDetailsContainer}>
                <Text style = {styles.orderDetailsTitle}>Szczegóły zamówienia</Text>

                <Text style = {styles.orderDetailsText}>
                    <Text style = {styles.orderDetailsBold}>Zamawiający:</Text> {purchaserEmail}
                </Text>

                <Text style = {styles.orderDetailsText}>
                    <Text style = {styles.orderDetailsBold}>Adres dostawy:</Text> {address}
                </Text>

                <Text style = {styles.orderDetailsText}>
                    <Text style = {styles.orderDetailsBold}>Data zamówienia: </Text> {formatLocalDateTime(new Date (orderDate))}
                </Text>

                {status === 'IN_PROGRESS' &&
                    <Text style = {styles.orderDetailsText}>
                        <Text style = {styles.orderDetailsBold}>Data rozpoczęcia:</Text> {formatLocalDateTime(new Date (pickUpDate))}
                    </Text>
                }

                {status === 'DELIVERED' &&
                    <Text style = {styles.orderDetailsText}>
                        <Text style = {styles.orderDetailsBold}>Data dostarczenia:</Text> {formatLocalDateTime(new Date (deliveryDate))}
                    </Text>
                }

                <Text style = {styles.orderDetailsText}>
                    <Text style = {styles.orderDetailsBold}>Wartość zamówienia:</Text> {totalPrice.toFixed(2)} zł
                </Text>
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

    orderDetailsBold: {
        fontSize: 16,
        color: '#bfbeba',
        marginBottom: 8,
        fontWeight: 'bold'
    }
})
