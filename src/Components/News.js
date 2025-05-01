import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0

    };
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`;

  }
  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handlePrevBtn = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
    // if (this.state.page > 1) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3b33861fb6f147ba86b822f3e6b1fb2b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   });
    // }
  // }

  // handleNextBtn = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
    // if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3b33861fb6f147ba86b822f3e6b1fb2b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   });
    // }
  // }
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    
   
    let data = await fetch(url);
    let parsedData = await data.json();
  
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: nextPage,
      
    });
  };
  
  render() {
    return (
      <div>
          <div className="my-3 mb-3 text-center">
            <h2 className="my-4">{`NewsMonkey - Top ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines`}</h2>
             {this.state.loading && <Spinner />} 
          </div>
          <InfiniteScroll
         dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner />} 
        >
          <div className="container">
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 40) : "No Title"}
                  description={element.description ? element.description.slice(0, 80) : "No description"}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
          </div>
          </InfiniteScroll>
        
         {/* <div className="container d-flex justify-content-between my-3">
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevBtn}>
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)}
            onClick={this.handleNextBtn}>
            Next &rarr;
          </button>
        </div>  */}
      </div>
    )
  }
}
export default News
