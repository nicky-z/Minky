import React,  { useState} from 'react';
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props
  console.log(localStorage)
  const getUser = JSON.parse(localStorage.getItem(username))
  const [calTitle, setCalTitle] = useState('');

  return (
    <div>
      <h3>Welcome, {username}</h3>

      <input 
          value={calTitle} 
          onChange={e => setCalTitle(e.target.value)} 
          id="CalTitleInput" 
          placeholder="Calender Title" 
        />

        <button 
          onClick={() => {
            getUser.calender = calTitle
            localStorage.setItem(username, JSON.stringify(getUser))
          }}
          id="saveButton">Save</button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
