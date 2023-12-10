const fieldsContainer = document.querySelector(".fields__container");

let canChangeVector = true;
let vector = "ArrowRight";
let fields = [...Array(15)].map((el, i) => (el = [...Array(17)].map((el, j) => (el = 0))));
let tail = {
    x: 0,
    y: 0,
};
let head = {
    x: 1,
    y: 0,
};
const history = [{ ...tail }, { ...head }];
fields[tail.y][tail.x] = 1;
fields[head.y][head.x] = 1;
const vectorSides = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"]

createApple(fields);

for (let i = 0; i < fields.length; i++) {
    fieldsContainer.innerHTML += "<div class='fields__row'></div>";
}

const fieldsRow = document.querySelectorAll(".fields__row");

render(fields, fieldsRow);

let interval = setInterval(function run() {
    fields[history[0].y][history[0].x] = 0;
    
    switch (vector) {
        case "ArrowUp":
            if (head?.y > 0 && fields[head.y - 1][head.x] !== 1) {
                if (fields[head.y - 1][head.x] === 2) {
                    createApple(fields);
                } else history.shift()
                fields[--head.y][head.x] = 1;
            } else {
                clearInterval(interval);
            }
            break;
        case "ArrowRight":
            if (head.x < 16 && fields[head.y][head.x + 1] !== 1) {
                if (fields[head.y][head.x + 1] === 2) {
                    createApple(fields);
                } else history.shift()
                fields[head.y][++head.x] = 1;
            } else {
                clearInterval(interval);
            }
            break;
        case "ArrowDown":
            if (head.y < 14 && fields[head.y + 1][head.x] !== 1) {
                if (fields[head.y + 1][head.x] === 2) {
                    createApple(fields);
                } else history.shift()
                fields[++head.y][head.x] = 1;
            } else {
                clearInterval(interval);
            }
            break;
        case "ArrowLeft":
            if (head.x > 0 && fields[head.y][head.x - 1] !== 1) {
                if (fields[head.y][head.x - 1] === 2) {
                    createApple(fields);
                } else history.shift()
                fields[head.y][--head.x] = 1;
            } else {
                clearInterval(interval);
            }
            break;
    }

    history.push({ x: head.x, y: head.y });

    canChangeVector = true;

    render(fields, fieldsRow);
}, 200);

document.addEventListener("keydown", function (event) {
    arrowClickHadling(event.key)
});

let buttons = document.querySelectorAll(".arrow")
for (let button of buttons) {
    button.addEventListener("click", function(event) {
        arrowClickHadling(event.target.classList[1])
    })
}

function render(fieldsNode, fieldsRowNode) {
    for (let i = 0; i < fieldsNode.length; i++) {
        fieldsRowNode[i].innerHTML = "";
        for (let j = 0; j < fieldsNode[i].length; j++) {
            let classes = "field";
            let field = fieldsNode[i][j];

            if (field === 0) classes += " empty";
            else if (field === 1) classes += " zmeika";
            else if (field === 2) classes += " apple";

            fieldsRowNode[i].innerHTML += `<div class='${classes}'></div>`;
        }
    }
}

function createApple(fieldsNode) {
    let x = randomInteger(0, 14);
    let y = randomInteger(0, 16);
    if (fieldsNode[x][y] === 0) fieldsNode[x][y] = 2;
    else createApple(fieldsNode)
}

function arrowClickHadling(key) {
    if (
        canChangeVector &&
        !(vector == "ArrowUp" && key == "ArrowDown") &&
        !(vector == "ArrowDown" && key == "ArrowUp") &&
        !(vector == "ArrowRight" && key == "ArrowLeft") &&
        !(vector == "ArrowLeft" && key == "ArrowRight") &&
        (vectorSides.includes(key))
    ) {
        vector = key;
        canChangeVector = false;
    }
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
