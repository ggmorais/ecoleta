import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CreatePoint from 'pages/CreatePoint';
import Home from 'pages/Home';


export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/create-point" component={CreatePoint} />
    </BrowserRouter>
  )
}