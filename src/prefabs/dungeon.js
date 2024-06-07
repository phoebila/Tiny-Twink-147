class Dungeon {
    constructor(width, height, startX, startY, maxRooms) {
        this.matrix = []; // the matrix that stores all of the rooms
        this.maxRooms = maxRooms; // How many rooms that matrix has when it's done generating
        this.width = width; // width of matrix (would have used length but I think that one behaves weird)
        this.height = height; // height of the matrix
        this.roomCount = 0; // Starts with 0 rooms. should equal maxRooms when done
        this.startX = startX; // x coordinate for first room placed in matrix
        this.startY = startY; // y coordinate for first room placed in matrix
        this.chances = [1, 2, 3, 4]; // the decreasing chances of looking for a new room: (1/1), (1/2),...
        this.previousRooms = [];
        this.currentRooms = [];
        // Make the matrix containing all of the rooms 
        this.makeDungeon();
    }

    makeDungeon() {
        for (let x = 0; x < this.width; x++) {
            this.matrix[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.matrix[x][y] = null;
            }
        }

        this.populateMatrix();
    }

    populateMatrix() {
        let depth = 0;
        this.previousRooms = []; // This is an array of the rooms that were added in the previous iteration. It's overwritten with previous rooms at the end of every iteration
        this.currentRooms = []; // these are the rooms added in the current iteration. 
        // populate the first room
        this.populateRoom(this.startX, this.startY, depth);

        depth++;

        while (this.roomCount < this.maxRooms) { // keep adding rooms until we have the max amount of rooms
            for (let i = 0; i < this.previousRooms.length; i++) { // iterate through the previous set of rooms 
                this.giveNeighbors(this.previousRooms[i][0], this.previousRooms[i][1], depth);
                if (!(this.roomCount < this.maxRooms)) {
                    break;
                }
            }
            this.previousRooms = this.currentRooms.slice(); // overwrites previous rooms with current rooms
            this.currentRooms = []; // empties current rooms 
            depth++;
        }
    }

    giveNeighbors(x, y, depth) {
        let chance = 0;
        let attempts = 0;
        let tryDirection;
        while (this.roomCount < this.maxRooms) { // gonna have a bunch of scary nested loops here but I swear it isn't that long
            if (chance < 4 && Math.random() < (1 / this.chances[chance])) { // Rolls to see if it should look for a neighbor. Decreases the odds for each neighbor found
                tryDirection = Math.floor(Math.random() * 4);
                while (this.roomCount < this.maxRooms ) {
                    if (attempts >= 4) {
                        return;
                    }
                    if (tryDirection === 0) {
                        // look north. if it isn't out of range and it isn't populated, populate it
                        attempts++;
                        if (this.populateRoom(x, y - 1, depth)) { // if it successfully populates the room, do stuff here
                            attempts = 0; // reset attempts
                            chance++; // decrease the chances
                            // connect the rooms
                            this.connectRooms(x, y, x, y - 1);
                            break;
                        } else {
                            tryDirection = (tryDirection + 1) % 4; // otherwise, try another direction
                        }
                    }

                    if (tryDirection === 1) {
                        // look south. if it isn't out of range and it isn't populated, populate it
                        attempts++;
                        if (this.populateRoom(x, y + 1, depth)) { // if it successfully populates the room, do stuff here
                            attempts = 0; // reset attempts
                            chance++; // decrease the chances
                            // connect the rooms (give them doors facing each other)
                            this.connectRooms(x, y, x, y + 1);
                            break;
                        } else {
                            tryDirection = (tryDirection + 1) % 4; // otherwise, try another direction
                        }
                    }

                    if (tryDirection === 2) {
                        // look east. if it isn't out of range and it isn't populated, populate it
                        attempts++;
                        if (this.populateRoom(x + 1, y, depth)) { // if it successfully populates the room, do stuff here
                            attempts = 0; // reset attempts
                            chance++; // decrease the chances
                            // connect the rooms
                            this.connectRooms(x, y, x + 1, y);
                            break;
                        } else {
                            tryDirection = (tryDirection + 1) % 4; // otherwise, try another direction
                        }
                    }

                    if (tryDirection === 3) {
                        // look west. if it isn't out of range and it isn't populated, populate it
                        attempts++;
                        if (this.populateRoom(x - 1, y, depth)) { // if it successfully populates the room, do stuff here
                            attempts = 0; // reset attempts
                            chance++; // decrease the chances
                            // connect the rooms
                            this.connectRooms(x, y, x - 1, y);
                            break;
                        } else {
                            tryDirection = (tryDirection + 1) % 4; // otherwise, try another direction
                        }
                    }
                }
            } else {
                return;
            }
        }
    }

    populateRoom(x, y, roomDepth) {
        if (this.inMatrix(x, y) && this.matrix[x][y] === null) { // if it's in the matrix and isn't populated
            this.roomCount++;
            this.matrix[x][y] = new Room(x, y, this.roomCount, roomDepth, this); // Ensure `Room` class exists
            this.currentRooms.push([x, y]);
            return true;
        }
        return false;
    }

    inMatrix(x, y) {
        return x < this.width && x >= 0 && y < this.height && y >= 0;
    }

    connectRooms(x1, y1, x2, y2) {
        if (this.matrix[x2] && this.matrix[x2][y2] && this.matrix[x1] && this.matrix[x1][y1]) {
            if (x1 === x2 + 1 && y1 === y2) { // if 1 is east of 2
                this.matrix[x2][y2].neighbors[2] = true;
                this.matrix[x1][y1].neighbors[3] = true;
            } else if (x1 === x2 - 1 && y1 === y2) { // if 1 is west of 2
                this.matrix[x2][y2].neighbors[3] = true;
                this.matrix[x1][y1].neighbors[2] = true;
            } else if (y1 === y2 + 1 && x1 === x2) { // if 1 is south of 2
                this.matrix[x2][y2].neighbors[1] = true;
                this.matrix[x1][y1].neighbors[0] = true;
            } else if (y1 === y2 - 1 && x1 === x2) { // if 1 is north of 2 
                this.matrix[x2][y2].neighbors[0] = true;
                this.matrix[x1][y1].neighbors[1] = true;
            } else { // They cannot be neighbors
                return false;
            }
            return true;
        }
        return false;
    }

    printMatrix() {
        console.log("Room count: " + this.roomCount + "\n");
        console.log("Matrix:\n");
        for (let y = this.height - 1; y >= 0; y--) {
            let currentRow = "";
            for (let x = 0; x < this.width; x++) {
                if (this.matrix[x][y] === null) {
                    currentRow += "   "; // Empty spaces take up 3 characters
                } else {
                    currentRow += String(this.matrix[x][y].roomType).padEnd(3, ' ') + " "; // Populated spaces also take up 3 characters
                }
            }
            console.log("Row " + y.toString() + ": " + currentRow + "\n");
        }
    }
    
    
    
    
    
}
