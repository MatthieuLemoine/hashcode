'use strict';

let Car = require('./model/car.class.js'),
    City = require('./model/city.class.js'),
    Intersection = require('./model/intersection.class.js'),
    Street = require('./model/street.class.js'),
    split       = require('split'),
    through2    = require('through2');

let parameters = {
    N : 0,
    M : 0,
    T : 0,
    C : 0,
    S : 0
};

let intersections = [];
let streets = [];
let cars = [];
let ville = new City(parameters);
let numLigne = 0;
let altitude = 1;
let reg = /-?\d+\s-?\d+/g;
let air;

process.stdin.setEncoding('utf8');
process.stdin
    .pipe(split(/\r?\n/))
    .pipe(through2.obj(function(chunk,enc,next){
        if (chunk.length > 0){
            if (parameters.N === 0){
                let info     = chunk.split(' ').map(x => parseInt(x,10));
                parameters.N = info[0];
                parameters.M = info[1];
                parameters.T = info[2];
                parameters.C = info[3];
                parameters.S = info[4];
            }else if(intersections.length < parameters.N){
                let info     = chunk.split(' ').map(x => parseFloat(x,10));
                let intersection = new Intersection(info[0],info[1],intersections.length);
                intersections.push(intersection);
                ville.addIntersection(intersection);
                
            }else if(streets.length < parameters.M){
                let info = chunk.split(' ').map(x => parseInt(x,10));
                let intersectionA = ville.intersections[info[0]];
                let intersectionB = ville.intersections[info[1]];
                let isBiDirectionnelle = info[2] == 2 ? true : false;
                let cost = info[3];
                let length = info[4];
                let street = new Street(cost,length,intersectionA,intersectionB,isBiDirectionnelle);
                streets.push(street);
                
                intersectionA.addStreet(street);
                if(isBiDirectionnelle){
                    intersectionB.addStreet(street);
                }
                if(streets.length === parameters.M){
                    ville.addStreets(streets);
                    let startIntersection = ville.intersections[parameters.S];
                    for(let i = 0; i < parameters.C; i++){
                        cars.push(new Car(parameters.T,startIntersection));
                    }
                    ville.addCars(cars);
                }
            }
        }
        next();
    }))
    .on('finish',function(){
        ville.runGreedy();
    });
