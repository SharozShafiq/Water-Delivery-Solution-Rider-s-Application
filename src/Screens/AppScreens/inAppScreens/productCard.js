import React from 'react';
import {View, Text,StyleSheet, Dimensions, TouchableOpacity,FlatList, TouchableWithoutFeedback, ScrollView, SafeAreaView, ImageBackground} from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BottomSheet } from 'react-native-btr';
import { Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RenderHtml from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cartURI } from '../../../API/api';
//import Cart from './cart';
//import { LinearGradient } from 'expo-linear-gradient';

//import GetSize from '../getSize';
//import * as cartSize from '../getSize';
const axios = require('axios').default;


const ProductCard = ({route, navigation}) => {
    const [imgActive, setImgActive]=useState([]);
    const {products}=route.params;
    const [ID, SetID]=useState();
    const [image,setImage]=useState([]);
    const [qtyStatus, setQtyStatus] = useState(false);    
    const [cartItems, setCartItems] = useState([]);
    //console.log(proId.id+"ProductsImageId")
   console.log(products);
   // const imageparse=JSON.parse(imagePro);
   // setImage(proId.images);
    //console.log();
    const eff=({nativeEvent})=>{
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if(slide != imgActive){
                setImgActive(slide);
                console.log("if if mein native event")
            }
        }

      }
useEffect(() => {
  getId();
}, [])

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
                    SetID(value)
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
    
     //   const sheetRef = useRef<BottomSheet>(null);
      //const [isOpen, setIsOpen] = useState(true);
      //const snapPoints=["40","60","80"];
      
      const [visible, setVisible] = useState(false);
      const [Isopen, SetIsopen]= useState(1);
 
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  const source = {
    html: products.description
  };


  const {qty}=route.params;
  //const {ProId}=route.params;
  const [CartSize, setCartSize] = useState();
  //const [state, setstate] = (initialState);
console.log(ID+'Token');    
 
  //const value = AsyncStorage.getItem('token')
  const {cartPrice}=route.params;
  
  console.log(qty, cartPrice);
  //console.log(ProId);
    //console.log("DATA MEIN AYA"+ID);
    let cartitem=[];
    cartitem=products;
    var userId=parseInt(ID)
    console.log(userId+'USER')
    const postData = {
      user_id:ID,
      products: [
        {
          product_id: products.id,
          quantity: Isopen
        },
      ]
    };
        const getData = async () => {

      console.log(ID+'getdata id')
          try {
           // const value = await AsyncStorage.getItem('token');
            //const token=JSON.parse(value)
           // if(value !== null) {
              
            //  console.log(value+" retrieved from get data");
              
             //SetID(token);
              // value previously stored
 
 console.log(JSON.stringify( cartitem.id)+"cartitems")
              axios({
                method:'Post',
                url: cartURI,
                data:postData,
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    //Authorization: "Bearer "+token
                }
              })
              .then((response) => {
                const success = JSON.stringify(response.data.success);
                const abc = JSON.stringify(response.data.message);
                console.log(response.data);
                const final=(response, JSON.stringify(response.data));
                      //console.log(final+"RESPONSE CART KA");
                      let userObj = JSON.parse(final);
                console.log(final+"DATACARTKA");
              if(success==0)
                {
                    console.log(response.data.message);
    
                }
                else
                {
                    //abc = JSON.stringify(response.data.token);
                   
                    alert("Item Added to cart");
                    /*axios({
                      method:'Get',
                      url: cartURI,
                      data:{
                         
                      },
                      headers:{
                          'Accept':'application/json',
                          'Content-Type':'application/json',
                          // Authorization: "Bearer "+token
                      }
                    })
                    .then((response) => {
                      const final=(response, JSON.stringify(response.data));
                      //console.log(final+"RESPONSE CART KA");
                      let userObj = JSON.parse(final);
                      
            
                       setCartSize(userObj.length);
                       console.log(userObj+"DATACARTKA");
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
                          console.log(abc+"CARTSIZEKAMESSAGE");
            
                      }
                      
                  }
                    
                    )*/
                   //SetID(abc);
                    //console.log(abc);
    
                }
                
            }
              
              )
           // }
           // else{
             // console.log("No token stored")
           // }
            
          } catch {
            console.log("Sorry cant retrieved key");
          }
      }
      const getCartSize=async()=>{

          try {
            const value = await AsyncStorage.getItem('token');
            const token=JSON.parse(value);
            if(value !== null) {
              
              console.log(value+" retrieved from get data");
              
              //SetID(token);
              // value previously stored
              
              
            }
            else{
              console.log("No token stored")
            }
            
          } catch {
            console.log("Sorry cant retrieved key");
          }
      }
      
      useEffect(() => {
        //getCartSize();
      }, []);
    return (
            <View style={{backgroundColor:Colors.white}}>
              <View style={{height:Dimensions.get('screen').width*1.6}}>
        <View style={{height:Dimensions.get('window').width/1.25}}>    
            <FlatList
            data={products.photo}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={eff}
            renderItem={({item})=>{
               // console.log(constant.procard+item+"FINAL");
                return(
               
               <View>
                        <ImageBackground
                            
                            style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').width/1.5,alignContent:'center'}}
                            resizeMode='stretch'
                               source={require('../../../../assets/logo.png')}
                                         
                        />                              
                    </View>
              
                )
            }}
           
            />
            
            <View style={styles.dotView}>
             {//products.images.map((e, index)=>
                //            <FontAwesome
                  //              key={index}
                    //            name="circle"                
                      //          style={imgActive == index ? styles.dotActive : styles.BanDot}
                        //        size={10}
                          // />  
                        //)
                      }
            </View>
            </View>
            <View>
            <ScrollView  
                showsVerticalScrollIndicator={false}
            style={{marginHorizontal:5,height:Dimensions.get('screen').width/1.25}}>
            <View style={{backgroundColor:Colors.white,margin:5,flexDirection:'row'}}>
                    <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',width:Dimensions.get('screen').width/1.2}}>{products.name}</Text>

                
                
                <Text style={{flex:1,flexDirection:'row',alignSelf:'flex-start',textAlign:'right',color:'red',marginTop:2,fontSize:15,fontWeight:'bold'}}>
              
              
              {products.price}    
                </Text>
                          </View>
            
                <View style={{marginTop:5,marginBottom:5,backgroundColor:Colors.white}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Details: </Text>
                    
                    <RenderHtml source={source}
                      contentWidth={Dimensions.get('window').width}
                      
                    />
                </View>
                </ScrollView>
                </View>
                </View>
            <View style={{justifyContent:'center',position:'relative',alignContent:'center',backgroundColor:'white',height:100,bottom:0}}>
            
                <TouchableOpacity 
                style={{backgroundColor:'#0A6376',borderWidth:0,borderRadius:10,width:Dimensions.get('screen').width/1.1 ,height:50,alignSelf:'center',alignContent:'center',alignItems:'center',justifyContent:'center',marginRight:0,elevation:5}}
                onPress={toggleBottomNavigationView}
                >
                    
                    <Text style={{fontWeight:'bold',fontSize:20,color:Colors.white,textAlign:'center',alignSelf:'center'}}>
                        Add to Cart
                    </Text>
                    
                </TouchableOpacity>
            
            
            </View>
            <View>
        <BottomSheet
        
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state
          onBackdropPress={toggleBottomNavigationView}
          
          //Toggling the visibility state
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
  
                justifyContent: 'space-between',
              }}>
                <View style={{flexDirection:'row',margin:10}}>
                <View>
                <FlatList
            data={products.photo.slice(0,1)}
            horizontal={true}
            pagingEnabled={true}
//            onScroll={eff}
            renderItem={({item})=>{
               // console.log(constant.procard+item+"FINAL");
                return(
               
               <View style={{width:80,height:80}}>
                        <Image 
                            
                            style={{borderRadius:10,backgroundColor:Colors.white,width:80,height:80}}
                            resizeMode='stretch'
                               source={require('../../../../assets/logo.png')}
                            
                            
                        />                              
                    </View>
                    
                    
        
                )
            }}
           
            />
            </View>
              <Text
                style={{
                    marginLeft:10,
                  alignSelf:'flex-start',
                  textAlign:'left',
                  //fontWeight:'bold',
                  width:Dimensions.get('screen').width/1.5,
                  fontSize: 20,
                  //flexDirection:'row'
                }}>
                {products.name}
              </Text>
              
              </View>
              <View style={{margin:10,flexDirection:'row',}}>
              <Text style={{color:Colors.grey,fontSize:15,textAlign:'left',alignSelf:'center'}}>Retail Price: {
                    <Text style={{textDecorationStyle: 'solid', color:'black',fontWeight:'bold'}}>${Math.round(products.price)}</Text>
                           
                    }</Text>
              </View> 
              <View style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:18,width:80}}>Quantity</Text>
                <TouchableOpacity
                  style={{ backgroundColor:'#0A6376',width:30,height:30,borderRadius:100,alignItems:'center',justifyContent:'space-evenly'}}
                  onPress={()=>{
                    if(Isopen > 1){
                      SetIsopen(Isopen-1);
                    
                    }

                  }}
                ><FontAwesome name='minus'
                size={18}
                color='white'
                />
                
                </TouchableOpacity>
                <Text style={{fontSize:25,fontWeight:'bold',width:40,textAlign:'center'}}>{Isopen}</Text>
                <TouchableOpacity
                    style={{backgroundColor:'#0A6376',width:30,height:30,borderRadius:100,alignItems:'center',justifyContent:'space-evenly'}}
                  onPress={()=>{ 
                    SetIsopen(Isopen + 1);
                   
                  }}
                  
                >
                <FontAwesome name='plus'
                size={18}
                color='white'
                />
                </TouchableOpacity>
              </View>
              <View style={{height:50,justifyContent:'center'}}>
                <Text style={{fontSize:20,fontWeight:'bold',width:'100%',textAlign:'center'}}>Final Price:  
                { <Text style={{color:'blue'}}> $ {Isopen*Math.round(products.price)}</Text>}</Text>
              </View>
                <View style={{bottom:1,flexDirection:'row',justifyContent:'space-evenly',width:'100%',marginBottom:10}}>
              <TouchableOpacity style={{elevation:2.5,flexDirection:'row',alignItems:'center', width:180,height:50,backgroundColor:'#0A6376',borderRadius:10,justifyContent:'space-evenly'}}>
                  <FontAwesome name='shopping-cart'
                      size={25}
                      color='white'
                
                  />
                  <Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold',color:'white'}}>Buy Now</Text>
              
                </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>{
                  getData();
                  
                  //navigation.navigate('Cart',{cartPrice:Isopen * Math.round(proId.unit_price-(proId.unit_price/100)*proId.discount)
              
              //, qty:Isopen, ProId: proId.id})
            }}
              style={{elevation:2.5,flexDirection:'row',width:180,height:50,backgroundColor:'#0A6376',borderRadius:10,alignItems:"center",justifyContent:'space-evenly'}}>
              
              
                
              <FontAwesome name='cart-plus'
                size={25}
                color='white'
                
                />

                <Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold',color:'white'}}>Add To Cart</Text>
              
              </TouchableOpacity>
              
              </View>
            </View>
          </View>
        </BottomSheet>
            </View>
            </View>
        
        
    );
}

const styles = StyleSheet.create({
  dotView:{
    position:'absolute',
    flexDirection:'row',
    bottom:0,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:'center',
    flex:1
},
    dotActive:{
        //marginTop:3,
        color:'#26AE60',
        position:'relative',
        margin:2
        //marginBottom:2,
    },
    BanDot:{
        margin:3,
        color:'grey'
    },
    bottomNavigationView: {
    
        backgroundColor: Colors.white,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        width: '100%',
        height: Dimensions.get('window').width/1.25,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap:'wrap'
      },
})

export default ProductCard;
