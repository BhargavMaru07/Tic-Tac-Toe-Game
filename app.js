let turn = 'X';
let boxs = document.querySelectorAll(".box");
let winnerText = document.querySelector(".winner");
let turnValue = document.querySelector(".turn-text");
let Reset = document.querySelector(".Reset");
let winSong = new Audio("win.mp3");

let patterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function handleclick(e) {
    let box = e.target;
    if (box.innerHTML !== "X" && box.innerHTML !== "0") {
        box.innerHTML = turn;

        if (checkWin()) {
            winnerText.innerHTML = `Congratulations! ${turn} Won The Game`;
            winSong.play();
            disabled();
            setTimeout(handleReset,1500);
        } else {
            turn = changeTurn();
            turnValue.innerHTML = `Turn Value: ${turn}`;
        }
    }
}

boxs.forEach((box) => {
    box.addEventListener("click", handleclick);
});

const changeTurn = () => {
    return turn === 'X' ? '0' : 'X';
}

const checkWin = () => {
    for (let pattern of patterns) {
        let pos1 = boxs[pattern[0] - 1].innerHTML;
        let pos2 = boxs[pattern[1] - 1].innerHTML;
        let pos3 = boxs[pattern[2] - 1].innerHTML;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                return true;
            }
        }
    }
    return false;
}

const disabled = () => {
    boxs.forEach((box) => {
        box.removeEventListener("click", handleclick);
    });
}

function handleReset (){
    turn = "X";
    boxs.forEach((box) => {
        box.innerHTML = "";
    });
    turnValue.innerHTML = `Turn Value: ${turn}`;
    winnerText.innerHTML = "";
    boxs.forEach((box) => {
        box.addEventListener("click", handleclick);
    });
}
Reset.addEventListener("click", handleReset);
