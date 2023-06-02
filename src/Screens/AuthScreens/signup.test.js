import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import Signup from '../AuthScreens/signup';

test('renders signup screen', () => {
  const { getByPlaceholder, getByText } = render(<Signup />);
  
  // Find input fields by their placeholder text
  const firstnameInput = getByPlaceholder('Enter First Name');
  const lastnameInput = getByPlaceholder('Enter Last Name');
  const addressInput = getByPlaceholder('Enter Home Address');
  const emailInput = getByPlaceholder('Enter Email Address');
  const passwordInput = getByPlaceholder('Enter Password');
  const repasswordInput = getByPlaceholder('Re-enter Password');

  // Perform some testing assertions
  expect(firstnameInput).toBeTruthy();
  expect(lastnameInput).toBeTruthy();
  expect(addressInput).toBeTruthy();
  expect(emailInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();
  expect(repasswordInput).toBeTruthy();

  // Simulate typing in the input fields
  fireEvent.changeText(firstnameInput, 'Sharoz');
  fireEvent.changeText(lastnameInput, 'Shafiq');
  fireEvent.changeText(addressInput, '123 Main St');
  fireEvent.changeText(emailInput, 'Sharoz@example.com');
  fireEvent.changeText(passwordInput, 'password');
  fireEvent.changeText(repasswordInput, 'password');

  // Find and press the register button
  const registerButton = getByText('Register');
  fireEvent.press(registerButton);

});
