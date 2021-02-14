

export default class ToDoView {
    constructor(controller) {
        this.controller = controller;
        let self = this;
        this.add_button = document.querySelector(".add_todo_button");
        this.text_area = document.querySelector(".todo_description");
        this.list_container = document.querySelector(".todos_container");

        this.add_button.addEventListener("click", (event) => {
            event.preventDefault();
            controller.createNewTodoItem(self.text_area.value);
        });
    }

    renderOneItem(obj) {

        if (obj.is_active == true) {

            let check_or_not = (obj.was_accomplished === true ? 'checked="checked"': '');

            const li_item = document.createElement("li");
            li_item.classList.add("todo_item_li");
            li_item.innerHTML = `
                <label class="container">${obj.description}
                    <input class="check_or_not" type="checkbox" ${check_or_not}>
                    <span class="checkmark"></span>                    
                </label>
                <a class="delete_button container_bar">
                    <div class="bar_1 bar"></div>
                    <div class="bar_2 bar"></div>
                </a>

            `;

            

            this.list_container.appendChild(li_item);            

            obj.html_element = li_item;
            this.renderTheAccomplishment(obj)

        }

    }

    renderTheAccomplishment(item) {
        if (item.was_accomplished === true) {
            item.html_element.querySelector(".container").classList.add("checked");
        } else{
            item.html_element.querySelector(".container").classList.remove("checked");
        }
        
    }

    renderCounter(number) {
        document.querySelector(".task_left").innerHTML = `${number} left`;
        console.log(number);
    }

    
}
