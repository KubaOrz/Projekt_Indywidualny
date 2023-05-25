import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatLocalDateTime } from '../UniversalComponents/DateFormatter';

const OrderListItem = ({ order, navigation, displayType }) => {
    const { id, purchaserEmail, orderDate, pickUpDate, deliveryDate, address, status, totalPrice } = order;

    function getStatusIcon() {
        switch (status) {
            case 'ACTIVE':
                return <Icon name="clipboard-list-outline" size={50} color="red" />;
            case 'IN_PROGRESS':
                return <Icon name="clipboard-text-clock-outline" size={50} color="#ebc323" />;
            case 'DELIVERED':
                return <Icon name="home-import-outline" size={50} color="green" />;
        }
    };

    function getStatusText() {
        switch(status) {
            case 'ACTIVE':
                return 'Niepodjęte';
            case 'IN_PROGRESS':
                return 'W trakcie realizacji';
            case 'DELIVERED':
                return 'Dostarczone';
        }
    }

    function PurchaserEmail() {
        if (displayType === 'SUPPLIER') {
            return (
                <Text style={styles.detailsText}>Zamawiający: {purchaserEmail}</Text>
            )
        } else return null;
    }

    function FormattedDate() {
        switch(status) {
            case 'ACTIVE':
                return (
                    <Text style={styles.detailsText}>Złożono: {formatLocalDateTime(new Date(orderDate))}</Text>
                )
            case 'IN_PROGRESS':
                return (
                    <Text style={styles.detailsText}>Podjęto: {formatLocalDateTime(new Date(pickUpDate))}</Text>
                )
            case 'DELIVERED':
                return (
                    <Text style={styles.detailsText}>Dostarczono: {formatLocalDateTime(new Date(deliveryDate))}</Text>
                )
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress = {() => navigation.navigate('OrderDetails', {id: id})}>
            <View style={styles.iconContainer}>{getStatusIcon()}</View>
            <View style={styles.infoContainer}>
                <Text style={styles.statusText}>{getStatusText()}</Text>
                <PurchaserEmail/>
                <Text style={styles.detailsText}>Do zapłaty: {totalPrice.toFixed(2)} zł</Text>
                <Text style={styles.detailsText}>{address}</Text>
                <FormattedDate/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 12,
        marginBottom: 15,
        padding: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6
    },

  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  infoContainer: {
    flex: 4,
    justifyContent: 'center',
  },

  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  detailsText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 2,
  },
  
});

export default OrderListItem;
