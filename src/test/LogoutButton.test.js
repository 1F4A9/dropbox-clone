import React from 'react';
import { render } from '@testing-library/react';
import LogoutButton from '../components/LogoutButton';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('LogoutButton', () => {
 it('should contain a h3', () => {
  const wrapper = shallow(<LogoutButton />);
  expect(wrapper.find("h3").length).toEqual(1);
 });
 it('should have atlease one class by the name...', () => {
  const wrapper = shallow(<LogoutButton />);
  expect(wrapper.find('i').hasClass("fa")).toBe(true);
 });

});
