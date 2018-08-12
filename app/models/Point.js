'use_strict'

 class Point {
    type: String;
     coordinates: Array;


}
Point.schema = {
    name: 'Point',
    properties: {
        type: 'string',
        coordinates:'string?[]',
    }
};
module.exports =  Point;