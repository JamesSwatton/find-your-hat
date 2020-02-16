const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let hasFoundHat = false;

class Field {
    constructor(field) {
        this.field = field;
        this.fieldWidth = this.field[0].length
        this.fieldHeight = this.field.length
        this.pathCurrentPos = [0, 0];
        this.hasFallenInHole = false;
    }

    print() {
        this.field.forEach(row => {
            console.log(row.reduce((acc, curr) => {
                return acc + curr;
            }) 
            )
        })
    }

    move(direction) {
        let posX = this.pathCurrentPos[1];
        let posY = this.pathCurrentPos[0];
        switch (direction) {
            case 'l':
                if (posX - 1 >= 0) {
                    this.pathCurrentPos[1] -= 1;
                    this.checkForHole(this.pathCurrentPos);
                }
                break;
            case 'r':
                if (posX + 1 < this.fieldWidth) {
                    this.pathCurrentPos[1] += 1;
                    this.checkForHole(this.pathCurrentPos);
                }
                break;
            case 'u':
                if (posY - 1 > 0) {
                    this.pathCurrentPos[0] -= 1;
                    this.checkForHole(this.pathCurrentPos);
                }
                break;
            case 'd':
                if (posY + 1 < this.fieldHeight) {
                    this.pathCurrentPos[0] += 1;
                    this.checkForHole(this.pathCurrentPos);
                }
                break;
        }
        this.field[this.pathCurrentPos[0]][this.pathCurrentPos[1]] = '*';
    }

    checkForHole(location) {
        const x = location[1];
        const y = location[0];
        if (this.field[y][x] === 'O') {
            this.hasFallenInHole = true;
        }
        console.log('hello');
    }

}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);


function isValidDirection(direction) {
    const validDirections = ['l', 'r', 'u', 'd'];
    return validDirections.includes(direction);
}

myField.print();

while (!myField.hasFallenInHole) {
    const direction = prompt('Which way?');
    if (isValidDirection(direction)) {
        myField.move(direction);
        myField.print();
    }
};

console.log('You fell in a hole!');
