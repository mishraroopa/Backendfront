import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput } from 'react-native';
import axios from 'axios';

const Profile = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [username, setUsername] = useState('');
  const [emailid, setEmailid] = useState('');

  const id = route.params.id;

  const updateuser = (userData) => {
    setShowModal(true);
    setSelectedUser(userData);
    setUsername(userData.username);
    setEmailid(userData.emailid);
  };

  useEffect(() => {
    axios.get(`http://192.168.249.121:2345/profile/${id}`)
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
    console.log('Updated email:', emailid);
    
    fetch(`http://192.168.249.121:2345/update/${id}`, {
      method: 'PUT',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      username: username,
      emailid: emailid,
      }),
      });  };

  return (
    <View>
      {userData && (
        <View>
          <Text style={{ color: 'black', fontSize: 20 }}>{userData.username}</Text>
          <Text style={{ color: 'black' }}>{userData.emailid}</Text>
          <View style={{ paddingHorizontal: 150 }}>
            <Button title='Update' onPress={() => updateuser(userData)} />
          </View>
          <Modal visible={showModal} transparent={true}>
            <UserModal
              setShowModal={setShowModal}
              selectedUser={selectedUser}
              setUsername={setUsername}
              setEmailid={setEmailid}
              username={username}
              emailid={emailid}
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
          onChangeText={(text) => props.setEmailid(text)}
          value={props.emailid}
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
