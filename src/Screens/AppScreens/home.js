import { View, Text, TouchableOpacity, Dimensions, Button, StyleSheet, TextInput, ScrollView, FlatList, Image, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import React from 'react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import {PermissionsAndroid} from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import axios from 'axios';
export const axios = require('axios').default;
import { Colors } from 'react-native/Libraries/NewAppScreen';
//const reference=database().ref('./riderApp/location'); //change config acc to your's
//import axios from 'axios';
import { getCategory, getProducts, } from '../../API/api';
export default function Home({navigation,route}) {
  const [Pro, setPro] = useState([]);
  const [Cate, setCate] = useState([]);
  useEffect(() => {
   // getBanner();
    ProList();
    Categories();

  }, [],[])
  const Categories=()=>{
    try{
      console.log("try mein");
    axios.get(getCategory)//https://sm.hyperkodes.co.za/storage/app/public/category/2022-06-02-62986f048111d.png
        .then(response => {
            const final=(JSON.stringify(response.data.data));

            console.log("api hit"+final);
            const abc = JSON.stringify(response);
            
            //const static_res='{"success":1,"status":201,"data":[{"St_ID":"10324","full_name":"HASAN","Depart_Name":"CS","CGPA":"3","Status":""}]}';
            let userObj = JSON.parse(final);
            console.log(userObj);
            //console.log(final);
             setCate(userObj);
             
            const success = JSON.stringify(response.data.success);
            const dis=(response, JSON.stringify(response.data.products.unit_price));
            const diss=(response, JSON.stringify(response.data.products.discount));
       // console.log(dis+"Dis Price")
         //   let fp=dis/100*diss
          //  setDisp(fp)
          if(success==0)
            {
                
                console.log(response.data.message);
              //  console.log(token);
            } 
            else{
                console.log(final);
            }
 }).catch(error => console.log(error));
 }catch{
  console.log("not trying");
 }
  };
  const ProList=()=>{
    try{
     // console.log("try mein");
    axios.get(getProducts)//https://sm.hyperkodes.co.za/storage/app/public/category/2022-06-02-62986f048111d.png
        .then(response => {
            const final=(JSON.stringify(response.data.data));

            console.log(final);
            const abc = JSON.stringify(response);
            
            //const static_res='{"success":1,"status":201,"data":[{"St_ID":"10324","full_name":"HASAN","Depart_Name":"CS","CGPA":"3","Status":""}]}';
            let userObj = JSON.parse(final);
           // console.log(userObj);
            //console.log(final);
             setPro(userObj);
             
            const success = JSON.stringify(response.data.success);
            const dis=(response, JSON.stringify(response.data.products.unit_price));
            const diss=(response, JSON.stringify(response.data.products.discount));
       // console.log(dis+"Dis Price")
         //   let fp=dis/100*diss
          //  setDisp(fp)
          if(success==0)
            {
                
             //   console.log(response.data.message);
              //  console.log(token);
            } 
            else{
               // console.log(final);
            }
 }).catch(error => console.log(error));
 }catch{
  console.log("not trying");
 }
  }
const getBanner=()=>{
  axios.get('http://10.0.2.2/ecommerce/images/')//https://sm.hyperkodes.co.za/storage/app/public/category/2022-06-02-62986f048111d.png
        .then(response => {
            const final=(JSON.stringify(response.data));

            console.log("banner hit"+final);
            const abc = JSON.stringify(response);
            
            //const static_res='{"success":1,"status":201,"data":[{"St_ID":"10324","full_name":"HASAN","Depart_Name":"CS","CGPA":"3","Status":""}]}';
            let userObj = JSON.parse(final);
            console.log(userObj);
            //console.log(final);
             //setImg();
             
            const success = JSON.stringify(response.data.success);
            const dis=(response, JSON.stringify(response.data.products.unit_price));
            const diss=(response, JSON.stringify(response.data.products.discount));
       // console.log(dis+"Dis Price")
         //   let fp=dis/100*diss
          //  setDisp(fp)
          
 }).catch(error => console.log(error));
}
  
  
  
  return (

    <View style={styles.mainContaier}>
      
              <View style={styles.inpStyle}>
                <FontAwesome
                    name="search"
                    color="white"
                    size={20}
                />
                <TextInput 
                    style={styles.textIn}    
                    placeholder="Search Products"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    autoCorrect={false}
            
                />
            </View>
            <ScrollView scrollEnabled={true} style={{marginTop:10,marginBottom:10,height:undefined, marginBottom:20,width:'100%',alignSelf:'center'}}
            showsVerticalScrollIndicator={false}
            >
            <View style={{width:'95%',height:150,borderRadius:10,justifyContent:'center',backgroundColor:'grey',marginTop:10,alignSelf:'center'}}>
            <Image 
                              
                                style={{width:'100%',height:150,borderRadius:10,borderColor:'#26AE60',borderWidth:1,padding:40 }}
                                resizeMode='cover'
                            source={{uri:'https://hyperkodes.net/fyp/images/PanilaoBanner2.png'}} 
                              />
            
            </View>
            <View style={{width:'95%',justifyContent:'space-between',flexDirection:'row',marginTop:10,marginBottom:10,alignSelf:'center'}}>
              <Text style={{fontSize:25,fontWeight:'bold', color:'#0A6376',textAlign:'left'}}>Categories</Text>
              <TouchableOpacity 
                  onPress={()=>{navigation.navigate('Products',{products:Cate})}}
                  style={{borderWidth:1,padding:10,borderColor:'white',borderBottomColor:'#0A6376',marginBottom:5}}>
                <Text style={{color:'#0A6376',fontSize:12,fontWeight:'bold',textAlign:'right'}}>View All</Text>
            </TouchableOpacity>
            </View>
            <View style={{width:'90%',height:120,justifyContent:'center',alignItems:'center',alignSelf:'center',marginTop:5}}>
            <FlatList  
                    data={Cate.slice(0,4)}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}    
                    numColumns={4}
                    contentContainerStyle={{
                        flex:1,
                        justifyContent:'flex-start',
                        flexDirection: 'column',
                        //flexWrap: 'wrap',
                        
                        
                        
                    }}
                    
                    keyExtractor={item => item.id}
                    maxToRenderPerBatch={4}
                    renderItem={({item})=>{
                        
                        return(    
                            <TouchableWithoutFeedback 
                            onPress={ () => actionOnRow(item)
                            
                            }
                            >
                            <View style={{marginTop:0,justifyContent:'center',width:90}}>
                             <TouchableOpacity 
                             onPress={()=>navigation.navigate('Products',
                             {catId: item.id}) }
                             > 
                              <Image 
                              
                                style={{width:15,height:15,alignSelf:'center',borderRadius:10,borderColor:'#26AE60',borderWidth:1,padding:40 }}
                                resizeMode='center'
                            source={require('../../../assets/logo.png')} 
                              />
                              </TouchableOpacity>
                              <Text style={{width:90,height:30,marginTop:5,alignSelf:'center',marginBottom:5,textAlign:'center',fontSize:12,fontWeight:'bold'}}>{item.name}</Text>
                                
                            </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                />
            </View>
            <View style={{width:'95%',marginTop:10,marginBottom:10,alignSelf:'center'}}>
              <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
              <Text style={{fontSize:25,fontWeight:'bold', color:'#0A6376'}}>Products</Text>
              <TouchableOpacity 
                  onPress={()=>{navigation.navigate('Products',{products:Pro})}}
                  style={{borderWidth:1,padding:10,borderColor:'white',borderBottomColor:'#0A6376',marginBottom:5}}>
                <Text style={{color:'#0A6376',fontSize:12,fontWeight:'bold',textAlign:'right'}}>View All</Text>
            </TouchableOpacity>
            </View>
              <FlatList  
                    data={Pro.slice(0,10)}
                    
                    //showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      
                        justifyContent:'space-evenly',
                        flexDirection: 'column',
                        //flexWrap: 'wrap',
                        
                        
                        
                   }}
                    style={{marginTop:5,marginBottom:10,width:'100%',alignSelf:'center'}}
                    keyExtractor={item => item.id}
                    maxToRenderPerBatch={10}
                    renderItem={({item})=>{
                        
                        return(
                        <View style={{elevation:5,margin:8,width:180,backgroundColor:Colors.white,alignItems:'center',height:Dimensions.get('screen').width/1.35,marginBottom:10,alignSelf:'center',borderRadius:10,borderColor:'white',borderWidth:1, }}>
                        <TouchableOpacity
                        onPress={()=>{navigation.navigate('Card',{products:item})}}
                        >
                        <Image 
                            style={{width:50,height:50,marginBottom:5,alignItems:'center',alignSelf:'center',borderRadius:10,borderWidth:0,padding:90 }}
                            resizeMode='center'
                        source={{uri:'http://10.0.2.2/ecommerce/images/'+item.photo}} 
                          />
                          
                          <View style={{justifyContent:'center',flexWrap:'wrap',marginLeft:5}}>
                          <Text style={{textAlign:'center',width:160,flexWrap:'wrap' ,height:70,marginBottom:10,fontSize:18,fontWeight:'bold'}}>{item.name}</Text>
                          <Text style={{textDecorationStyle: 'solid',textAlign:'center',color:'red',marginBottom:0,height:20,fontSize:18,fontWeight:'bold'}}
                          
                          >Rs. {Math.round(item.price)}</Text>
                          
                          </View>
                          </TouchableOpacity>
                          </View>
                        
                        )
                        }}
                />

            </View>
            </ScrollView>
      </View>

  )
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
   // height: Dimensions.get("screen").width*1.5,
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mainContaier:{
    width:Dimensions.get('screen').width,
   // height:Dimensions.get('screen').height,
    backgroundColor:'white',
    marginBottom:10

  },
 
  textIn:{
        flex:1,
        paddingLeft:15,
        color:'white',
        fontSize:20
    },
    inpStyle:{
        width:'90%',
        alignItems:'center',
        height:50,
        justifyContent:'center',
        alignContent:'center',
        color:"white",
        backgroundColor:'#0A6376',
        borderRadius:10,
        borderColor:"#26AE60",
        //padding:4,
        paddingLeft:10,
        borderWidth:1,
        flexDirection:'row',
        alignSelf:'center',
        elevation:5
    },
   
 });
 