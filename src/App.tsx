import { useState } from 'react';
import { PageRoutes } from './PageRoutes';
import './App.css'

const App = (): JSX.Element => {
  return (
    <>
      <nav className='nav-wrapper'>
        <a className='link' href={`/`}>Home</a>
        <a className='link' href={`/Games`}>Games</a>
        <a className='link' href={`/About`}>About</a>
      </nav>
      <PageRoutes/>
    </>
  )
}

export default App
