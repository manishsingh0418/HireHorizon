import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import jobData from "./JobDummyData";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const q = query(collection(db, "job")); // Changed "jobs" to "job"
    const querySnapshot = await getDocs(q);
    const jobList = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      jobList.push({ id: doc.id, ...doc.data() });
    });
    setJobs(jobList);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <SearchBar />
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </>
  );
}

export default App;
