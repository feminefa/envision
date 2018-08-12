'use_strict'
const Address = import ('./Address')


 class Client {
    id:String;
    first_name:String;
    last_name:String;
    address:Address;


}
Client.schema = {
    name: 'Client',
    primaryKey: 'id',
    properties: {
        id: 'string',
        first_name:'string',
        last_name: 'string',
        address: 'Address',
    }
};