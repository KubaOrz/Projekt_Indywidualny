import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function UserForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    // handle form submission logic here
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={name => setName()}
      />
      <TextInput
        placeholder="Surname"
        value={surname}
        onChangeText={surname => setSurname(surname)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        keyboardType="phone-pad"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

