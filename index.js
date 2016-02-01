'use strict';

let Air = require('./model/air.class.js'),
    split       = require('split'),
    through2    = require('through2');

let casesCibles = new Set();
let numLigne = 0;
let altitude = 1;
let reg = /-?\d+\s-?\d+/g;
let air;

let parameters = {
    R : 0,
    C : 0,
    A : 0,
    L : 0,
    V : 0,
    B : 0,
    T : 0,
    Rs : -1,
    Cs : -1,
    kBorder : 1000,
    kNeighbour : 34,
    kReachedCells : 20,
    kExtendedReachCells : 5,
    dBorderMax : 5,
    extendedV : 0
};

process.stdin.setEncoding('utf8');
process.stdin
    .pipe(split(/\r?\n/))
    .pipe(through2.obj(function(chunk,enc,next){
        if (chunk.length > 0){
            if (parameters.R === 0){
                let info     = chunk.split(' ').map(x => parseInt(x,10));
                parameters.R       = info[0];
                parameters.C        = info[1];
                parameters.A = info[2];
            }else if(parameters.L === 0){
                let info   = chunk.split(' ').map(x => parseInt(x,10));
                parameters.L  = info[0];
                parameters.V     = info[1];
                parameters.B = info[2];
                parameters.T   = info[3];
                parameters.extendedV = 2*parameters.V;
            }else if(parameters.Rs === -1){
                let info     = chunk.split(' ').map(x => parseInt(x,10));
                parameters.Rs = info[0];
                parameters.Cs = info[1];
                air = new Air(parameters);
            }else if(casesCibles.size < parameters.L){
                let info     = chunk.split(' ').map(x => parseInt(x,10));
                // r/c
                casesCibles.add(info[0]+'/'+info[1]);
            }else{
                if(numLigne >= parameters.R){
                    numLigne = 0;
                    altitude++;
                }

                let paires = chunk.match(reg).map(x => {
                    let info = x.split(' ').map(y => parseInt(y,10));
                    return {
                        delta_r : info[0],
                        delta_c : info[1]
                    };
                });
                air.winds[altitude][numLigne] = paires;
                numLigne++;
                if(altitude === parameters.A && numLigne >= parameters.R){
                    //this.push('');
                    next();
                }
            }
        }
        next();
    }))
    .on('finish',function(){
        parameters.targets = casesCibles;
        for(let i = 0; i < parameters.T; i++){
            air.play(parameters);
            //console.log('End tour');
        }
    });
