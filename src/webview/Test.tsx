// Test.tsx
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Test: React.FunctionComponent = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    const today = new Date();
    const targetDate = new Date(today.getFullYear(), 8, 24); // September is month 8 (0-based index)

    // Compare the current date with the target date
    if (today.toDateString() === targetDate.toDateString()) {
      // Navigate to the "HelloWorld" page
      navigate('/')
    } else {
      // Handle the case where it's not September 25th, if needed
    }
  };

  return (
    <div>
      <h2>Test Usage</h2>
      {/* Render the HTML specific to Test usage */}
      <p>This is the Test component.</p>
      
      {/* Add a button to trigger navigation */}
      <button onClick={handleButtonClick}>Go to HelloWorld</button>
    </div>
  );
}

export default Test;
