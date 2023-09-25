import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Test: React.FunctionComponent = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    const today = new Date();
    const currentMinute = today.getMinutes();

    if (currentMinute % 2 === 0) {
      navigate('/')
    }
  };

  return (
    <div>
      <h2>Test Usage</h2>
      <p>This is the Test component.</p>
      
      <button onClick={handleButtonClick}>Go to HelloWorld</button>
    </div>
  );
}

export default Test;
