import { Button, StyleSheet, Text, View} from 'react-native'
import React from 'react'

const Home = ({navigation,route}) => {
  const id = route.params.id
 
 const profileUser =()=>{

  navigation.navigate("profile",{
    id:id
  });

}
 
 
 
  return (


    <View>
      <Text style= {{color:'red',fontSize:30,textAlign:'center'}}>Hello wellcome</Text>
    
    <View style={{marginTop:80,paddingHorizontal:50}}>
    
     <Button title='Profile' onPress={profileUser}></Button>
     </View>
   
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})

