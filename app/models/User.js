'use_strict'
import Address from './Address';
import Data  from './Data';


class User {
    //id:String;

    full_name = this.first_name + ' ' + this.last_name;
}
User.schema = {
    name: 'User',
    primaryKey: 'username',
    properties: {
        role: 'int',
        first_name:'string',
        last_name: 'string',
        email: 'string?',
        phone: 'string?',
        username: 'string',
        password: 'string',
        verified: 'bool?',
        enabled: {type: 'bool?',    default: true},
        caregiver: 'User?',
        caregiver_of: 'string?',
        address1: 'string?',
        address2: 'string?',
        data: 'Data?',
        age: 'int?',
        diagnosis: 'string?',
        hospice: 'string?',
        provider: 'string?',
        title: 'string?',
        relationship: 'string?',
        sex: 'string?'
    }
};
module.exports = User;