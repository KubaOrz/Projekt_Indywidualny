import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 20,
        backgroundColor: '#8232B9',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%'
    },

    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    },

    body: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },

    orderDetailsContainer: {
        width: '100%',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 4,
        marginBottom: 20
    },

    infoBoxItem: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingLeft: 10,
        paddingRight: 10
    },

    infoBoxItemRight: {
        flex: 1
    },
    
    orderDetailsTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#3b3e42',
        backgroundColor: 'white',
        textAlign: 'center',
        marginBottom: 15,
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    
    orderDetailsText: {
        fontSize: 16,
        color: '#bfbeba',
    },

    orderDetailsHeader: {
        fontSize: 16,
        color: '#bfbeba',
        marginBottom: 8,
        fontWeight: 'bold',
        flex: 1
    },

    button: {
        backgroundColor: 'white',
        borderRadius: 8,
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginBottom: 20
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3b3e42',
        flex: 4
    }
});
