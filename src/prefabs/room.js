class Room  {
    constructor(x,y, roomNum, depth, dungeon) {
        this.neighbors = [false,false,false,false] // north,south, east,west
        this.x = x
        this.y = y
        this.roomNum = roomNum
        this.depth = depth
        this.roomType = 1
        if (roomNum == 0) { //starting room
            this.roomType =0
        } else if (roomNum == Math.floor(dungeon.maxRooms/ 2)) { // 
            this.roomType =5
        }  else if (roomNum == dungeon.maxRooms) { // 
            this.roomType =10
        } 

    }

    addNeighbor(x,y,direction){
        this.neighbors [direction] = true
    }
}