
import React, { useEffect, useState, useCallback } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  


  const updateNews = useCallback(async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    props.setProgress(100);
    setArticles(parsedData.articles || [])

    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setPage(1); // Reset page to 1
  }, [props.country, props.category, props.apiKey, props.pageSize]);
  
  useEffect(() => {
    document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`;
    updateNews();
  }, [updateNews]);
  

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;


    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles || []));

    setTotalResults(parsedData.totalResults)
    setPage(nextPage)
  };

  return (
    <div>
      <div className="my-3 mb-3 text-center">
        <h2 className="mb-5" style={{marginTop:'90px'}}>{`NewsMonkey - Top ${props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines`}</h2>
        {loading && <Spinner />}
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {!loading && articles.map((element) => (
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


    </div>
  )
};

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};

export default News;
