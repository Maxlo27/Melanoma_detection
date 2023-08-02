
import './App.css';

import React from 'react';


import Header from './components/Header';
import Accueil from './pages/Accueil';
import Apropos from './pages/apropos';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import CsvViewer from './pages/galerie';
import DatasetTable from './pages/contact';
import Test from './pages/test';
import Test2 from './pages/Hassan';
import PatientSearchInterface from './pages/detailPatient';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Accueil />}></Route>
        <Route path='/galerie' element={<CsvViewer />}></Route>
        <Route path='/detaitPatient' element={<PatientSearchInterface />}></Route>
        <Route path='/contact' element={<DatasetTable/>}></Route>
        <Route path='/test' element={<Test/>}></Route>
        <Route path='/Hassan' element={<Test2/>}></Route>






      </Routes>
      <Footer />
    </div>
  );
}

export default App;
