let x = document.getElementsByTagName("audio");
let list_audio = [...x];
let list_html = [...document.getElementsByTagName("button")];
let counter = 0;
let final_list = [];

list_audio.forEach((item) => {

    let a = list_audio[counter];
    let b = list_html[counter];
    final_list[counter] = { audio : a, html: b, down: false};


    
    counter+=1;
});

final_list.forEach((item) => {
    
    document.addEventListener("keydown", (event) => {
        if(!event.repeat && event.keyCode == item.audio.dataset.key) {
            item.audio.currentTime = 0;
            item.audio.play();
            item.html.classList.add("playing");
            item.html.classList.add("pressing");

            setTimeout(function () {
                item.html.classList.remove("pressing");                
            }, 10000);
        }
        
    }, false);

    document.addEventListener("keyup", () => {
        item.down = false;
        item.html.classList.remove("pressing");
    })

    item.audio.addEventListener("ended", () => {
        item.html.classList.remove("playing");
    })
})