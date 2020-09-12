const canvas = document.querySelector("canvas");
//Resize canvas
canvas.width = Math.round(canvas.parentElement.clientWidth / 60) * 60;
canvas.height = Math.round(canvas.parentElement.clientHeight / 60) * 60;

const ctx = canvas.getContext('2d');

//Get boundig offset
var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;

//Create grid and fill array
var grid = ctx.createPattern(document.getElementById('grid'), 'repeat');
ctx.fillStyle = grid;

//Create virtual grid for positioning
var gridX = Math.round(canvas.width / 60);
var gridY = Math.round(canvas.height / 60);
const gridPos = [];
for (var x = 0; x < gridX; x++) {
    for (var y = 0; y < gridY; y++) {
        gridPos.push({ 'x': x, 'y': y, 'occupied': false });
    };
};

/*************************************************************************************************/


// const assets = [];
// const assetsBar = document.getElementById("funcoes");
// for(var c = 0 ; c < assetsBar.childElementCount; c++)
// {
//     assets.push({'id' : assetsBar.children[c].id})  
// }

const station = document.getElementById("estacao");

const stations = [];
const walls = [];

//Mouse events
canvas.onmousedown = mouseDown;
// canvas.onmousemove = mouseMove;

drawCanvas();

//Mouse functions

//On click
function mouseDown(e) {
    //Get mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    //Get the index position in the grid and manipulate the grid under that position
    mouseX = Math.floor(mx / 60);
    mouseY = Math.floor(my / 60);
    index = getPositionIndex(mouseX, mouseY, gridPos);
    if (index > -1) {
        gridManipulation(index);
    }
};

//On move (WIP)
// function mouseMove(e) {

// };

//Function to get the index of a position inside an array of objects, add the positions and the array to find if it contains an object with the same x and y values.
function getPositionIndex(x, y, array) {
    var position = array.findIndex(pos => pos.x == x && pos.y == y);
    return position;
};

//Manipulate grid
function gridManipulation(index) {
    var buildX = gridPos[index].x * 60 + 5;
    var buildY = gridPos[index].y * 60 + 5;
    if (station.active) {
        var stationPosition = getPositionIndex(buildX, buildY, stations)
        if (stationPosition < 0) {
            stations.push({ 'x': buildX, 'y': buildY, 'isDragging': false });
            drawCanvas();
        }
        else {
            stations.splice(stationPosition, 1);
            drawCanvas();
        }
    }
}

//Drag WIP
// function dragStation() {

// };

//Draw and Redraw canvas
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var s in stations) {
        ctx.drawImage(station, stations[s].x, stations[s].y, 50, 50);
    };
};

function addStation() {
    if (!station.active) {
        station.style.backgroundColor = 'aquamarine';
        station.active = true;
    }
    else {
        station.style.backgroundColor = 'transparent';
        station.active = false;
    }
};
