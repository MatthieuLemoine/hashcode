'use strict';

let Balloon     = require('./balloon.class.js'),
    Position    = require('./position.class.js'),
    Altitude    = require('./altitude.class.js');

class Air{
    constructor(parameters){
        this.balloons    = new Array(parameters.B).fill(0).map(() => new Balloon(parameters.Rs,parameters.Cs,parameters.R,parameters.C));
        this.winds      = new Array(parameters.A+1).fill(0).map(() => new Altitude(parameters.R,parameters.C));
        this.reach = [];
        let reach = new Array(Math.pow(parameters.V,2) + 1).fill(0).map(() => new Array(Math.pow(parameters.V,2) +1 ).fill(0));
        for(let i = -parameters.V; i <= parameters.V; i++){
            for(let j = -parameters.V; j < parameters.V; j++){
                if(Position.isReach(i,j,parameters.C,parameters.V)){
                    this.reach.push({
                        r : i,
                        c : j
                    });
                }
            }
        }
        parameters.reach = this.reach;
    }

    play(parameters){
        let tours = this.balloons.map(x => x.move(this.balloons,this.winds,parameters));
        console.log(tours.reduce((p,c) => p+' '+c));
    }



}

module.exports = Air;
