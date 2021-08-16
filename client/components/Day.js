import React from 'react';

export const Day = ({ day, onClick }) => {
  const className = `day ${day.date === 'padding' ? 'padding' : ''} ${day.isToday ? 'currentDay' : ''}`;
  return (
    <div onClick={onClick} className={className}>
      {day.date === 'padding' ? '' : day.date}
      {day.event && <div className='event'>{day.event.title}</div>}
    </div>
  );
};