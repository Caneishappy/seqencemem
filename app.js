

let size = 3;
const gridcontainer = document.getElementById("grid-container");
const restartbtn = document.getElementById("restart-btn");
const counter = document.getElementById("counterh1");
let grid = [];
let listToMem = [];
let count = 0;
let gameover = false;

countToMemorize();

for (let row = 0; row < size; row++) {
    // innit the grid
    grid.push([]);
    for (let col = 0; col < size; col++) {
        // grid[row].push("");
        const newItem = document.createElement("div");
        newItem.setAttribute("id", `${"item" + [row * size + col]}`);
        let newSquare = gridcontainer.appendChild(newItem);
        grid[row].push(newSquare);
        newSquare.addEventListener("click", function () {
            //logic for if the sqare is clicked
            if (corretMem([row, col])) {
                console.log("++");
            }
        });
    }
}

function corretMem(clicked) {
    switchcolor(clicked[0], clicked[1]);
    if (
        listToMem[count][0] == clicked[0] &&
        listToMem[count][1] == clicked[1]
    ) {
        count++;
        console.log(listToMem.length, count);
        if (listToMem.length == count) {
            // console.log("Next round!", listToMem);

            // make bg flash green

            gridcontainer.style["background-color"] = "green";
            setTimeout(function () {
                gridcontainer.style["background-color"] = "#0c355750";
            }, 300);

            setTimeout(() => {
                countToMemorize();
            }, 300);
            count = 0;
        }

        return true;
    } else {
        counter.innerHTML = String("Counter:\n" + String(listToMem.length - 1));
        // console.log("Falsch, es ist vorbei.");
        gridcontainer.style["background-color"] = "red";
        // restartbtn.disabled = false
        // restartbtn.style["display"] = "inline"
        gameover = true;
        setTimeout(function () {
            gridcontainer.style["background-color"] = "#0c355750";
        }, 750);

        return false;
    }
}

function countToMemorize() {
    listToMem.push([]);
    listToMem[listToMem.length - 1].push(Math.floor(Math.random() * size)); 
    listToMem[listToMem.length - 1].push(Math.floor(Math.random() * size));
    let item = 0;
    anzeigen = setInterval(function () {
        try{

            switchcolor(listToMem[item][0], listToMem[item][1]);
        }
        catch{
            // clearInterval(anzeigen);
        }
        item++;
        if (item >= listToMem.length || gameover) {
            console.log("cleared interval");
            clearInterval(anzeigen);
        }
    }, 500);
}

function switchcolor(x, y) {
    grid[x][y].style["background-color"] = "white";
    setTimeout(function () {
        grid[x][y].style["background-color"] = "#ffffff57";
    }, 350);
}

function restart() {
    counter.innerHTML = ""
    gameover = false;
    // restartbtn.style["display"] = "none"
    // restartbtn.disabled = true
    listToMem = [];
    count = 0;
    countToMemorize();
}
