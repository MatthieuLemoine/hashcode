'use strict';

class Car{
    constructor(T,start){
        this.intersections = [];
        this.currentTime = 0;
        this.T = T;
        this.position = start;
    }
    
    get position(){
        return this.intersections[this.intersections.length - 1];
    }
    
    set position(intersection){
        this.intersections.push(intersection);
    }
    
    move(){
        let acceptable = this.position.streets.filter(street => this.currentTime + street.cost <= this.T);
        if (acceptable.length > 0){
            let sorted = acceptable.slice().sort((a,b) => b.evaluate() - a.evaluate());
            let bestStreet = sorted[0];
            
            if (bestStreet.evaluate() <= 0){
                let index = parseInt(Math.random() * (sorted.length));
                //  console.log("index",index);
                // aleatoire
                bestStreet = sorted[index];
                if (!bestStreet){
                    console.log(index,sorted.length);
                }
                // aleatoire en fct du coût
                //bestStreet = this.decideBetweenSeveralNullMoves(acceptable);
            }
            //console.log(bestStreet);
            bestStreet.travelled = true;
            this.position = bestStreet.getNextIntersection(this.position);
            this.currentTime += bestStreet.cost;
        }else{
            return false;
        }
        return true;
    }
    
    
    decideBetweenSeveralNullMoves(streets){
        var totalCost = streets.reduce((p,c) => p + c.cost,0);
        var i = 0;
        var retrievedStreet = streets[i];
        var partialSum = retrievedStreet.cost/totalCost;
        var random = Math.random();
        while(partialSum < random){
            i++;
            retrievedStreet=streets[i];
            partialSum=partialSum + retrievedStreet.cost/totalCost;
        }
        return retrievedStreet;
    }
    
}

module.exports  = Car;