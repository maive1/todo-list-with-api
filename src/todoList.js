import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./todoList.css";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      count: 0,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/maive", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok === true) {
          this.getTodos();
        } else {
          this.createUser();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createUser() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/maive", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTodos() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/maive", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const notes = data.filter(
          (note) => note.label !== "there are no notes"
        );
        this.setState({
          notes: notes,
          count: notes.length,
        });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addNotes = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      let newState = Object.assign({}, this.state);
      newState.notes.push({ label: e.target.value, done: false });

      fetch("https://assets.breatheco.de/apis/fake/todos/user/maive", {
        method: "PUT",
        body: JSON.stringify(newState.notes.map((item) => item)),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          console.log(data);
          this.getTodos();
        })
        .catch((error) => {
          console.log(error);
        });

      e.target.value = "";
    }
  };

  deleteNotes = (deletedNote) => {
    let notes = this.state.notes.filter((elem) => elem.label !== deletedNote);

    if (notes.length === 0)
      notes = [{ label: "there are no notes", done: false }];

    fetch("https://assets.breatheco.de/apis/fake/todos/user/maive", {
      method: "PUT",
      body: JSON.stringify(notes),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        this.getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteAllNotes = (e) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/maive", {
      method: "PUT",
      body: JSON.stringify([{ label: "there are no notes", done: false }]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        this.getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container m-auto todolist">
        <div className="card m-auto p-3">
          <div className="row">
            <div className="col col-lg-6  m-auto text-center">
              <h1 className="title">Todo's</h1>
            </div>
          </div>
          <div className="row">
            <div className="col col-lg-10 m-auto">
              <ul className="row list-group">
                <input
                  className="form-control-lg "
                  type="text"
                  placeholder="What needs to be done?"
                  onKeyDown={(e) => this.addNotes(e)}
                ></input>
                {this.state.notes?.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between align-items-center "
                    >
                      {item.label}{" "}
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => this.deleteNotes(item.label)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  );
                })}
                <li className="d-inline counter list-group-item">
                  <span>{`${this.state.count} Todo's`}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="row row-delete-button">
            <button
              className="btn btn-sm col-3 offset-9 bg-info align-items-end button-delete"
              type="button"
              onClick={(e) => this.deleteAllNotes(e)}
            >
              Delete All Notes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
