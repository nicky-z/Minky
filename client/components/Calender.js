import React, { useState, useEffect } from 'react';
import {Day} from './Day';
import { DeleteEventModal } from './DeleteEvent';
import { NewEventModal } from './NewEvent';
import {connect} from 'react-redux'

export const Calender = props => {

    const [nav, setNav] = useState(0); 
    const [clickedDay, setClickedDay] = useState();
    const [events, setEvents] = useState(localStorage.getItem('events') ?  JSON.parse(localStorage.getItem('events')) : []);
      //^^^events is an array, starts with getting all events for all days from localStorage
    
    const eventsOnDay = date => events.find(event => event.date === date); //getting events for a specific day from events[]
    
    useEffect(() => {
      localStorage.setItem('events', JSON.stringify(events));}, [events]); //everytime events state changes, useEffect sets them onto the localStorage
    
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dt = new Date(); //returns new date object of current date & time
    if (nav !== 0) { //while nav is NOT current month
      dt.setMonth(new Date().getMonth() + nav); //set dt to current month (num) + nav (to render right month)
    }
    const day = dt.getDate(); //ex: 15
    const month = dt.getMonth(); //ex: Aug = 7
    const year = dt.getFullYear(); //ex: 2017
    //const firstDayOfMonth = new Date(year, month, 1); //logging the first day of current nav month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); //month+1, 0 gives you last day of current nav month
    const firstDayOfMonthStr = new Date(year, month, 1).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric', 
        month: 'long',
        day: 'numeric',
    });
    const monthStr = (firstDayOfMonthStr.split(', ')[1]).slice(0,-2)
    const paddingDays = weekdays.indexOf(firstDayOfMonthStr.split(', ')[0]); //Get the day of the weekday-> ex: Friday, January 1, 2021
    //paddingDays = the index of Friday in weekdays array

    const daysArr = [];
    for(let i = 1; i <= paddingDays + daysInMonth; i++) { 
      const dateString = `${month + 1}/${i - paddingDays}/${year}`; // ' 7/7/2017 '
      if (i > paddingDays) { 
        daysArr.push(
          {
            date: (i - paddingDays),
            event: eventsOnDay(dateString),
            isToday: (nav === 0 && i - paddingDays === day),
            value: dateString
          })
        }
      else if (i < paddingDays){
        daysArr.push (
          {
            date: 'padding',
            event: null,
            isToday: false,
            value: ''
          }
        )
      }
    }

    return (
        <div id="container">
            <div id="header">
                <div id="monthDisplay">{monthStr}</div>
                <div>
                    <button onClick={() => setNav(nav - 1)} id="backButton">Back</button>
                    <button onClick={() => setNav(nav + 1)} id="nextButton">Next</button>
                </div>
            </div>

            <div id="weekdays">
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
            </div>

            <div id="calender">
            {daysArr.map((day, index) => (
            <Day key={index} day={day} onClick={() => { 
                if (day.date !== 'padding'){ 
                    setClickedDay(day.value); //setting the date value for event functionality
                }
            }}/>))}
            </div>
    
    {clickedDay && !eventsOnDay(clickedDay) && //if day has been clicked, and no events on day, open new event form
        <NewEventModal 
          onClose={() => setClickedDay(null)} //if closed, user has changed their mind, set date on state to null
          onSave={title => { //if saved, save event & it's date onto events[] /-> useEffect -> localStorage
            setEvents([ ...events, { title, date: clickedDay }]);
            setClickedDay(null);//set clicked day to null
          }}
        />
      }

      {clickedDay && eventsOnDay(clickedDay) && //if day has been clicked and yes events on day
        <DeleteEventModal 
          eventText={eventsOnDay(clickedDay).title} //get title of event
          onClose={() => setClickedDay(null)} //if closed, set clicked day to null
          onDelete={() => { //if delete, remove event from events arr
            setEvents(events.filter(e => e.date !== clickedDay));
            setClickedDay(null); // set clicked date to null
          }}
        />
      }
    </div>
    );
  }
const mapState = state => {
  return {
    username: state.auth.username
  }
}
export default connect(mapState)(Calender)