import React from 'react';
import {View, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Screens/AppScreens/home';
import Riderprofile from '../Screens/AppScreens/riderprofile';
import NotificationScreen from '../Screens/AppScreens/notification';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { JumpingTransition, color } from 'react-native-reanimated';
import Products from '../Screens/AppScreens/inAppScreens/products';
import Orders from '../Screens/AppScreens/inAppScreens/orders';
import TrackOrder from '../Screens/AppScreens/inAppScreens/trackOrder';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Font from 'react-native-vector-icons/FontAwesome';
import ProductCard from '../Screens/AppScreens/inAppScreens/productCard';
import Cart from '../Screens/AppScreens/inAppScreens/cart';
import CheckOut from '../Screens/AppScreens/inAppScreens/checkOut';
import PaymentScreen from '../Screens/AppScreens/StripeScreen/stripeScreen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export function DrawerRoutes({route,navigation}) {
    
  return (

      <Drawer.Navigator initialRouteName="Home" 
      
      screenOptions={{
        drawerType:'slide',
        drawerActiveBackgroundColor:'#0A6376',
        drawerInactiveTintColor:'black',
        drawerActiveTintColor:'white',
        headerTintColor:'#0A6376',
        drawerStyle: {
          backgroundColor: '#0A6376',
          width: 300,

        },
        
      }}
      
      drawerContent={(props)=> {
        return(
            <View style={{}}>
                <ScrollView>
                    <ImageBackground source={require("../../assets/logo.png")} style={{marginTop:10,borderRadius:50,width:150,height:150,alignItems:'center',alignContent:'center',alignSelf:'center',alignItems:"center",padding:20,marginBottom:20,borderColor:Colors.secondary}}>
                        
                        
                    </ImageBackground>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{margin:5,position:"relative",right:0,left:0,bottom:5,borderBottomWidth:2,borderColor:Colors.white}}>
                    <Text style={{color:Colors.white,fontSize:20,fontWeight:'bold',width:"100%",height:40,textAlign:"center",paddingTop:8}}>Home</Text>
                </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Orders')}} style={{margin:5,position:"relative",right:0,left:0,bottom:5,borderBottomWidth:2,borderColor:Colors.white}}>
                    <Text style={{color:Colors.white,fontSize:20,fontWeight:'bold',width:"100%",height:40,textAlign:"center",paddingTop:8}}>Orders</Text>
                </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Track My Order')}} style={{margin:5,position:"relative",right:0,left:0,bottom:5,borderBottomWidth:2,borderColor:Colors.white}}>
                    <Text style={{color:Colors.white,fontSize:20,fontWeight:'bold',width:"100%",height:40,textAlign:"center",paddingTop:8}}>Track Order</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}} style={{margin:5,position:"relative",right:0,left:0,bottom:5,borderBottomWidth:2, borderColor:Colors.white,borderColor:Colors.white}}>
                    <Text style={{color:Colors.white,fontSize:20,fontWeight:'bold',width:"100%",height:40,textAlign:"center",paddingTop:8}}>Profile</Text>
                </TouchableOpacity>
                    </ScrollView>
            </View>
        )
    } 
 }

      >
        <Drawer.Screen name="Home" component={Home} options={{title:'Home',headerTitleAlign:"center",

headerRight: () => (
                
    <TouchableOpacity
    
      onPress={() => {navigation.navigate('Cart')}}>
        <View style={{padding:4,width:40,height:40,backgroundColor:'white',borderRadius:10,marginLeft:5}}>
      <Font
      
      style={{color:'#0A6376'}}
      name={'shopping-cart'}
      size={30}
      
  
    />
     <Text  style={{position:'absolute',fontSize:15,color:'white',backgroundColor:'red',width:20,height:20,borderRadius:10,textAlign:'center'}}>1</Text>
      </View>
    </TouchableOpacity>
    
  ),
  }}/>
        <Drawer.Screen name="Products" component={Products} options={{headerShown:true,title:'',
        headerLeft: () => (
                
          <TouchableOpacity
          
            onPress={() => {navigation.navigate('Home')}}>
              <View style={{padding:4,width:60,height:40,backgroundColor:'white',justifyContent:'center',alignItems:'center', borderRadius:10,marginLeft:5,flexDirection:'row'}}>
            <Font
            
            style={{color:'#0A6376'}}
            name={'arrow-left'}
            size={18}
            
        
          />
          <Text style={{fontSize:18,color:'#0A6376',marginLeft:5}}>Back</Text>
            </View>
          </TouchableOpacity>
          
        ),
        }}/>
        <Drawer.Screen name="Orders" component={Orders} options={{title:'Orders History',headerTitleAlign:"center"}}/>
        <Drawer.Screen name="Track My Order" component={TrackOrder} options={{title:'Order Tracking',headerTitleAlign:"center"}}/>
        <Drawer.Screen name="Profile" component={Riderprofile} />
        <Drawer.Screen name="Card" component={ProductCard} options={{headerShown:true,title:'',
        headerLeft: () => (
                
          <TouchableOpacity
          
            onPress={() => {navigation.navigate('Home')}}>
              <View style={{padding:4,width:60,height:40,backgroundColor:'white',justifyContent:'center',alignItems:'center', borderRadius:10,marginLeft:5,flexDirection:'row'}}>
            <Font
            
            style={{color:'#0A6376'}}
            name={'arrow-left'}
            size={18}
            
        
          />
          <Text style={{fontSize:18,color:'#0A6376',marginLeft:5}}>Back</Text>
            </View>
          </TouchableOpacity>
          
        ),
        }} />
        <Drawer.Screen name="Cart" component={Cart} options={{headerShown:true,title:'Cart',headerTitleAlign:'center',
        headerLeft: () => (
                
          <TouchableOpacity
          
            onPress={() => {navigation.navigate('Home')}}>
              <View style={{padding:4,width:60,height:40,backgroundColor:'white',justifyContent:'center',alignItems:'center', borderRadius:10,marginLeft:5,flexDirection:'row'}}>
            <Font
            
            style={{color:'#0A6376'}}
            name={'arrow-left'}
            size={18}
            
        
          />
          <Text style={{fontSize:18,color:'#0A6376',marginLeft:5}}>Back</Text>
            </View>
          </TouchableOpacity>
          
        ),
        }}
        
        />
        <Drawer.Screen name="Payment" component={PaymentScreen} options={{headerShown:true,title:'Cart',headerTitleAlign:'center',
        headerLeft: () => (
                
          <TouchableOpacity
          
            onPress={() => {navigation.goBack()}}>
              <View style={{padding:4,width:60,height:40,backgroundColor:'white',justifyContent:'center',alignItems:'center', borderRadius:10,marginLeft:5,flexDirection:'row'}}>
            <Font
            
            style={{color:'#0A6376'}}
            name={'arrow-left'}
            size={18}
            
        
          />
          <Text style={{fontSize:18,color:'#0A6376',marginLeft:5}}>Back</Text>
            </View>
          </TouchableOpacity>
          
        ),
        }}
        
        />
<Drawer.Screen name="Checkout" component={CheckOut} options={{headerShown:true,title:'Check Out',headerTitleAlign:'center',
 headerLeft: () => (
                
  <TouchableOpacity
  
    onPress={() => {navigation.navigate('Cart')}}>
      <View style={{padding:4,width:60,height:40,backgroundColor:'white',justifyContent:'center',alignItems:'center', borderRadius:10,marginLeft:5,flexDirection:'row'}}>
    <Font
    
    style={{color:'#0A6376'}}
    name={'arrow-left'}
    size={18}
    

  />
  <Text style={{fontSize:18,color:'#0A6376',marginLeft:5}}>Back</Text>
    </View>
  </TouchableOpacity>
  
),
}}/>

      </Drawer.Navigator>

  );
}

const NavStack = ({navigation}) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='HomeScreen' component={DrawerRoutes} options={{headerShown: false}}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default NavStack;
