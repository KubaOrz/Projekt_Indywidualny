import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderListItem = ({ order }) => {
    const { id, purchaserEmail, orderDate, address, status, totalPrice } = order;

    function getStatusIcon() {
        switch (status) {
            case 'ACTIVE':
                return <Icon name="clipboard-list-outline" size={40} color="#f5ce42" />;
            case 'IN_PROGRESS':
                return <Icon name="clipboard-text-clock-outline" size={40} color="green" />;
        }
    };

    function getStatusText() {
        switch(status) {
            case 'ACTIVE':
                return 'Niepodjęte';
            case 'IN_PROGRESS':
                return 'W trakcie realizacji'
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress = {() => console.log("Szczegóły zamówienia")}>
            <View style={styles.iconContainer}>{getStatusIcon()}</View>
            <View style={styles.infoContainer}>
                <Text style={styles.statusText}>{getStatusText()}</Text>
                <Text style={styles.detailsText}>Do zapłaty: {totalPrice} zł</Text>
                <Text style={styles.detailsText}>{address}</Text>
                <Text style={styles.detailsText}>{orderDate}</Text>
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
