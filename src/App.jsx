import React, { useState } from 'react';
import './index.css';
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import JobCard from "./components/JobCard"
function App() {
  return (
    <>
    <Navbar/>
    <Header/>
    <SearchBar/>
    <JobCard/>
    </>
  );
}

export default App;
