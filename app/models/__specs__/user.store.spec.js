import React from "react";
import { shallow } from "enzyme";
import {expect} from 'Chai';
import { counter } from '../../stores/store.js'
//import AppController from "./../AppController";

describe("REDUCERS", () => {
    describe('user.store', () => {
        it("should provide the initial state", () => {
            expect(counter(undefined, {})).toBe(0)
        });
    });

});


