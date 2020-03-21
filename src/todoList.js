import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import  './todoList.css';

class TodoList extends React.Component {
    constructor (props){
        super (props);
        this.state ={         
            notes: [],
            count: 0,
        }
    }

    componentDidMount(){
        this.getUser()
    }

    getUser(){
    fetch('https://assets.breatheco.de/apis/fake/todos/user/maive', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => {
            if (resp.ok === true) {
                this.getTodos()
            } else {
                this.createUser()
            }
        })
        .then(data => {
            console.log(data.label)
        })
        .catch(error => {
            console.log(error);
        });
}

    createUser(){
        fetch('https://assets.breatheco.de/apis/fake/todos/user/maive', {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error);
        });
    }

    getTodos(){
        fetch('https://assets.breatheco.de/apis/fake/todos/user/maive',{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                    return resp.json()
            })
            .then(data => {
                this.setState({
                    notes: data,
                    count: data.length
                })
                console.log(data.label)
            })
            .catch(error => {
                console.log(error);
            });
    }
    

    addNotes = (e) => {       
        if(e.keyCode === 13 && e.target.value !== ''){
            let newState = Object.assign({}, this.state);
            newState.notes.push({label:e.target.value, done: false});
            console.log(newState.notes) 
            
            fetch('https://assets.breatheco.de/apis/fake/todos/user/maive', {
                method: "PUT",
                body: JSON.stringify( newState.notes.map((item => item))),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    return resp.json();
                })
                .then(data => {
                    console.log(data);
                    this.getTodos()
                })
                .catch(error => {
                    console.log(error);
                });
            
        e.target.value='';
        }       
    }
    

    deleteNotes = (e) => {
        let newState = Object.assign({},this.state);
        newState.notes.splice(e,1);       
        fetch('https://assets.breatheco.de/apis/fake/todos/user/maive', {
            method: "PUT",
            body: JSON.stringify( newState.notes.map((item => item))),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                console.log(data);
                this.getTodos()
            })
            .catch(error => {
                console.log(error);
            });
   }
   deleteAllNotes = (e) => {
    let newState = Object.assign({}, this.state);
    newState.notes.splice(0, newState.notes.length)
    fetch('https://assets.breatheco.de/apis/fake/todos/user/maive', {
        method: "PUT",
        body: JSON.stringify([{'label': 'there are no notes', 'done': false}]),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            console.log(data);
            this.getTodos();
        })
        .catch(error => {
            console.log(error);
        });
}


    render () {
        return (
            <div className='container m-auto todolist'>
                <div className='card m-auto p-3 overflow-auto'>
                    <div className='row'>
                        <div className='col col-lg-6  m-auto text-center'>
                            <h1 className='title'>Todos</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col col-lg-10 m-auto'>
                            <ul className='row list-group'>
                            <input className='form-control-lg ' type='text' placeholder='What needs to be done?' onKeyDown={(e) => this.addNotes(e)}></input>
                            {this.state.notes.map((item,i)=>{
                                return <li key={i} className='list-group-item d-flex justify-content-between align-items-center '>{item.label} <button type="button" className="btn btn-sm"  onClick={(e)=> this.deleteNotes(e)}><FontAwesomeIcon icon={faTrash} /></button></li>})}
                            <li className="d-inline counter list-group-item">
                                <span className='col-3 offset-10'>{this.state.count-1} Todo's </span>
                            </li>
                            </ul>
                        </div>
                    </div> 
                    <div className="row ">
                        <button className='btn btn-sm col-3 offset-9 bg-info' type="button" onClick={(e) => this.deleteAllNotes(e)}>Delete All Notes</button>
                    </div>
                </div>    
            </div>
        )
    }

}

export default TodoList




