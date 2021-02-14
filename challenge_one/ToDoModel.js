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

    leftTaskCounter() {
        let counter = 0;
        let list = this.data;

        list.forEach((element) => {
            if (element.was_accomplished == false) {
                counter += 1;
            }
        });
        return counter;
    }

    deleteObj(item_to_delete) {
        let the_list = this.data;
        let new_list = the_list.filter((element) => {
            if (element != item_to_delete) {console.log("se va a eliminar");}
            return element != item_to_delete
        });

        this.data = new_list;
    }
    
    getActiveTask(){
        let response =  this.data.filter((element) => {
            return element.was_accomplished === false;
        })

        return response;
    }

    getCompleteTasks() {
        
        let response = this.data.filter((element) => {
            return element.was_accomplished === true;
        });
        
        return response;
        
    }

    
}