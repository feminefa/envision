'use_strict'

 class Score {


}
Score.schema = {
    name: 'Score',
    primaryKey: 'id',
    properties: {
        id: 'string',
        type: 'string',
        value:'int',
        date: 'date',
        user: 'User'
    }
};
module.exports =  Score;

