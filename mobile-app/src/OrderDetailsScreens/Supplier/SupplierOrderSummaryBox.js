import { StyleSheet, View, Text } from "react-native"
import OrderDetailsStyles from "../../Styles/OrderDetailsStyles";

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
                <View style = {OrderDetailsStyles.summaryBox}>
                    <Text style = {OrderDetailsStyles.summaryBoxTitle}>Podsumowanie</Text>
                    <PickUpTime/>
                    <DeliveryTime/>
                </View>
            )
        }
    }

    function PickUpTime() {
        let time = calculateTimeDifference(orderDate, pickUpDate);
        let minuteString;

        if (time === 1) {
            minuteString = "minucie";
        } else {
            minuteString = "minutach";
        }

        return (
            <Text style = {OrderDetailsStyles.summaryBoxDefaultText}>Podjąłeś zamówienie po 
                <Text style = {OrderDetailsStyles.summaryBoxHighlightedText}> {time} {minuteString}.</Text>
            </Text>
        )
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
                    <Text style = {OrderDetailsStyles.summaryBoxDefaultText}>Dostarczenie zamówienia zajęło ci 
                        <Text style = {OrderDetailsStyles.summaryBoxHighlightedText}> {deliveryTime} {deliveryMinuteString}.</Text>
                    </Text>
                    <Text style = {OrderDetailsStyles.summaryBoxDefaultText}>Łączny czas oczekiwania to 
                        <Text style = {OrderDetailsStyles.summaryBoxHighlightedText}> {totalTime} {totalMinuteString}.</Text>
                    </Text>
                </View>
            )
        }
    }

    return (
        <Summary/>
    )
    
}