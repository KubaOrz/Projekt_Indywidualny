import { StyleSheet, View, Text } from "react-native"

export default function SupplierOrderSummaryBox({orderData}) {

    function calculateTimeDifference(startDate, endDate) {
        return Math.floor((endDate - startDate) / (1000 * 60));
    }

    const pickUpDate = new Date(orderData.pickUpDate);
    const orderDate = new Date(orderData.orderDate);
    const deliveryDate = new Date(orderData.deliveryDate);

    function Summary() {
        if (orderData.status !== 'ACTIVE') {
            return (
                <View style = {styles.summaryBox}>
                    <Text style = {styles.summaryBoxTitle}>Podsumowanie</Text>
                    <PickUpTime/>
                    <DeliveryTime/>
                </View>
            )
        }
    }

    function PickUpTime() {
        if (orderData.status !== 'IN_PROGRESS') {
            let time = calculateTimeDifference(orderDate, pickUpDate);
            let minuteString;

            if (time === 1) {
                minuteString = "minucie";
            } else {
                minuteString = "minutach";
            }

            return (
                <Text style = {styles.summaryBoxDefaultText}>Podjąłeś zamówienie po 
                    <Text style = {styles.summaryBoxHighlightedText}> {time} {minuteString}.</Text>
                </Text>
            )
        }
    }

    function DeliveryTime() {
        if (orderData.status === 'DELIVERED') {
            let deliveryTime = calculateTimeDifference(pickUpDate, deliveryDate);
            let totalTime = calculateTimeDifference(orderDate, deliveryDate);
            let deliveryMinuteString;
            let totalMinuteString;

            if (deliveryTime === 1) deliveryMinuteString = "minutę";
            else deliveryMinuteString = "minut";

            if (totalTime === 1) totalMinuteString = "minutę";
            else totalMinuteString = "minut";

            return (
                <View>
                    <Text style = {styles.summaryBoxDefaultText}>Dostarczenie zamówienia zajęło ci 
                        <Text style = {styles.summaryBoxHighlightedText}> {deliveryTime} {deliveryMinuteString}.</Text>
                    </Text>
                    <Text style = {styles.summaryBoxDefaultText}>Łączny czas oczekiwania to 
                        <Text style = {styles.summaryBoxHighlightedText}> {totalTime} {totalMinuteString}.</Text>
                    </Text>
                </View>
            )
        }
    }

    return (
        <Summary/>
    )
    
}

const styles = StyleSheet.create({
    summaryBox: {
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        padding: 15
    },

    summaryBoxTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10
    },

    summaryBoxDefaultText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
        textAlign: 'justify'
    },

    summaryBoxHighlightedText: {
        fontSize: 16,
        color: '#C10D49',
        fontWeight: 'bold'
    }
})