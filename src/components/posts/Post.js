import React, { Component } from "react";
import Moment from "moment";
import Like from "../common/like";
import { Link } from "react-router-dom";
import { makeFavourite } from "../../services/favouriteService";

class Post extends Component {
  state = {
    post: this.props.value,
    user: this.props.user,
    favs: this.props.fav
  };
  componentDidMount() {
  
    const favs = this.state.favs;
    favs.forEach(element => {
      
      if(element.post._id === this.state.post._id){
       
        const post = this.state.post;
        post.liked = true;
        this.setState({post})

      }
    });
  

 
  }
  handleLike = () => {
    const post = this.state.post;
    if(!post.liked){
      makeFavourite(post._id);
    post.total_likes +=1;
    post.liked = !post.liked;
    }  
    
    this.setState({ post });
  };
  handleDelete = () => {
    const post = this.state.post;
    this.props.onPostDelete(post);
  };
  handleUpdate = () => {
    const post = this.state.post;
    this.props.onPostUpdate(post);
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card mb-3" style={{ width: "100%" }}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src="..." className="card-img" alt="..."></img>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{this.props.value.item_name}</h5>

                  {this.props.value.author && (
                    <h6 className="text-muted">
                      {this.props.value.author.name}
                    </h6>
                  )}
                  <p>
                    <small className="text-muted">
                      {Moment(this.props.value.createdAt).format(
                        "D-MMM-YYYY hh:mm:ss"
                      )}
                    </small>
                  </p>
                  <h6>
                    <span className="badge badge-secondary">
                      {this.props.value.cuisine}
                    </span>
                  </h6>
                  <p className="card-text">{this.props.value.review}</p>
                  <span>
                    <Like
                      liked={this.state.post.liked}
                      onClick={this.handleLike}
                    />
                   {this.props.value.total_likes}
                    {/*<Comment />
                    10*/}
                  </span>
                </div>
                {(this.state.user.isAdmin ||
                  (this.props.value.author &&
                    this.state.user._id === this.props.value.author._id)) && (
                  <div className="card-footer text-muted">
                    <Link to={`/UpdatePost/${this.props.value._id}`}>
                      <span className="btn btn-outline-primary btn-sm">Update</span>
                    </Link>
                    <a
                      onClick={this.handleDelete}
                      className="btn btn-outline-danger btn-sm"
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Post;
