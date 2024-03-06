let size = 3;
const gridcontainer = document.getElementById("grid-container");
const restartbtn = document.getElementById("restart-btn");
const counter = document.getElementById("counterh1");
let grid = [];
let listToMem = [];
let count = 0;
let notgameover = true;
let displaying = false;
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
            if (!displaying) {
                corretMem([row, col]);
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
        if (listToMem.length == count) {
            // make bg flash green
            counter.innerHTML = String(String(listToMem.length));
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
        counter.innerHTML = String("Streak:\n" + String(listToMem.length - 1));
        gridcontainer.style["background-color"] = "red";
        // restartbtn.disabled = false
        // restartbtn.style["display"] = "inline"
        notgameover = false;
        setTimeout(function () {
            gridcontainer.style["background-color"] = "#0c355750";
        }, 750);

        return false;
    }
}

function countToMemorize() {
    displaying = true;
    listToMem.push([]);
    listToMem[listToMem.length - 1].push(Math.floor(Math.random() * size));
    listToMem[listToMem.length - 1].push(Math.floor(Math.random() * size));
    let item = 0;
    anzeigen = setInterval(function () {
        try {
            switchcolor(listToMem[item][0], listToMem[item][1]);
        } catch {
            // clearInterval(anzeigen);
        }
        item++;
        if (item >= listToMem.length || notgameover) {
            clearInterval(anzeigen);
            setTimeout(function (){
                displaying = false;
            },300)
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
    counter.innerHTML = "";
    notgameover = true;
    // restartbtn.style["display"] = "none"
    // restartbtn.disabled = true
    listToMem = [];
    count = 0;
    countToMemorize();
}
