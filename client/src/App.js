import React, { useState } from 'react'
import './App.css';
import validator from 'validator';
import axios from 'axios';

function App() {

  const [url, setUrl] = useState('');
  const [link, setLink] = useState('');
  const [hash, setHash] = useState('');

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // const regEx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
    // const isValidUrl = url.match(regEx);
    const isValidUrl = validator.isURL(url, { require_protocol: true })

    if (!isValidUrl) {
      //TODO: feedack when exist and when is not the correct format
      alert('Please write a correct URL including the http(s) protocol')
    } else {
      axios.post('http://localhost:8080/api/shorter', {
        url: url
      })
        .then(doc => {
          console.log(doc);
          //answer from server
          setLink(`http://mini.url/${doc.data.hash}`);

        })
    }
  }

  const handleRetrieve  = (e) => {
    setHash(e.target.value);
  }

  const handleStats = (e) => {
    e.preventDefault();
    const isValidHash = hash.match(/^\s*(?:\S\s*){1,20}$/);

    if(!isValidHash) {
      alert('The hash is not correct');
    } else {
      axios.get(`http://localhost:8080/${hash}`)
      .then(doc => console.log(doc))
      .catch(err => console.log(err))
    }
    

  }

  return <>
    <div className="App">
      <form onSubmit={handleOnSubmit} id='shorter'>
        <fieldset>
          <legend>Reduce your URL</legend>
          <input
            type='text' name='url' placeholder='enter the original URL'
            onChange={handleChange}>
          </input>
          <button type='submit' form='shorter'>Shorter</button>
        </fieldset>
      </form>
      <div className='result'>
        <span>{link}</span>
      </div>
      <form onSubmit={handleStats} id='retrieve'>
        <fieldset>
          <legend>Check your Custom URL</legend>
          <input
            type='text' name='url' placeholder='enter your MiniUrl'
            onChange={handleRetrieve}>
          </input>
          <button type='submit' form='retrieve'>Retrieve</button>
        </fieldset>
      </form>
    </div>
  </>
}



export default App;

// import React, { Component } from 'react'
// class App extends Component {

//   state = {
//     url: '',
//     link: ''
//   }

//   handleChange = (e) => {
//     this.setState({
//       url: e.target.value
//     })
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();

//     const isValidUrl = validator.isURL(this.state.url, { require_protocol: true })

//     if (!isValidUrl) {

//       alert('Please write a correct URL including the http(s) protocol')
//     } else {
//       axios.post('http://localhost:8080/api/shorter', {
//         url: this.state.url
//       })
//         .then(doc => {
//           //answer from server
//           this.setState({
//             link: `http://mini.url/${doc.data.hash}`
//           })

//         })
//     }
//   }
// }