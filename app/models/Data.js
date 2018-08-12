'use_strict'


class Data {
    id:String;
    first_name:String;
    last_name:String;
    email:String;
    password:String;
    verified:Boolean;
    phone:String;


}
Data.schema = {
    name: 'Data',
    primaryKey: 'id',
    properties: {
        id: 'string',
        user: {type: 'linkingObjects', objectType: 'User', property: 'data'}
    }
};
module.exports = Data;