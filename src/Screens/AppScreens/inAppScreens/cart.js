import React from 'react';
import {View, StyleSheet, Text, FlatList, Dimensions, ScrollView, RefreshControl} from 'react-native';
import { useEffect, useState } from 'react';
const axios = require('axios').default;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getCartURI } from '../../../API/api.js';

const Cart = ({route, navigation}) => {
    const [ID, SetID]=useState();
    const [cartData, SetCartData]=useState([]);
    const [Isopen, SetIsopen]= useState(1);
    const [name, setname]= useState([]);

   // const [postData, SetPostData]= useState();
   // const [uid, setUid] = useState("");
    const [finalPrice, setFinalprice]= useState([]);
    const price=0;
    let dataCheck=[];
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
    //const [state, setstate] = (initialState);
    useEffect(() => {
      getId();


  }, []);
//console.log(cartData+"CART DATA")    
//const uid="1";
//console.log(cartData.product.name);
let totalamount=0;

let quantity=[];
    for(let i=0;i<cartData.length;i++)
{

    const val= (cartData[i].product.price)*Isopen

    totalamount= totalamount+val

  }
  
  


const getId = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log(value+"Token recieved");
    if(value !== null) {
      console.log(value+"User Code");
      
          try {
            const value = await AsyncStorage.getItem('uid');
            console.log(value+"id recieved");
            if(value !== null) {
              console.log(value+"User id");
              console.log(value+"integer");
              SetID(value);
              
              try {
                // value previously stored
     
                axios.get('http://10.0.2.2/ecommerce/react-api/getCartApi.php',{
                params: {
                    uid:value
                  }
                })
                .then((response) => {
                  const final=(JSON.stringify(response.data));
                  let userObj = JSON.parse(final);
                  console.log(final+"DATA");
                  
                 /* for (let i = 0; i < this.products.length; i++) {
                        this.products[i].price = 1*this.products[i].price;
                }*/
                  //console.log(final+"RESPONSE CART KA");
                 // let userObj = JSON.parse(final);
                 console.log(response+"cart data");
                  let data=[final];
                  //console.log(data.length+"lenghtttttt")
                  //console.log(JSON.parse(response.data.product)+"DATA");
                  //dataCheck=userObj;
                 // console.log(dataCheck+"Checkout");
                 if(response.data.length>0){
                   SetCartData(response.data);
                   dataCheck(userObj);
                  
                    }else{
                      console.log('No item in cart');
                    }
                   //const data = JSON.parse(final);
                   console.log("get Api ka data");
                   //console.log(data[0].id); // outputs "10"
                   //console.log(data[''].product.name);
                  const success = JSON.stringify(response.data.success);
                  const abc = JSON.stringify(response.data.message);
                if(success==0)
                  {
                      console.log(response.data.message);
      
                  }
                  else
                  {
                      //abc = JSON.stringify(response.data.token);
                     // alert(abc);
                     //SetID(abc);
                      console.log(abc);
                      console.log(final+'lenght');
                  }
                  
              }
                
                )
              
            //  else{
             //   console.log("No token stored")
              //}
              
            } catch {
              console.log("Sorry cant retrieved key");
            }
              //navigation.navigate('HomeScreen');
              // value previously stored
              
            }
            
          } catch(e) {
            console.log("Sorry cant retrieved key"+e);
          }
      
      //navigation.navigate('HomeScreen');
      // value previously stored
      
    }
    
  } catch(e) {
    console.log("Sorry cant retrieved key"+e);
  }
}
console.log('Final Price: '+totalamount)   

          const getData = async () => {
            //setUid(user);
            try {
                // value previously stored
     
                axios.get('http://10.0.2.2/ecommerce/react-api/getCartApi.php',{
                params: {
                    uid:ID
                  }
                })
                .then((response) => {
                  const final=(JSON.stringify(response.data));
                  //console.log(final+"RESPONSE CART KA");
                 // let userObj = JSON.parse(final);
                 console.log(final+"cart data");
                  let data=[final];
                  //console.log(data.length+"lenghtttttt")
                  //console.log(JSON.parse(response.data.product)+"DATA");
                  //dataCheck=userObj;
                 // console.log(dataCheck+"Checkout");
                   SetCartData(response.data);
                   //const data = JSON.parse(final);
                   console.log("get Api ka data");
                   //console.log(data[0].id); // outputs "10"
                   //console.log(data[''].product.name);
                  const success = JSON.stringify(response.data.success);
                  const abc = JSON.stringify(response.data.message);
                if(success==0)
                  {
                      console.log(response.data.message);
      
                  }
                  else
                  {
                      //abc = JSON.stringify(response.data.token);
                     // alert(abc);
                     //SetID(abc);
                      console.log(abc);
                      console.log(final+'lenght');
                  }
                  
              }
                
                )
              
            //  else{
             //   console.log("No token stored")
              //}
              
            } catch {
              console.log("Sorry cant retrieved key");
            }
        }
       

    const renderItem = ({item}) =>{
      return(
        <View style={{elevation:5,width:'95%',marginVertical:5,alignSelf:'center',height:150,borderWidth:0,backgroundColor:'white',borderRadius:25}}>
  
        <View style={{flexDirection:'row', marginTop:5,height:40,flexWrap:'wrap',width:'100%'}}>
           <Image 
               style={{width:100,height:100,backgroundColor:Colors.grey400,borderRadius:10,borderWidth:1}}
               resizeMode='center'
               source={require('../../../../assets/logo.png')} 
           />
           <Text style={{fontSize:15,fontWeight:'bold',width:'60%',textAlign:'left',marginLeft:5,color:'black',height:80}}>{item.product.name}</Text>
           
           </View>
           <View style={{justifyContent:'center',width:'100%'}}>
           <Text style={{color:'blue',textAlign:'right',margin:5,fontSize:20,fontWeight:'bold',paddingRight:25}}>Rs. 
        {Math.round(item.product.price)}
        </Text>
           
           </View>
      <View style={{marginTop:10,flexDirection:'row',width:'95%',justifyContent:'flex-end'}}>
      <Text style={{alignSelf:'center',fontSize:15,width:60}}>Quantity </Text>
      <TouchableOpacity
      style={{backgroundColor:'#26AE60',width:30,height:30,borderRadius:100,alignItems:'center',justifyContent:'space-evenly'}}
      onPress={()=>{
      if(Isopen > 1){
      SetIsopen(Isopen-1);
      // updateQuantity();
      }
      }}
      ><FontAwesome name='minus'
      size={15}
      color='white'
      />
      
      </TouchableOpacity>
      <Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold',width:20,textAlign:'center'}}>{Isopen}</Text>
      <TouchableOpacity
      style={{backgroundColor:'#26AE60',width:30,height:30,borderRadius:100,alignItems:'center',justifyContent:'space-evenly'}}
      onPress={()=>{ 
      SetIsopen(Isopen + 1);
      //updateQuantity();
      }}
      >
      <FontAwesome name='plus'
      size={15}
      color='white'
      />
      </TouchableOpacity>
      </View>
           
       </View>
      )
    }
                      
    
    return (

        <View 
        style={{backgroundColor:Colors.light,width:Dimensions.get('screen').width,height:'100%'}}>
         
           { cartData.length > 0 ? (
            (
              <View style={{height:'90%',backgroundColor:Colors.white,width:Dimensions.get('screen').width}}>
              <FlatList
               showsVerticalScrollIndicator={false}
               //showsHorizontalScrollIndicator={false}
              // maxToRenderPerBatch={2}
               data={cartData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
      </View>
             ) 
           ):
                  (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>No items in cart</Text>
                </View>                    
                      )}
            
              <View style={{borderTopWidth:1,borderColor:Colors.light,bottom:0,flexDirection:'row',alignSelf:'center',position:'absolute',marginHorizontal:5,backgroundColor:'white',height:80,justifyContent:'space-evenly',width:'100%'}}>
               <Text style={{textAlign:'left',alignSelf:'center',fontSize:20,fontWeight:'bold',color:'blue'}}>Total Price ${Math.round(totalamount)}</Text>
                <TouchableOpacity 
                
                onPress={()=>{
                 // navigation.navigate('CheckOut',{total:totalamount},{data:dataCheck});
                 navigation.navigate('Payment',{data:cartData, total: totalamount, uid:ID})
                }}
                style={{elevation:2.5,borderRadius:10,width:150 ,height:50,alignSelf:'center',justifyContent:'center',marginRight:0,backgroundColor:'green'}}>
                    
                    <Text style={{fontWeight:'bold',fontSize:20,color:Colors.white,textAlign:'center',alignSelf:'center'}}>
                         Check Out
                    </Text>
                    
                </TouchableOpacity>
                </View>

            </View>            
  
        
        
    );
}

const styles = StyleSheet.create({})

export default Cart;
