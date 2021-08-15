import React, { useState, useEffect } from 'react';

export const Day = ({ day }) => {
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
    return (
        <div className={className}>
            {day.value === 'padding' ? '' : day.value}
        </div>
    );
  };