import React from 'react'

import { TodoPage } from './pages';
import { Header } from './components';


import './globalStyle.scss'

function App() {
    return (
      <>
        <Header title='To do List'/>
        <TodoPage />
      </>
    )
}

export default App
