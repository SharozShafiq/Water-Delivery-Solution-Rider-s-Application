import React from 'react';
import { shallow } from 'enzyme';
import Home from './home';

describe('Home Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it('should fetch categories from the API', () => {
    // Mock the axios.get method
    const mockAxiosGet = jest.spyOn(Home.axios, 'get').mockResolvedValueOnce({
      data: {
        success: 1,
        data: [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }],
      },
    });

    // Expect the API to have been called
    expect(mockAxiosGet).toHaveBeenCalledWith(getCategory);

    // Expect the categories state to have been set
    expect(wrapper.state().Cate).toEqual([{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }]);

    // Restore the original axios.get method
    mockAxiosGet.mockRestore();
  });

  it('should render input field', () => {
    // Find the TextInput component
    const textInput = wrapper.find('TextInput');

    // Expect the TextInput component to exist
    expect(textInput).toHaveLength(1);

    // Simulate typing in the input field
    textInput.simulate('changeText', 'Test input');

    // Expect the input field value to have changed
    expect(wrapper.state().inputValue).toEqual('Test input');
  });
});
