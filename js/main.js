let links = [
    {
        "label":"Week One",
        "link":"week1/index.html"
    }
]

const ol_parent =  document.getElementById("main-links-container-id");

links.forEach(createHTML);

function createHTML(item) {
    console.log(item.label);
    console.log(item.link);

    let li_item = document.createElement("li");
    let a_item = document.createElement("a");
    a_item.innerHTML = item.label;
    a_item.href= item.link;
    li_item.appendChild(a_item);
    ol_parent.appendChild(li_item);

}