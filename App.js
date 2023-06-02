/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import AuthStack from './src/Stack/authStack';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
//import axios from 'axios';
import { StripeProvider } from '@stripe/stripe-react-native';
export const axios = require('axios').default;
 
const App = () =>{
  const STRIPE_KEY ='pk_test_51NE7xoFJd3mrSEw0tXx68gIleC2TojqmnkzVdvCCExQIi59cVQddIk4jp71qsYFOt8yngbHyjBUtp8hFeEbmb0Hn00b2hCXbjl';
  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
    <AuthStack/>
</StripeProvider>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
