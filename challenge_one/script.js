class ToDoModel {
    constructor(controller) {
        let stored_data = localStorage.getItem("todo_content");
        if (stored_data === null) {
            this.data = [];
        } else {
            this.data = JSON.parse(stored_data);
        }
        
    }

    addNewTodoItem(new_data) {
        this.data.push(new_data);
    }

    saveDataOnLocal() {
        let self = this;
        localStorage.setItem("todo_content", JSON.stringify(self.data));
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
        this.model.saveDataOnLocal()
        this.renderToDoList();


    }

    renderToDoList() {
        this.view.list_container.innerHTML = "";
        let self = this;
        this.model.data.forEach(element => {
            self.view.renderOneItem(element);            
        });

        this.model.data.forEach((item) => {
            item.html_element.querySelector(".delete_button").addEventListener("click", () => {
                self.deleteToDoItem(item);
            });
        });
        
    }

    deleteToDoItem(item) {
        item.is_active = false;
        item.html_element.remove();
        this.model.saveDataOnLocal();
    }
    
    
}


class ToDoView {
    constructor(controller) {
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

            const li_item = document.createElement("li");
            li_item.classList.add("todo_item_li");
            li_item.innerHTML = `
                <label class="container">${obj.description}
                    <input type="checkbox" checked="checked">
                    <span class="checkmark"></span>                    
                </label>
                <a class="delete_button container_bar">
                    <div class="bar_1"></div>
                    <div class="bar_2"></div>
                </a>

            `;
            

            this.list_container.appendChild(li_item);

            this.list_container.querySelector(".delete_button").addEventListener("click", () => {
                this.a
            });

            obj.html_element = li_item;
        }

    }
}


let main_obj = new ToDoController(); 
main_obj.renderToDoList();