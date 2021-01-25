import React, { Component } from 'react'
import './App.css';

class App extends Component {

  state = {
    url: '',
    link: ''
  }

  render() {
    return (
      <div className="App">
        <fieldset>
          <legend>URL</legend>
          <input type='text' name='url' placeholder='enter the original URL'></input>
          <input type='submint' value='shorter'></input>
        </fieldset>
        <div className='result'>
          <span>{ this.state.link}</span>
        </div>
      
      </div>
    );
  }
}


export default App;
