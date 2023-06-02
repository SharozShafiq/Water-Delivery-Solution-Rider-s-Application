import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from './login';

test('renders login screen', () => {
    const { getByPlaceholderText } = render(<Login />);

    const emailInput = getByPlaceholderText('Enter Email Address');
    const passwordInput = getByPlaceholderText('Enter Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('should call the Login function on button press', () => {
    const mockLogin = jest.fn();
    const { getByTestId } = render(<Login Login={mockLogin} />);

    const loginButton = getByTestId('login-button');

    fireEvent.press(loginButton);

    expect(mockLogin).toHaveBeenCalled();
  });
