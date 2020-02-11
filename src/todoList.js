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
  

    addNotes = (e) => {       
        
        if(e.keyCode === 13 && e.target.value !== ''){
        this.setState({            
            notes: this.state.notes.concat(e.target.value),
            count: this.state.count + 1
            
        });         
        e.target.value='';
        }       
    }
    

    deleteNotes = (i) => {
        let newState = Object.assign({},this.state);
        newState.notes.splice(i,1);       
        this.setState({
            newState,
            count: this.state.count - 1
        })
    }


    render () {
        return (
            <div className='container m-auto'>
                <div className='card m-auto p-3 overflow-auto'>
                    <div className='row'>
                        <div className='col col-lg-6  m-auto text-center'>
                            <h1 className='title'>Todos</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col col-lg-10 m-auto'>
                            <ul className='list-group'>
                            <input className='form-control-lg' type='text' placeholder='What needs to be done?' onKeyDown={(e) => this.addNotes(e)}></input>
                            {this.state.notes.map((item,i)=>{
                                return <li key={i} className='list-group-item d-flex justify-content-between align-items-center '>{item} <span  onClick={(i)=> this.deleteNotes(i)}><FontAwesomeIcon icon={faTrash} /></span></li>})}
                            <div className='count list-group-item'>{this.state.count} item left</div>
                            </ul>
                        </div>
                    </div> 
                </div>               
            </div>
        )
    }

}

export default TodoList