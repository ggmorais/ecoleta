import React from 'react';
import { StatusBar, View } from 'react-native';

import Routes from './src/Routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Routes />
    </>
  );
}