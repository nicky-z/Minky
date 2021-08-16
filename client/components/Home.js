import React,  { useState} from 'react';
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props
  console.log(props.username)
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
            localStorage.setItem('calender', calTitle)
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
