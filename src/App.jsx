import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import { collection, query,orderBy,where, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch]=useState(false);
  const fetchJobs = async () => {
    setCustomSearch(false);
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

  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = [];
    const jobRef = query(collection(db, "job"));
    const q = query(jobRef ,where("type","==",jobCriteria.type) ,where("title","==",jobCriteria.title) ,where("location","==",jobCriteria.location) ,where("experience","==",jobCriteria.experience),orderBy("postedOn","desc"));
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
      <SearchBar fetchJobsCustom={fetchJobsCustom} />
      {customSearch &&
      <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
        <p className="bg-blue-500 px-10 py-2 rounded-md text-white">Clear Filters</p>
      </button>

      }
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </>
  );
}

export default App;
