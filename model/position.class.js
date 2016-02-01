'use strict';

class Position{
    constructor(r,c,a,move){
        this.r = r;
        this.c = c;
        this.a = a;
        this.move = move;
    }

    evaluate(balloons,parameters){
        let a = parameters.kNeighbour * balloons.reduce((p,c) => p + Math.min(2*parameters.V,this.getDistanceFromBalloon(c,parameters.C)),0);
        let b = parameters.kBorder * this.indicatrice(parameters.dBorderMax,parameters.R)*(parameters.dBorderMax - this.getDistanceFromBorder(parameters.R));
        let c = parameters.kReachedCells*this.getReachedCells(parameters.reach,parameters.targets).length;
        return a - b + c;
    }

    indicatrice(dBorderMax,R){
        return new Number((this.r <= dBorderMax) || (this.r  >= R - dBorderMax));
    }

    getDistanceFromBorder(R){
        return Math.min(this.r,R - this.r);
    }

    getDistanceFromBalloon(balloon,C){
        let row_distance = Math.pow(this.r - balloon.r,2);

        let col_distance = Math.abs(this.c - balloon.c);
            col_distance = Math.min(col_distance,C - col_distance);
            col_distance = Math.pow(col_distance,2);

        return Math.sqrt(row_distance + col_distance);
    }

    getReachedCells(reach,targets){
        return reach.filter((cell) => targets.has((cell.r + this.r) + '/' + (cell.c + this.c)));
    }

    static isReach(r,c,C,V){
        let row_distance = Math.pow(r,2);

        let col_distance = Math.abs(c);
            col_distance = Math.min(col_distance,C - col_distance);
            col_distance = Math.pow(col_distance,2);

        return Math.sqrt(row_distance + col_distance) <= V ;
    }

}

module.exports = Position;
