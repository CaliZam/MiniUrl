import React, { useState } from 'react'
import validator from 'validator';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

function App() {

  const [url, setUrl] = useState('');
  const [link, setLink] = useState('');
  const [shortcodeToCheck, setShortcodeToCheck] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory()


  const handleChange = (e) => {
    setErrorMessage('')
    setUrl(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const isValidUrl = validator.isURL(url, { require_protocol: true })

    if (!isValidUrl) {
      alert('Please write a correct URL including the http(s) protocol')
    } else {
      axios.get(`http://localhost:8080/api/shorter/?url=${url}`)
        .then(doc => {
          setErrorMessage(`Created with code ${doc.data}`);
          setLink(`http://localhost:8080/${doc.data}`)
        })
        .catch(err => {
          setErrorMessage(err.response.data)
        })
    }
  }

  const handleRetrieve = (e) => {
    setShortcodeToCheck(e.target.value);
  }

  const handleStats = (e) => {
    e.preventDefault();
    const isValidshortcode = shortcodeToCheck.match(/^\s*(?:\S\s*){1,20}$/);

    if (!isValidshortcode) {
      alert('The shortcode is not correct');
    } else {
      axios.get(`http://localhost:8080/api/retrieve/${shortcodeToCheck}/stats`)
        .then(doc => {
          const { url, visits, shortcode, lastVisit, created } = doc.data
          history.push({pathname: `/${shortcodeToCheck}/stats`,  data:{ url, visits, shortcode,lastVisit, created }});
        })
        .catch(err => console.log(err))
    }
  }

  return <>
    <div className="App">
      <form onSubmit={handleOnSubmit} id='shorter'>
        <fieldset>
          <legend>Reduce your URL</legend>
          <p><strong>URL</strong></p>
          <input
            type='text' name='url' placeholder='enter the original URL'
            onChange={handleChange}>
          </input><br></br>
          {/* TODO custom link */}
          <p><strong>Customize your link</strong></p>
          <input
            type='text' name='url' placeholder='custom link'
            onChange={handleChange}>
          </input><br></br><br></br>
          <button type='submit' form='shorter'>Shorter</button>

          {!!errorMessage && <p>{errorMessage}</p>}
          {link && <div className='result'>
            <strong>Click to redirect:</strong><br></br>
            <a href={link} target='blank' >{link}</a>
          </div>}
        </fieldset>
      </form>
      <form onSubmit={handleStats} id='retrieve'>
        <fieldset>
          <legend>Check URL Stats</legend>
          <input
            type='text' name='shortcode' placeholder='enter your MiniUrl'
            onChange={handleRetrieve}>
          </input><br></br><br></br>
          <button type='submit' form='retrieve'>Retrieve</button>
        </fieldset>
      </form>
    </div>
  </>
}



export default App;

