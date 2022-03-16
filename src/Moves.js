import React from 'react';

const Moves = ({ setStep, setXIsNext, history }) => (
  <ol>
    {history.map((_, index) => {
      const jumpTo = (idx) => {
        setStep(idx);
        setXIsNext(idx % 2 === 0)
      };

      const description = index ? `board after move # ${index}` : `board at the start of the game`;

      return (
        <li key={index}>
          <button onClick={() => jumpTo(index)}>{description}</button>
        </li>
      )
    })}
  </ol>
)


export default Moves;