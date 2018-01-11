import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';


class App extends Component {

  state = {
    thingsToDo: [
      {id: 0, title: 'Learn React', complete: true},
      {id: 1, title: 'Deadlift', complete: false},
      {id: 2, title: 'Squat', complete: false}
    ]
  }

  componentDidMount = () => {
    this.toDoInput.focus();
  }

  addToDo = (event) => {
    event.preventDefault();
    const id = Math.random() * 100000;
    if (this.toDoInput.value) {
       let newToDos = this.state.thingsToDo.concat({
          id,
          title: this.toDoInput.value,
          complete: false
       });
       this.setState({
          thingsToDo: newToDos,
          lastId: id
       });
       this.toDoInput.value = '';
    }
 }

  completedEventsExist = () => {
    for(let i=0; i<this.state.thingsToDo.length; i++) {
      if(this.state.thingsToDo[i].complete) {
        return true;
      }
    }
    return false;
  }

  toggleCompleted = (id) => {
    let updatedToDos = this.state.thingsToDo.map((curr) => {
      if(curr.id === id) {
        curr.complete = !curr.complete;
      }
      return curr;
    });
    this.setState({thingsToDo: updatedToDos})
  }

  removeItem = (id) => {
    let updatedToDos = this.state.thingsToDo.filter( currentValue => {
      return currentValue.id !== id
    })
    this.setState({thingsToDo: updatedToDos});
  }

  removeCompleted = () => {
     let updatedToDos = this.state.thingsToDo.filter((currentValue ) => {
        return !currentValue.complete;
     });
     this.setState({
       thingsToDo: updatedToDos
     })
  }

  render() {

    let myList = this.state.thingsToDo.map((curr) => {
      return <ToDoItem key={curr.id} 
            item={curr} 
            removeItem={() => this.removeItem(curr.id)} 
            toggleCompleted={()=>this.toggleCompleted(curr.id)} />
    })

    let clearButton = null;
    if(this.completedEventsExist()) {
      clearButton = <ClearButton removeCompleted={this.removeCompleted} />
    }

    return (
      <div className="todo-list"> 
        <h1> To Do App </h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
              <input type="text" ref={(input) => (this.toDoInput = input)} />
              <span>(press enter to add)</span>
          </form>
        </div>
        <ul> {myList} </ul>
        <div className="todo-admin">
          <ToDoCount numberOfTodos={this.state.thingsToDo.length} />
          {clearButton}
        </div>
      </div>
    );
  }
}

const ToDoItem = (props) => {
  return(
    <li>{props.item.title}
    <input
       type="checkbox"
       id={props.item.id}
       checked={props.item.complete} 
       onChange={props.toggleCompleted}/>
    <label htmlFor={props.item.id}></label>
    <button onClick={props.removeItem}>
       <i className="fa fa-trash"></i>
    </button>
 </li>
  );
}

const ToDoCount = (props) => {
  return (
    <div>
      <strong> ToDos: </strong> {props.numberOfTodos} 
    </div>
  );
}

const ClearButton = (props) => {
  return (
    <button onClick={props.removeCompleted}> Clear </button>
  );
}

export default App;


ToDoCount.propTypes = {
  numberOfTodos: PropTypes.number.isRequired
}

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
}

ToDoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  })
}