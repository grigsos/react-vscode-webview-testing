// HelloWorld.tsx
import * as React from 'react';
import { Link } from 'react-router-dom';

const HelloWorld: React.FunctionComponent = () => {
  return (
    <div>
      <h2>HelloWorld Usage</h2>
      {/* Render the HTML specific to HelloWorld usage */}
      <p>This is the HelloWorld component.</p>
      
      {/* Add a link to the Test page */}
      <Link to="/test">Go to Test</Link>
    </div>
  );
}

export default HelloWorld;
