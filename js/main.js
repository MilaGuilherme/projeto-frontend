// Canvas creation //
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
    for (let y = 0; y < gridY; y++) {
        gridPos.push({ 'x': x, 'y': y, 'occupied': false });
    };
};

/*************************************************************************************************/

class ToolCollection {
    constructor(name) {
        this._activeTool;
        this._hasActiveTool = false;
    }

    activeTool() {
        return this._activeTool;
    }
    setActiveTool(tool) {
        if (!this._hasActiveTool) { //Set the clicked tool
            this._activeTool = tool;
            this._hasActiveTool = true;
            tool.classList.add("is-active")
        }
        else {
            if (tool == this._activeTool) { //Unset the active tool
                tool.classList.remove("is-active");
                this._hasActiveTool = false;
            }
            else { //Unset the active and set the clicked tool
                this._activeTool.classList.remove("is-active");
                this._activeTool = tool;
                this._hasActiveTool = true;
                tool.classList.add("is-active");
            }
        }
    }
}
const tools = new ToolCollection();

const assets = new Map();

const toolBar = document.getElementsByClassName("tools__toolbox--item");

for (let c = 0; c < toolBar.length; c++) {
    let tool = toolBar[c];
    assets.set(tool.id,[])
    tool.addEventListener("click", () => tools.setActiveTool(tool));
}
// Mouse events
canvas.onmousedown = mouseDown;
// canvas.onmousemove = mouseMove;

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
    if (tools.activeTool) {
        var assetID = tools.activeTool().id;
        var builtAssets = assets.get(assetID)
        var buildPosition = getPositionIndex(buildX, buildY, builtAssets)
        if (buildPosition < 0) {
            builtAssets.push({ 'x': buildX, 'y': buildY, 'type': assetID });
            assets.set(assetID,builtAssets);
            drawCanvas();
        }
        else {
            builtAssets.splice(buildPosition, 1);
            assets.set(assetID,builtAssets);
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
    var builtAssets = [...assets.values()].flat();
    for (var s in builtAssets) {
         ctx.drawImage(document.getElementById(builtAssets[s].type), builtAssets[s].x, builtAssets[s].y, 50, 50);
    };
};

drawCanvas();