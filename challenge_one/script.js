class ToDoModel {
    constructor(controller) {
        this.data = [];
    }

    addNewTodoItem(new_data) {
        this.data.push(new_data);
    }

    
    
}

class ToDoController{
    constructor() {
        let self = this;
        this.model = new ToDoModel(self);
        this.view = new ToDoView(self);    

    }

    createNewTodoItem(todo_description) {
        let new_todo_item = {
            description: todo_description,
            is_active: true
        }

        this.model.addNewTodoItem(new_todo_item);
        this.renderToDoList();
    }

    renderToDoList() {
        this.view.list_container.innerHTML = "";
        let self = this;
        this.model.data.forEach(element => {
            self.view.renderOneItem(element);
        });
        
    }

    
}


class ToDoView {
    constructor(controller) {
        let self = this;
        this.search_button = document.querySelector(".add_todo_button");
        this.text_area = document.querySelector(".todo_description");
        this.list_container = document.querySelector(".todos_container");

        this.search_button.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("asda");
            controller.createNewTodoItem(self.text_area.value);
        });

    }

    renderOneItem(obj) {
        const li_item = document.createElement("li");
        li_item.classList.add("todo_item_li");
        li_item.innerHTML = `
            <input type="checkbox">
            <label>${obj.description}</label>
            <a class="delete_button">X</a>
        `;

        this.list_container.appendChild(li_item);
    }



}


let main_obj = new ToDoController(); 