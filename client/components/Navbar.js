import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}, props) => {
  const {username} = props
  //let getUser = JSON.parse(localStorage.getItem(username))
  //console.log('navbar',JSON.parse(localStorage.getItem('rarity')).calender)
  let User = localStorage.getItem(username)
  console.log('on refresh',User)
    if(User){ //if user is undefined & stuff in localstorage, aka login to new account
      User = JSON.parse(localStorage.getItem(username)) //user is defined, will not call again until logging out 
    }
    else {
      localStorage.setItem( username , JSON.stringify(
        {
          calender: '',
          testevent: []
        }
        ));
        User = {
          calender: '',
          testevent: []
        }
    }
  let calenderTitle = User.calender

return(
  <div>
    <h2>{calenderTitle}</h2>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to ="/calender">Calender</Link>
          <a href="#" onClick={handleClick}>
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
    isLoggedIn: !!state.auth.id,
    username: state.auth.username
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
