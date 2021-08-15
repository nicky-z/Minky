import React, { useState, useEffect } from 'react';
import {Day} from './Day';

export const Calender = () => {
    const [nav, setNav] = useState(0); 
    const [clicked, setClicked] = useState();
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
    //const firstDayOfMonth = new Date(year, month, 1); //logging the first day of current nav month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); //month+1, 0 gives you last day of current nav month
    const firstDayOfMonthStr = new Date(year, month, 1).toLocaleDateString('en-us', {
        weekday: 'long', //long returns string version
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
            isToday: (i - paddingDays === day && nav === 0),
            value: dateString
          })
        }
      else if (i < paddingDays){
        daysArr.push (
          {
            date: 'padding',
            isToday:false,
            value: ''
          }
        )
      }
      //setDays(daysArr)
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
                    setClicked(day.value);
                }
            }}/>))}
            </div>
        </div>
    );
}