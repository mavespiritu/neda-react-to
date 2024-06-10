import React from 'react';

interface DateProps {
  selectedDate: string;
}

const SingleDate: React.FC<DateProps> = ({ selectedDate }) => {
  const date = new Date(selectedDate);

  if (isNaN(date.getTime())) {
    return <span>Invalid date format</span>;
  }


  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return <span>{formattedDate}</span>;
};

export default SingleDate;