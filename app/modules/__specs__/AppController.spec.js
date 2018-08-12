import React from "react";
import { shallow } from "enzyme";
import {expect} from 'Chai';

//import AppController from "./../AppController";

describe("AppController", () => {

    it("should count mock data" , () => {
        let mockData = [
            { name: "test" },
            { name: "test" }
        ];

        expect(mockData.length).to.equal(2);
    });

});