const Realm = require('realm');

const User = require('./User')
const Address = require ('./Address')
const Data = require ('./Data')
const Score = require ('./Score')


export const realm =
    new Realm({
        schema: [Address, Data, User, Score],
        schemaVersion: 2,
        deleteRealmIfMigrationNeeded: true
    });


