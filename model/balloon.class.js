'use strict';

let Position = require('./position.class.js');

class Balloon{
    constructor(r,c,R,C,V){
        this.a          = 0;
        this.r          = r;
        this.c          = c;
        this.C = C;
        this.R = R;
        this.nextPos    = [];
    }

    fillNextPos(winds){
        if (this.a > 1){ // descente
            let r = this.r  + winds[this.a - 1][this.r][this.c].delta_r;
            if (r < this.R && r >= 0){
                this.nextPos.push(new Position(
                    r,
                    (this.c  + winds[this.a - 1][this.r][this.c].delta_c + this.C)%this.C,
                    this.a - 1,
                    -1
                ));
            }
        }
        if(this.a < winds.length - 1 ){ // montée
            let r = this.r  + winds[this.a + 1][this.r][this.c].delta_r;
            if (r < this.R && r >= 0){
                this.nextPos.push(new Position(
                    r,
                    (this.c  + winds[this.a + 1][this.r][this.c].delta_c  + this.C)%this.C,
                    this.a + 1,
                    1
                ));
            }
        } // même altitude
        if(this.a > 0 ){
        let r = this.r  + winds[this.a][this.r][this.c].delta_r;
            if (r < this.R && r >= 0){
            this.nextPos.push(new Position(
                r,
                (this.c  + winds[this.a][this.r][this.c].delta_c  + this.C)%this.C,
                this.a,
                0
            ));
            }
        }
        else{
            let r = this.r;
            if (r < this.R && r >= 0){
                this.nextPos.push(new Position(
                    this.r,
                    this.c,
                    this.a,
                    0
                ));
            }
        }
    }

    move(balloons,winds,parameters){
        // fill nextPos
        this.fillNextPos(winds);
        let sorted = this.nextPos.slice().sort((a,b) => {
            let evaluateA = a.evaluate(balloons,parameters);
            let evaluateB = b.evaluate(balloons,parameters);
            return b.evaluate(balloons,parameters) - a.evaluate(balloons,parameters);
        });
        if(sorted.length === 0){
            return 0;
        }
        let pos = sorted[0];
        this.r = pos.r;
        this.c = pos.c;
        this.a = pos.a;

        this.nextPos = [];

        return pos.move;
    }
}

module.exports  = Balloon;
