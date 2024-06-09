class Room  {
    constructor(x,y, roomNum, depth, dungeon) {
        this.neighbors = [false,false,false,false] // north,south, east,west
        this.x = x
        this.y = y
        this.roomNum = roomNum
        this.depth = depth
        this.roomType = 'Basic' // This will be changed in dungeon.cleanup()

    }

    addNeighbor(x,y,direction){
        this.neighbors [direction] = true
    }
}