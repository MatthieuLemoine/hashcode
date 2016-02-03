'use strict';

class Street{
    constructor(cost,distance,intersectionA,intersectionB,oneWay){
        this.cost = cost;
        this.distance = distance;
        this.travelled = false;
        this.intersectionA = intersectionA;
        this.intersectionB = intersectionB;
        this.oneWay         = oneWay;
    }
    
    
    
    evaluate(){
        if(this.travelled){
            return 0;
        }else{
            //return (this.distance / this.cost);
            return this.distance;
        }
    }
    
    getNextIntersection(intersection){
        return (this.intersectionA === intersection) ? this.intersectionB : this.intersectionA;
    }
}

module.exports = Street;