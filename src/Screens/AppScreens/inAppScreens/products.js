import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Products = ({route, navigation}) => {
  const {products}=route.params
 // const [pro, setPro] = useState([]);
  
  //setPro(products);
  console.log(products);
  return (
    //Show Products details in FlatList
      <View style={styles.card}>
      <FlatList 
      showsVerticalScrollIndicator={false}
      vertical
      numColumns={2}
      data={products}
      renderItem={({item})=>{
          
          return(    
              <View style={{padding:10,alignContent:'flex-start'}}>
                  <TouchableOpacity
                  onPress={()=>{navigation.navigate('Card',{products:item})}}>
                <Image 
                  style={{width:50,height:50,backgroundColor:'#0A6376',borderRadius:10,borderColor:'#009387',borderWidth:1,padding:80,marginHorizontal:5,marginVertical:10 }}
                  resizeMode='center'
              source={require('../../../../assets/logo.png')}
               
                />
                
                <Text style={{alignSelf:'center',width:100,height:70,marginBottom:5,textAlign:'center',fontSize:15,fontWeight:'bold',color:Colors.black}}>{item.name}</Text>
                </TouchableOpacity>
              </View>
          
          )
          
      }}
      />
  </View>
  )


}
const styles = StyleSheet.create({
card:{
  marginHorizontal:2,
  borderRadius:10,
  //width:'100%',
  //height:'100%',
  alignItems:'center',
  //justifyContent:'center',
 // backgroundColor:Colors.light,
  //justifyContent:'space-between',
          
},
})

export default Products;
