import ToDoModel from "./ToDoModel.js";
import ToDoView from "./ToDoView.js";


export default class ToDoController{
    constructor() {
        let self = this;
        this.model = new ToDoModel(self);
        this.view = new ToDoView(self);    

    }

    createNewTodoItem(todo_description) {
        let new_todo_item = {
            description: todo_description,
            is_active: true,
            was_accomplished: false
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
            if (item.is_active === true) {
                item.html_element.querySelector(".delete_button").addEventListener("click", () => {
                    self.deleteToDoItem(item);
                });

                item.html_element.querySelector(".check_or_not").addEventListener("click", () => {

                    console.log("state changed");
                    if (item.was_accomplished === true) {
                        item.was_accomplished = false;
                    } else {
                        item.was_accomplished = true;
                    }

                    self.model.saveDataOnLocal();
                    
                });
            }            
        });
        
    }

    deleteToDoItem(item) {
        item.is_active = false;
        item.html_element.remove();
        this.model.saveDataOnLocal();
    }
    
    
}
