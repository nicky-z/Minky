import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {logout} from '../store'

export const Navbar = props => {
  localStorage.removeItem(undefined)
  let calenderName = 'Calender'
  if(props.isLoggedIn) {
    const {username} = props
    let User = localStorage.getItem(username)
    if(User !== undefined&& User !==null){ 
      console.log('parsing localStorage')
      User = JSON.parse(localStorage.getItem(username)) //user is defined, will not call again unless logged out 
    }
    else {
      console.log('setting up default')
      localStorage.setItem( username , JSON.stringify({
          calender: 'Calender',
          event: []
        }
        ));
      User = {
        calender: 'Calender',
        event: []
      }
    }
    if(username){
      calenderName = JSON.parse(localStorage.getItem(username)).calender
    }
  }
return(
  <div>
    <h2>{calenderName}</h2>
    <nav>
      {props.isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Redirect to="/home"/>
          <Link to="/home">Home</Link>
          <Link to ="/calender">Calender</Link>
          <a href="#" onClick={props.handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    isLoggedIn: !!state.auth.id,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
