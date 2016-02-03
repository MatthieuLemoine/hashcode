'use strict';

class Intersection{
    constructor(lat,long,id){
        this.id         = id;
        this.lat        = lat;
        this.long       = long;
        this.streets    = [];
    }
    
    addStreet(street){
        this.streets.push(street);
    }
}

module.exports  = Intersection;