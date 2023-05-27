import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
        backgroundColor: '#8232B9',
        flex: 1
    },

    container: {
        padding: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    defaultButton: {
        backgroundColor: '#C10D49',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 50,
        borderColor: 'white',
        borderWidth: 2,
        paddingHorizontal: 20,
        marginTop: 20
    },

    textInput: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'white',
        width: '80%',
        padding: 5,
        marginBottom: 8,
        color: 'white',
    },

    defaultText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    errorText: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#CC0000',
        width: '80%'
    }
});