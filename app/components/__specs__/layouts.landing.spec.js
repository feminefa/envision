import React from "react";
import { shallow } from "enzyme";
import {expect} from 'Chai';

import OurComponent from "./../layouts/landing_layout";

describe("<OurComponent/>", () => {

    it("should render children" , () => {
        let mockData = [
            { name: "test" },
            { name: "test" }
        ];
        let wrapper = shallow(<OurComponent items={mockData}/>);
        let items = wrapper.findWhere((component) => {
            return component.props().children === "__test__";
        });
        expect(items.length).to.equal(2);
    });

});