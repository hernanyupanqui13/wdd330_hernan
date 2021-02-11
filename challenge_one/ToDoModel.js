import ToDoController from "./ToDoController.js";

export default class ToDoModel {
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