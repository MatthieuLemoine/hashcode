'use strict';

class City{
    constructor(parameters){
        this.intersections  = [];
        this.cars           = [];
        this.streets        = [];
        this.parameters     = parameters;
    }
    
    addIntersection(intersection){
        this.intersections.push(intersection);
    }
    
    addCars(cars){
        this.cars = cars;
    }
    
    
    addStreets(streets){
        this.streets = streets;
    }
    
    runGreedy(){
        //console.log(this.parameters.C);
        this.cars.forEach(function(car){
            while(car.move()){}
            //console.log('interesctions parcourures',car.intersections.length);
            //car.intersections.forEach(intersection => console.log('id intersection',intersection.id));
        });
        console.log(this.calculateScore());
    }
    
    calculateScore(){
        return this.streets.reduce((p,c) => {
            return (c.travelled) ? p + c.distance : p;
        },0);
    }
    
    
}

module.exports = City;