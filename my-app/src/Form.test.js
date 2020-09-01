import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Form from './Form';
import App from "./App";
import 'jest-extended';

var chai = require('chai');
//var sinon = require('sinon');
chai.use(require('sinon-chai'));

const wrapper = shallow(<Form />);
it('should render <Form/>', () => {
    expect(wrapper);
});

describe('<App />', () => {
    it('renders one <Form /> components', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find(Form)).to.have.lengthOf(1);
    });

    it('renders children when passed in', () => {
        const wrapper = shallow((
            <Form>
                <form className="form" />
            </Form>
        ));
        expect(wrapper.contains(<form className="form" />)).to.equal(true);
    });

    // const handleSubmit = jest.fn().mockImplementation((cb) => () => cb({ test: 'test' }));
    // const wrapper = shallow(<Form form="test" handleSubmit={handleSubmit}   />);
    // wrapper.find('button').simulate('click');
    // expect(handleSubmit).toHaveBeenCalled();
});