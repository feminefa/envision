'use_strict'
const Address = import ('./Address')


class Company {
    id:String;
    user_id:Number;
    name:String;
    address:Address;


}
Company.schema = {
    name: 'Client',
    primaryKey: 'id',
    properties: {
        id: 'string',
        user_id:'string',
        name: 'string',
        address: 'Address',
    }
};
module.exports = Company;