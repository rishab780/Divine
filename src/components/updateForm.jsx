import React from "react";
import Form from "./common/forms";
import Joi from "joi-browser";

import { getCuisines } from './../services/cuisineService';
import { getPost } from './../services/postService';
class PostForm extends Form {
    
  state = {
    data: {
      title: "",
      cuisine_id: "",
      rating: "",
      price: "",
      review: "" ,
      location: ""
    },
    genres:[ 
      ],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    review: Joi.string()
    .required()
    .label("Review"),
    cuisine_id: Joi.string()
      .required()
      .label("Genre"),
      location: Joi.string()
      .required()
      .label("Location"),
    rating: Joi.number()
      .min(0)
      .max(5)
      .required()
      .label("Stock"),
    price: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };
   
  async componentDidMount() {
   
    const genres = await getCuisines();
    
    this.setState({ genres: genres.data.data });

    const postId = this.props.match.params.id;
    
    if (!postId) return;

    try {
      const { data: post } = await getPost(postId);
      const updatedData = this.mapToViewModel(post.posts)
     
      this.setState({ data: updatedData });
     
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.push("/not-found");
      }
    }
  }

  mapToViewModel = post=> {
    
    const result = {
      _id: post._id,
      title: post.item_name,
      //cuisine_id: post.genre._id,
      cuisine_id:"5facfcb45e231410641d7c96",
      rating: post.rating,
      price: post.price,
     review: post.review,
      location: post.location
    };
   
    return result;
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  handleTitle = () => {
    const movie = { ...this.state.data };
    return movie._id ? `Edit "${movie.title}" Movie` : "Add New Review";
  };
  render() {
    return (
      <div className="container">
        <h1>{this.handleTitle()}</h1>
        <form className="form-movie" onSubmit={this.handleSubmit}>
          
        
      
        </form>
      </div>
    );
  }
}

export default PostForm;