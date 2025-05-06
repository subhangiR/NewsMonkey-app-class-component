import React, { useState} from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App =()=>{
  const pageSize=5;
  const Apikey=process.env.REACT_APP_NEWS_API
  
 
  const[progress, setProgress]=useState(0);

    return (
      <div>
        <Router>
        <LoadingBar
        color="#f11946"
        height={3}
        progress={progress}
      />
          <Navbar />
          <div className="container">
            <Routes>
              {/* Define routes for each category */}
              <Route path="/" element={<News setProgress={setProgress} apiKey={Apikey} pageSize={5} country="us" category="general" />} />
              <Route path="/business" element={<News setProgress={setProgress} apiKey={Apikey} key="business" pageSize={5} country="us" category="business" />} />
              <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={Apikey} key="entertainment" pageSize={5} country="us" category="entertainment" />} />
              <Route path="/general" element={<News setProgress={setProgress} apiKey={Apikey} key="general" pageSize={5} country="us" category="general" />} />
              <Route path="/health" element={<News setProgress={setProgress} apiKey={Apikey} key="health" pageSize={5} country="us" category="health" />} />
              <Route path="/science" element={<News setProgress={setProgress} apiKey={Apikey} key="science" pageSize={5} country="us" category="science" />} />
              <Route path="/sports" element={<News setProgress={setProgress} apiKey={Apikey} key="sports" pageSize={5} country="us" category="sports" />} />
              <Route path="/technology" element={<News setProgress={setProgress} apiKey={Apikey} key="technology" pageSize={5} country="us" category="technology" />} />
            </Routes>
          </div>
        </Router>
      </div>
    )
  
  }

export default App;
