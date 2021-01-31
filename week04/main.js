
console.log("externo");

const board = document.getElementById("board");
console.log([...board.children]);

let bolean=true;

let board_array = [...board.children];

let x_array = [];
let o_array = [];

let array_of_array = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];





board_array.forEach(function(item) {
    item.addEventListener("click", (event) => touchAndClick(event.target));
})


function touchAndClick(target) {
    let valor_interno = target.innerHTML;

    if(bolean === true && valor_interno === "") {        
        target.innerHTML = "X";
        bolean = false;
        x_array.push( parseInt(target.id));

        console.log(x_array.length);

        if(x_array.length>=3){
            if (checkWin(x_array)) {
                document.getElementById("win_message").innerHTML = "Jugador con 'X', Ganaste!";
            } else if (x_array.length > 4) {
                document.getElementById("win_message").innerHTML = "Juego empatado";                
            }
            
        } 

    } else if(bolean === false && valor_interno ==="") {        
        bolean = true;        
        target.innerHTML = "O";
        o_array.push( parseInt(target.id));
        console.log(o_array.length);
        if(o_array.length>=3) {
            if(checkWin(o_array)) {
                document.getElementById("win_message").innerHTML = "Jugador con 'O', Ganaste!";                
            } else if(o_array.length > 4) {
                document.getElementById("win_message").innerHTML = "Juego empatado";                
            }
        } 
        
    }


}


const reset_button = document.getElementById("reset");
reset_button.addEventListener("click", function() {
    board_array.forEach(function(item) {
        item.innerHTML = "";
        o_array=[];
        x_array=[];
        document.getElementById("win_message").innerHTML = "";


    })
});

function checkWin(tictac_array) {
    let check;
    tictac_array = tictac_array.sort();

    for(let i=0; i<array_of_array.length; i++) {


        check = array_of_array[i].every((el) => {
            return tictac_array.indexOf(el) !== -1;
        });        

        if(check) break;
    }

    return check;
}


























