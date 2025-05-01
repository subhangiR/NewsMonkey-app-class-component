import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export class App extends Component {
  pageSize=5;
  Apikey=process.env.REACT_APP_NEWS_API
  state={
   progress:0
  }
  setProgress = (progress) => {
    this.setState({ progress });
  };
  
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color="#f11946"
        height={3}
        progress={this.state.progress}
      />
          <Navbar />
          <div className="container">
            <Routes>
              {/* Define routes for each category */}
              <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.Apikey} pageSize={5} country="us" category="general" />} />
              <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.Apikey} key="business" pageSize={5} country="us" category="business" />} />
              <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.Apikey} key="entertainment" pageSize={5} country="us" category="entertainment" />} />
              <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.Apikey} key="general" pageSize={5} country="us" category="general" />} />
              <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.Apikey} key="health" pageSize={5} country="us" category="health" />} />
              <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.Apikey} key="science" pageSize={5} country="us" category="science" />} />
              <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.Apikey} key="sports" pageSize={5} country="us" category="sports" />} />
              <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.Apikey} key="technology" pageSize={5} country="us" category="technology" />} />
            </Routes>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
