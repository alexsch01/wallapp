import React, { Component } from 'react';
import axios from 'axios';

export class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: ['not_created']
    }
    axios.get('http://localhost:8000/posts/')
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

    if(posts[0] === 'created') {
      if(this.props.postData !== undefined && JSON.stringify(this.props.postData) !== "{}") {
        data.push(this.props.postData);
      }
      for(let i=data.length-1; i>=0; i--) {
        renderme.push(
          <div style={{"borderWidth":"1px", 'borderStyle':'solid'}}>
            <h5>"{data[i].title}" by <b>{data[i].username}</b> on <i>{data[i].created_at}</i></h5>
            <p>{data[i].content}</p>
          </div>
        )
      }
    }

    return (
      <>
        {posts[0] === 'created' && 
          <> 
            {data.length === 0 ? (
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
