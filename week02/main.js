
function writeCode() {
    const my_input = document.getElementById("my_input");
    const my_div = document.getElementById("my_div");

    my_div.innerHTML = my_input.value;  
}

/*=========================================================================*/

function exersice2() {
    const my_input = document.getElementById("my_input2");
    const my_div = document.getElementById("my_div2");
    my_div.innerHTML = la_suma(parseInt(my_input.value));  
}

const la_suma = function sumar(number) {
    let the_sum = 0;

    for(let i=number; i >= 1; i--) {
        the_sum += i;
    }

    return the_sum;
};

/*=========================================================================*/

function exersice3() {
    const input_a = document.getElementById("input_a");
    const input_b = document.getElementById("input_b");
    const answer = document.getElementById("answer");

    answer.innerHTML = la_adicion(parseInt(input_a.value), parseInt(input_b.value)) ;  
}


const la_adicion = (input_a, input_b) => {
    return input_a + input_b;
};
