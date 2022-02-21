import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '../Сontainer/Container';

export const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Container />}></Route>
      </Routes>
    </>
  );
};
