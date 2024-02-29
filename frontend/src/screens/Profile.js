import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Profile = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();
 
 
  const id = route.params.id;

  const login =()=>{
    navigation.navigate('Login')
  }

  const updateuser = (userData) => {
    setShowModal(true);
    setSelectedUser(userData);
    setUsername(userData.username);
    setEmail(userData.email);
  };

  useEffect(() => {
    axios.get(`http://192.168.1.105:2345/profile/${id}`)
      .then((response) => {
        setUserData(response.data);
        console.log('data', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleUpdate = async () => {
    console.log('Updated username:', username);
    console.log('Updated email:', email);
    
    fetch(`http://192.168.1.105:2345/update/${id}`, {
      method: 'PUT',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      username: username,
      email: email,
      }),
      });  };

  return (
    <View>
      {userData && (
        <View>
          <Text style={{ color: 'black', fontSize: 20 }}>{userData.username}</Text>
          <Text style={{ color: 'black' }}>{userData.email}</Text>
          <View style={{ paddingHorizontal: 150 , flexDirection:'row',gap:20}}>
            <Button title='Update' onPress={() => updateuser(userData)} />
            <Button title= 'Logout' onPress={login} />
          </View>
          <Modal visible={showModal} transparent={true}>
            <UserModal
              setShowModal={setShowModal}
              selectedUser={selectedUser}
              setUsername={setUsername}
              setEmail={setEmail}
              username={username}
              email={email}
              handleUpdate={handleUpdate}
            />
          </Modal>
        </View>
      )}
    </View>
  );
};

const UserModal = (props) => {
  const userUpdate = () => {
    props.handleUpdate();
    props.setShowModal(false);
  };

  return (
    <View style={styles.modalview}>
      <View style={styles.modal}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 2, margin: 10 }}
          onChangeText={(text) => props.setUsername(text)}
          value={props.username}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
          onChangeText={(text) => props.setEmail(text)}
          value={props.email}
        />
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <Button title='Update' onPress={userUpdate}  />
          <Button title='Close' onPress={() => props.setShowModal(false) } />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#d6708b',
    padding: 70,
    borderRadius: 10,
    paddingHorizontal: 100,
  },
});

export default Profile;
