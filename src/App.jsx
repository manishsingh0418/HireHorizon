import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import jobData from "./JobDummyData";
import { collection, query,orderBy, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const tempJobs = [];
    const jobRef = query(collection(db, "job"));
    const q = query(jobRef , orderBy("postedOn","desc"));
    const req = await getDocs(q);
    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn ? job.data().postedOn.toDate() : null,
      });
    });
    setJobs(tempJobs);
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
