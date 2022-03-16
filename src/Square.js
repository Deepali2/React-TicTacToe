import React from 'react';


const Square = ({ value, handleClick }) => {
  console.log('value', value)
  return (
    <div>
      <button className="square" onClick={handleClick}>{value}</button>
    </div>
  )
};

export default Square;