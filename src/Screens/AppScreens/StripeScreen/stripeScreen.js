import { CardField, useStripe, initPaymentSheet, initStripe  } from '@stripe/stripe-react-native';
import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, View, Button} from 'react-native';
export default function PaymentScreen() {
    const [cardDetails, setCardDetails] = useState(null);
    const { confirmPayment, handleCardAction } = useStripe();
    useEffect(() => {
        async function initialize() {
          await initStripe({
            publishableKey: "pk_test_51NE7xoFJd3mrSEw0tXx68gIleC2TojqmnkzVdvCCExQIi59cVQddIk4jp71qsYFOt8yngbHyjBUtp8hFeEbmb0Hn00b2hCXbjl",
          });
        }
        initialize().catch(console.error);
      }, []);

  const handlePayment = async () => {
    console.log(cardDetails);
    try {
        const { paymentIntent, error } = await confirmPayment('sk_test_51NE7xoFJd3mrSEw0lI0mhnwabRCcNZjciJNCO72NVGEsHTqvqsYl60NcGsoqmqDwZ5zJjH4WkkzsxQ7ovalUjQxl00ARRyKSTx', {
          //type: 'Card',
          paymentMethodType:'Card',

          paymentMethodData:{
            
            brand: "Visa", 
            complete: true, 
            expiryMonth: 12, 
            expiryYear: 23, 
            last4: "4242", 
            postalCode: "12345", 
            validCVC: "Valid",
             validExpiryDate: "Valid", 
             validNumber: "Valid"

              
          }
          
        });
  
        if (error) {
          console.log('Payment confirmation error:', error.message+"error first if");
        } else if (paymentIntent) {
          if (paymentIntent.status === 'requires_action' && paymentIntent.nextAction.type === 'use_stripe_sdk') {
            const { error: confirmationError } = await handleCardAction(paymentIntent.clientSecret);
            
            if (confirmationError) {
              console.log('Error:', confirmationError.message+"Error in intent");
            } else {
              console.log('Payment confirmed successfully!');
              // Handle successful payment
            }
          } else {
            console.log('Payment confirmed successfully!');
            // Handle successful payment
          }
        }
      } catch (error) {
        console.log('Error:', error+"catch");
      }
    };
  
    const handleCardChange = (cardDetails) => {
      setCardDetails(cardDetails);
    };
  
  return (
    <View style={styles.container}>
    <CardField
      postalCodeEnabled={true}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        
      }}
      
      style={styles.cardField}
      onCardChange={handleCardChange}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
     <Button
        style={styles.paymentButton}
        onPress={() => {
           handlePayment();
          // Handle payment button press
        }}
        title='Pay Now'
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    cardField: {
      width: '100%',
      height: 50,
      borderRadius: 5,
      backgroundColor: '#f5f5f5',
      marginBottom: 10,
    },
    paymentButton: {
      width: '100%',
      height: 50,
      backgroundColor: '#007bff',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
