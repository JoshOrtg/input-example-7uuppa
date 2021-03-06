import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      isSubmitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event)
  {
    event.preventDefault();

    const username = this.state.name;

    console.log("pressed the submit button");
    this.setState({isSubmitted: true});

    function getAge(username)
    {
      fetch("https://api.agify.io?name=" + username)
    .then((response ) => response.json())
    }
    
    function getGender(username)
    {
      fetch("https://api.genderize.io?name=" + username)
    .then((response ) => response.json())
    }

    function getNation(username)
    {
      fetch("https://api.nationalize.io?name=" + username)
    .then((response ) => response.json())
    }

    Promise.all([
      getAge(username), 
      getGender(username),
      getNation(username),
    ])
    .then(([age_response, gender_response, nation_response]) => 
    {this.setState({
      isSubmitted: true, 
      age: age_response.age, 
      gender: gender_response.gender, 
      nation: nation_response.country[0].country_id})})    
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <div>
        Enter in a your name:
        <input type="text"  onChange={this.handleChange} />
        <button type="submit"> Submit </button>
        {
          this.state.isSubmitted ? "Hello " +  this.state.name + " i think you are " + this.state.age + " and " + this.state.gender + " and you are from " + this.state.nation + ".": ""
        }
        <br />
        
      </div>
      </form>
    );
  }
}

render(<App />, document.getElementById('root'));
