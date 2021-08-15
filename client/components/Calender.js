import React, { useState, useEffect } from 'react';
import { CalendarHeader } from './CalenderHeader';
import {Day} from './Day';

export const Calender = () => {
    const [nav, setNav] = useState(0); 
    const [dateDisplay, setDateDisplay] = useState('');
    const [days, setDays] = useState([]);
    const [events, setEvents] = useState(localStorage.getItem('events') ? 
          JSON.parse(localStorage.getItem('events')) : 
          []
      );

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dt = new Date(); //returns new date object of current date & time
    if (nav !== 0) { //while nav is NOT current month
        dt.setMonth(new Date().getMonth() + nav); //set dt to current month (num) + nav (to render right month)
    }
    const day = dt.getDate(); //ex: 15
    const month = dt.getMonth(); //ex: Aug = 7
    const year = dt.getFullYear(); //ex: 2017
    const firstDayOfMonth = new Date(year, month, 1); //logging the first day of current nav month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); //month+1, 0 gives you last day of current nav month
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long', //long returns string version
        year: 'numeric', 
        month: 'numeric',
        day: 'numeric',
    });
   // setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); //Get the day of the weekday-> ex: Friday, 1/1/2017
    //paddingDays = the index of Friday in weekdays array

    //[]all paddings days will be empty squares
    //[]all normal days will render with functionality
    //[]when normal day is clicked, open form to input event
    //[]create a nested object array with each day and it's values
    const daysArr = [];
    for(let i = 1; i <= paddingDays + daysInMonth; i++) { 
      const dateString = `${month + 1}/${i - paddingDays}/${year}`; // ' 7/7/2017 '
      if (i > paddingDays) { 
        daysArr.push(
          {
            value: (i - paddingDays),
            isToday: (i - paddingDays === day && nav === 0),
            date: dateString
          })
        }
      else if (i < paddingDays){
        daysArr.push (
          {
            value: 'padding',
            isToday:false,
            date: ''
          }
        )
      }
      //setDays(daysArr)
    }
    console.log('DateDisplay in calender', dateDisplay)
    return (
        <div id="container">
            {console.log(nav)}
            <CalendarHeader
                dateDisplay={dateDisplay}          
                OnNext={() => setNav(nav + 1)}
                onBack={() => setNav(nav - 1)}
            />
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
                {daysArr.map((day, index) => (<Day key={index} day={day} onClick={() => console.log("Hello!")} />))}
            </div>
        </div>
    );
}