import * as React from 'react';
import "./styles.css";
import { MemoryRouter, Route, Link, Routes } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import Testy from './Test';

export interface IAppProps {}

export const App: React.FunctionComponent<IAppProps> = ({ }: React.PropsWithChildren<IAppProps>) => {
  return (
<MemoryRouter>
      <div className='app'>
        <Routes>
        <Route path="/" element={<HelloWorld />} />
        <Route path="/test" element={<Testy />} />
        </Routes>
      </div>
    </MemoryRouter>
  );
};