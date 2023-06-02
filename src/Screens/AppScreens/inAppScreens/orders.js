import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getOrders } from '../../../API/api';
const axios = require('axios').default;
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StyleSheet,FlatList, Dimensions, ScrollView, RefreshControl, Image} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

const MyOrders=()=> {
  const [Data, setData] = useState([]);
  useEffect(() => {
    getActiveOrders();
  }, [])
  
  //Get All the Active Orders and Set their data
  const getActiveOrders= async()=>{
    try {
      const value = await AsyncStorage.getItem('uid');
      console.log(value+"id recieved");
      if(value !== null) {
        console.log(value+"User id");
        //console.log(value+"integer");
       // SetID(value);
        
        try {
          // value previously stored
          axios({
            method:'GET',
            url:getOrders,
            params: {
              'user_id':value,
              'status':'Pending'
            },
          }).then((response)=>{
            console.log( JSON.stringify(response.data)+"Active Orders");
            setData(response.data)
          }).catch(e=>console.log(e))
            
        
          
          
        
      //  else{
       //   console.log("No token stored")
        //}
        
      } catch {
        console.log("Api error");
      }
        //navigation.navigate('HomeScreen');
        // value previously stored
        
      }
      
    } catch(e) {
      console.log("Sorry cant retrieved key"+e);
    }
    
  }
  const renderItem = ({item}) =>{
    return(
      <View style={{elevation:5,width:'95%',marginVertical:5,alignSelf:'center',height:100,borderWidth:0,backgroundColor:'white',borderRadius:25}}>

      <View style={{flexDirection:'row', marginTop:5,height:40,flexWrap:'wrap',width:'100%'}}>
         <Image 
             style={{width:100,height:100,backgroundColor:Colors.grey400,borderRadius:10,borderWidth:1}}
             resizeMode='center'
             source={require('../../../../assets/logo.png')} 
         />
         {item.product_name !=0  ?
         <Text style={{fontSize:15,fontWeight:'bold',width:'60%',textAlign:'left',marginLeft:5,color:'black',height:80}}>{item.product_name}</Text>
  : null
        }
         </View>
         <View style={{justifyContent:'center',width:'100%'}}>
         <Text style={{color:'blue',textAlign:'right',margin:5,fontSize:20,fontWeight:'bold',paddingRight:25}}>Rs. 
      {Math.round(item.total)}
      </Text>
         
         </View>
    <View style={{marginTop:10,flexDirection:'row',width:'95%',justifyContent:'flex-end'}}>
    <Text style={{alignSelf:'center',fontSize:15,width:60}}>Quantity {item.quantity} </Text>
   
    </View>
         
     </View>
    )
  }
  return (
    <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'white',alignItems:'center',alignSelf:'center'}} >
       <View style={{width:'95%',height:'100%',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
       <FlatList
               showsVerticalScrollIndicator={false}
               //showsHorizontalScrollIndicator={false}
              // maxToRenderPerBatch={2}
               data={Data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
</View>
        </View>            
  );
}
const History=()=> {
  useEffect(() => {
    getCompletedOrders();
  }, [])
  
  //Get Details of Complete Details of Recieved and Delivered Orders 
  const getCompletedOrders= async()=>{
    try {
      const value = await AsyncStorage.getItem('uid');
      console.log(value+"id recieved");
      if(value !== null) {
        console.log(value+"User id");
        //console.log(value+"integer");
       // SetID(value);
        
        try {
          // value previously stored
          axios({
            method:'Get',
            url: getOrders,
            params:{
              user_id:value,
              status:'Delivered'
              
            },
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                //'authorization':value
            }
          }).then((response)=>{
            console.log(JSON.stringify(response.data)+"Delivered Orders");
          }).catch(e=>console.log(e))
            
        
          
          
        
      //  else{
       //   console.log("No token stored")
        //}
        
      } catch {
        console.log("Api error");
      }
        //navigation.navigate('HomeScreen');
        // value previously stored
        
      }
      
    } catch(e) {
      console.log("Sorry cant retrieved key"+e);
    }
    
  }
  return (
    <View 
        
    style={{backgroundColor:Colors.white,width:Dimensions.get('screen').width,height:'100%'}}>
      
        </View>            

    
    

  );
}
const Orders = () => {
  return (
    <Tab.Navigator>
    <Tab.Screen name="MyOrders" component={MyOrders} options={{title:'Active Orders'}}/>
    <Tab.Screen name="History" component={History} options={{title:'History'}}/>
  </Tab.Navigator>
  )
}

export default Orders;