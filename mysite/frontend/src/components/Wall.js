import React, { Component, useEffect } from 'react';
import axios from 'axios';

export class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: ['not_created']
    }
    axios.get(window.location.href + 'posts/')
      .then(res => {
        this.setState({posts: ['created', res.data]});
      })
      .catch(err => {
        alert("Can't read database")
      });
  }

  render() {
    const posts = this.state.posts;
    const data = posts[1];
    const renderme = [];

    if(this.props.emptyNewPost()) {
      this.props.emptyNewPost();
    }

    if(posts[0] == 'created' && data.length > 0) {
      if(this.props.postData != undefined && JSON.stringify(this.props.postData) !== "{}") {
        data.push(this.props.postData);
      }
      for(let i=data.length-1; i>=0; i--) {
        renderme.push(
          <div>
            <h4>"{data[i].title}" by <b>{data[i].username}</b> on <i>{data[i].created_at}</i></h4>
            <p>{data[i].content}</p>
          </div>
        )
      }
    } else if(posts[0] == 'created' && (this.props.postData != undefined && JSON.stringify(this.props.postData) !== "{}")){
      data.push(this.props.postData);
      renderme.push(
        <div>
          <h4>"{data[0].title}" by <b>{data[0].username}</b> on <i>{data[0].created_at}</i></h4>
          <p>{data[0].content}</p>
        </div>
      )
    }

    return (
      <>
        {posts[0] == 'created' && 
          <> 
            {data.length == 0 ? (
              <div>No Posts!</div>
            ) : (
              <div>
                {renderme}
              </div>
            )}
          </>
        }
      </>
    );
  }
}

export default Wall;
