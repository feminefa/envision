const Realm = require('realm');

const User = require('./User')
const Address = require ('./Address')
const Data = require ('./Data')


export const realm =
    new Realm({
        schema: [Address, Data, User],
        schemaVersion: 2,
        deleteRealmIfMigrationNeeded: true
    });


