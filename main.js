const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let hasFoundHat = false;
let hasFallenDownHole = false;

class Field {
    constructor(field) {
        this.field = field;
        this.pathCurrentPos = [0, 0];
    }

    print() {
        this.field.forEach(row => {
            console.log(row.reduce((acc, curr) => {
                return acc + curr;
            }) 
            )
        })
    }

    isInField() {

    }

    move(direction) {
        switch (direction) {
            case 'l':
                this.pathCurrentPos[1] -= 1;
                break;
            case 'r':
                this.pathCurrentPos[1] += 1;
                break;
            case 'u':
                this.pathCurrentPos[0] -= 1;
                break;
            case 'd':
                this.pathCurrentPos[0] += 1;
                break;
        }
        this.field[this.pathCurrentPos[0]][this.pathCurrentPos[1]] = '*';
    }

}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.print();

function isValidDirection(direction) {
    const validDirections = ['l', 'r', 'u', 'd'];
    return validDirections.includes(direction);
}

do {
    // game stuff in here
    const direction = prompt('Which way?');
    // console.log(direction);
    if (isValidDirection(direction)) {
        myField.move(direction);
        myField.print();
    }
} while (!hasFoundHat || !hasFallenDownHole) {
 }
