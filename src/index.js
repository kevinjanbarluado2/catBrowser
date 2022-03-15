import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes,useSearchParams } from "react-router-dom";
import App from './App';
import Cat from "./routes/cat";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path=":cat" element={<Cat />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

