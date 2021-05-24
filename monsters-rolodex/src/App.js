import React, { Component } from "react";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

import "./App.css";

class App extends Component {
  /**
   * constructor inializes the App component.
   */
  constructor() {
    /**
     * super() calls the constructor method on the component class.
     * This give you access to "this" and therefore the state object.
     */
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };

    /**
     * Because of the way Javascript binds the "this" context in a class method to the method
     * we need to explicitly bind the method to the context of the parent component by calling
     * bind() on the method and passing in "this" with the component context.
     */
    //this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Using the arrow function syntax to define a method automatically binds the "this" context
   * to the parent context which is the component in which the method is defined.  This does
   * away with the need to explicitly bind the "this" context in the constructor.
   */
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  /**
   * When the app loads, go get (fetch) the user data and set the monsters state object.
   */
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  /**
   * Pass the monsters state object as a prop into the Cardlist component.
   */
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="Search Monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
