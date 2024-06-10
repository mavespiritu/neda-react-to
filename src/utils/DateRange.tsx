import React from 'react';

interface DateRangeProps {
  startDate: string;
  endDate: string;
}

const DateRange: React.FC<DateRangeProps> = ({ startDate, endDate }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return <span>Invalid date format</span>;
  }

  const sameDay = start.toDateString() === end.toDateString();
  const sameMonthYear = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  const formattedStartDate = start.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedEndDate = end.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedRange = sameDay
    ? formattedStartDate
    : sameMonthYear
    ? `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`
    : `${formattedStartDate} - ${formattedEndDate}`;

  return <span>{formattedRange}</span>;
};

export default DateRange;