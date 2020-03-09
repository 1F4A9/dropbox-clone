import React from 'react';
import sinon from "sinon";
import { render } from '@testing-library/react';
import UploadProgress from '../components/UploadProgress';
import { shallow, configure } from 'enzyme';


import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe('UploadProgress', () => {
 it('should render an "i" component if displayDone is true', () => {
  const wrapper = shallow(<UploadProgress info={{name:'name', size: 1000}} displayDone={true} uploadDone={true} />);
  expect(wrapper.find("i").length).toEqual(1);
 });
 it('should not render "i" component if displayDone is false', () => {
  const wrapper = shallow(<UploadProgress info={{name:'name', size: 1000}} displayDone={false} uploadDone={false} />);
  expect(wrapper.find("i").length).toEqual(0);
 });
 it('should contain setDisplayDone', () => {
  const wrapper = shallow(<UploadProgress info={{name:'name', size: 1000}} />);
  expect(wrapper.find("span").length).toEqual(2);
 });

 it('should update to false with onClick', () => {
   const setDisplayDoneSpy = sinon.spy();

  const wrapper = shallow(<UploadProgress info={{name:'name', size: 1000}} setDisplayDone={setDisplayDoneSpy} displayDone={true} uploadDone={true}/>);
  expect(setDisplayDoneSpy.calledWith(false)).toBe(false);
  wrapper.find('.closeBtn').simulate('click')
  expect(setDisplayDoneSpy.calledWith(false)).toBe(true);
});

});
