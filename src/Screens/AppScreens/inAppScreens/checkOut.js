import React, { useState } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, Image, Alert} from 'react-native';
import { ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FlatList } from 'react-native';
import axios from 'axios';


const CheckOut = ({route, navigation}) => {
  const [Total, setTotal] = useState()
  const {data, total, uid}=route.params;
  //const {total}=route.params;
  const Data=JSON.stringify(data);
  console.log(uid+'ID');
  let product=[];

  for(let i=0;i<data.length;i++)
  {

      const val= (data[i].product_id);
      const val1= (data[i].quantity);

// productId[i]=val;
      product[i] =  {
          product_id: val,
          quantity: val1
      };
    
  }
  const PostData = {
    user_id: uid,
    pay_id:'1234567898765345',
    delivery_charges:100,
    total_price:total+100,
    product: product,
    status:'Pending',
    address:"City Campus KIET",
    other_info:"No Other Info",
    lat:"37.89876",
    long:"-196.986687",

  };
  console.log(PostData.product+'POSTDATA')
  const OrderSubmit=()=>{
    console.log(JSON.stringify(PostData)+"DATAPOST")
    axios({
      method:'Post',
      url:'http://10.0.2.2/ecommerce/react-api/ordersApi.php',
      data:PostData,
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
         // Authorization: "Bearer "+ID
      }
    })
    .then((response) => {
      const success = JSON.stringify(response.data.success);
      const cartQuant = JSON.stringify(response.data);
      console.log(cartQuant+'ORDER RES')
    if(success==0)
      {
          console.log(response.data.message);

      }
      else
      {
          //abc = JSON.stringify(response.data.token);
          console.log(cartQuant+"Update Cart REs");
          Alert.alert('Order Placed..!')
         //SetID(abc);
          //console.log(abc);

      }
      
  }
    
    )
  }
  
  console.log(Data+"check Dqata");
  console.log(total)
  return (
    <View style={{width:Dimensions.get('screen').width,height:'100%'}}>
    <ScrollView style={{height:Dimensions.get('window').height}}>
        <View style={{width:Dimensions.get('window').width,margin:5}}>
        <View style={{margin:5,width:Dimensions.get('window').width/1.05,height:Dimensions.get('window').width/3,backgroundColor:Colors.white}}>
            <Text style={{margin:2,fontSize:15,fontWeight:'bold'}}>Shipping Address</Text>
            <FontAwesome 
            style={{margin:5,alignSelf:'flex-end'}}
            name='edit' size={25}/>
            <Text style={{fontSize:15,fontWeight:'bold',margin:5,alignItems:'center',width:'90%',height:25,borderBottomWidth:1,borderBottomColor:'grey'}}>Address Type</Text>
            <Text style={{fontSize:12,margin:5}}>Select Address</Text>
        </View>
        <View style={{margin:5,width:Dimensions.get('window').width/1.05,height:Dimensions.get('window').width/3,backgroundColor:Colors.white}}>
            <Text style={{margin:2,fontSize:15,fontWeight:'bold'}}>Billing Address</Text>
            <FontAwesome 
            style={{margin:5,alignSelf:'flex-end'}}
            name='edit' size={25}/>
            <Text style={{fontSize:15,fontWeight:'bold',margin:5,alignItems:'center',width:'90%',height:25,borderBottomWidth:1,borderBottomColor:'grey'}}>Address Type</Text>
            <Text style={{fontSize:12,margin:5}}>Select Address</Text>
        </View>
        </View>
        <View>
        <View style={{marginBottom:5,width:Dimensions.get('window').width,height:Dimensions.get('window').width/2,backgroundColor:Colors.white}}>
            <Text style={{marginLeft:10,fontSize:20,fontWeight:'bold',textAlign:'left'}}>Order Details</Text>
            <View style={{width:'100%'}}>
                <FlatList data={data}
                style={{paddingLeft:10,width:'90%',height:100,flexDirection:'row'}}
                scrollEnabled={true}
           //keyExtractor={(item, index) => index + item.value}
           renderItem={({item})=>{
                  console.log(item+"Flatlist");  
               return(
                <View style={{width:'80%',alignSelf:'center',height:40,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Image
                    style={{width:20,height:20}}
                    source={{uri:'http://10.0.2.2/ecommerce/images/'+item.product.photo}}
                    />
                <Text style={{fontSize:15,fontWeight:'bold'}}>{'\t\t'}{item.product.name}{'\t\t'}</Text>
                <Text style={{fontSize:15, fontWeight:'bold'}}>{item.product.price}</Text>
                </View>
                )}}/>
            </View>

        </View>
        
        <View style={{marginBottom:5,width:Dimensions.get('window').width,height:Dimensions.get('window').width/2.5,backgroundColor:Colors.white}}>
            
            <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>Order Summary</Text>
            <View style={{margin:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Sub Total: </Text>
            <Text style={{textAlign:'right',fontSize:14,fontWeight:'bold',paddingRight:20}}>Rs. {total}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Shipping Fee: 100 </Text>
            
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Discount: No </Text>
            
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Coupon & Voucher: No </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Tax: 0 </Text>
            
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:12,textAlign:'left',borderTopWidth:1,width:'90%'}}>Total Payable:</Text>
            <Text style={{textAlign:'right',fontSize:12,fontWeight:'bold'}}>Rs. {total+100}</Text>
            </View>
            </View>
        </View>
        <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').width/2,backgroundColor:Colors.white}}>
            
            <Text style={{margin:10,fontSize:15,fontWeight:'bold',textAlign:'left'}}>Payment Method</Text>
            <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-evenly'}}>
                <Text style={{fontSize:10}}>Cash On Delivery</Text>
                <Text style={{fontSize:10}}>Online Transaction</Text>
            </View>
        </View>
</View>
    </ScrollView>
    <View style={{position:'absolute',width:Dimensions.get('window').width,height:80,bottom:1,justifyContent:'center',alignContent:'center',backgroundColor:Colors.white}}>
        <TouchableOpacity 
        onPress={()=>{OrderSubmit();}}
        style={{alignSelf:'center',width:Dimensions.get('window').width/1.1,borderRadius:10,backgroundColor:'#26AE60',height:50,justifyContent:'center'}}>
            <Text style={{fontSize:25,color:'white',textAlign:'center'}}>Proceed</Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}

export default CheckOut