import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from './redux/counterSlice';
import './css/App.css';

export default function App() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
<>
  <div className="row">
<button
  className='button'
  aria-label="Decrement value"
  onClick={() => dispatch(decrement())}
>
  -
</button>
<span className="value">{count}</span>
<button
  className="button"
  aria-label="Increment value"
  onClick={() => dispatch(increment())}
>
  +
</button>
  </div>
  <div className="row">
<input
  className="textbox"
  aria-label="Set increment amount"
  value={incrementAmount}
  onChange={(e) => setIncrementAmount(e.target.value)}
/>
<button
  className="button"
  onClick={() => dispatch(incrementByAmount(incrementValue))}
>
  Add Amount
</button>
  </div>
</>
  );
}