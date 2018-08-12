'use_strict'

const Point=require('./Point')
class Address {
    street:String;
    street_2:String;
    city:String;
    state:String;
    country:String;
    coordinate:Point


}
Address.schema = {
    name: 'Address',
    primaryKey: 'id',
    properties: {
        id: 'string',
        street: 'string',
        street_2:'string',
        city: 'string',
        state: 'string',
        country: 'string',
        coordinates:'string?[]',
    }
};
module.exports = Address;