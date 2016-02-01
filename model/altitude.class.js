'use strict';

class Altitude{
    constructor(R,C){
        this.cells = new Array(R).fill(0).map(() => new Array(C).fill(''));
    }
}

module.exports = Altitude;
