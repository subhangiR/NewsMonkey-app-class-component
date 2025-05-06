import React from 'react'

const NewsItem =(props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="card  mb-4">
        <img src={!imageUrl ? "https://media.cnn.com/api/v1/images/stellar/prod/c-ap25014661007110.jpg?c=16x9&q=w_800,c_fill" : imageUrl} className="card-img-top" style={{ height: '160px' }} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...<span class="position-absolute top-0 start-95 translate-right badge rounded-pill bg-danger" style={{ right: '0' }}>
            {source}
          </span></h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><b><small className="text-muted">By {!author ? "Unknown" : author}on 3min{new Date(date).toUTCString()}</small></b></p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read</a>
        </div>
      </div>
    );
}
export default NewsItem




