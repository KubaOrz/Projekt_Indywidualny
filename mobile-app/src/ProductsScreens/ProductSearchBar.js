import { TextInput, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useRef } from "react";

export default function ProductSearchBar(props) {

    var searchText = useRef("");

    return (
        <View style = {styles.container}>
            <TextInput 
                placeholder = {'Wyszukaj produkt'}
                onChangeText = {text => searchText.current = text}
                style = {styles.searchBar}
            />
            <TouchableOpacity
                style = {styles.searchButton}
                onPress = {() => props.search('/products/search?name=' + searchText.current)}
            >
                <Text>Szukaj</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
    },

    searchBar: {
        flex: 5,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: 'white',
        padding: 4
    },

    searchButton: {
        flex: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftColor: 'black',
        borderLeftWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});