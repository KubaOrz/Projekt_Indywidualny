import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Alert({ title, message, onClose, onDecline }) {
    return (
      <Modal animationType="fade" transparent={true}>
          <View style={styles.overlay}>
              <View style={styles.alert}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.message}>{message}</Text>
                  <View style = {styles.buttonContainer}>
                      <TouchableOpacity style={styles.button} onPress={onClose}>
                          <Text style={styles.buttonText}>OK</Text>
                      </TouchableOpacity>
                      {onDecline && 
                          <TouchableOpacity style={styles.button} onPress={onDecline}>
                              <Text style={styles.buttonText}>Anuluj</Text>
                          </TouchableOpacity>
                      }
                  </View>
              </View>
          </View>
      </Modal>
  );
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
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  buttonContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },

  button: {
    backgroundColor: '#C10D49',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 7,
    width: '35%'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
