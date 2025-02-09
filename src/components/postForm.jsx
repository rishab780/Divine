import React from "react";
import Form from "./common/forms";
import Joi from "joi-browser";

import { getCuisines } from "./../services/cuisineService";
import { getPost, savePost, updatePost } from "./../services/postService";
class PostForm extends Form {
  state = {
    data: {
      item_name: "",
      cuisine: "",
      rating: "",
      price: "",
      review: "",
      place_name: "",
      file: null,
    },
    genres: [],
    errors: {},
    selectedFile:null
  };

  schema = {
    _id: Joi.string(),
    item_name: Joi.string().required().label("Title"),
    review: Joi.string().required().label("Review"),
    cuisine: Joi.string().required().label("Genre"),
    place_name: Joi.string().required().label("Location"),
    rating: Joi.number().min(0).max(5).required().label("Rating"),
    price: Joi.number().required().label("Rate"),
    file: Joi.any().label("File"),
  };

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;
    console.log(params);
    const genres = await getCuisines();

    this.setState({ genres: genres.data.data });

    const postId = this.props.match.params.id;

    if (!postId) return;

    try {
      const { data: post } = await getPost(postId);
      const updatedData = this.mapToViewModel(post.posts);

      this.setState({ data: updatedData });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.push("/not-found");
      }
    }
  }

  mapToViewModel = (post) => {
    const result = {
      _id: post._id,
      item_name: post.item_name,

      //cuisine_id: post.genre._id,
      cuisine: post.cuisine,
      rating: post.rating,
      price: post.price,
      review: post.review,
      place_name: post.place_name,
    };

    return result;
  };

  doSubmit = async () => {
    
    const data = this.state.data;
    data.file = this.state.selectedFile;
    this.setState({data})
    console.log(this.state.data)
    if (!this.state.data._id) {
      await savePost(this.state.data);
    } else {
      await updatePost(this.state.data);
    }
    this.props.history.push("/Home");
  };
handleCancel = () => {
  this.props.history.push("/Home");
}
handleChange1= event=>{

  console.log(event.target.files[0])
  this.setState({
    selectedFile: event.target.files[0],
    loaded: 0,
  })

}
  handleTitle = () => {
    const movie = { ...this.state.data };
    return movie._id ? "Edit Review" : "Add New Review";
  };
  render() {
    return (
      <div className="container">
        <h1>{this.handleTitle()}</h1>
        <form className="form-movie" onSubmit={this.handleSubmit}>
          {this.renderInput("item_name", "Title/Item Name", "text", true)}
          {this.renderInput("review", "Review", "text")}
          {this.renderInput("place_name", "Restraunt/Location", "text")}
          {this.renderInput("rating", "Rating", "number")}
          {this.renderSelectMenu("cuisine", "Cuisine", this.state.genres)}
          {this.renderInput("price", "Price", "number")}
          <input type="file" name="file" onChange={this.handleChange1} />
          {this.renderSubmitForm("Save")}
          <button
            onClick={() => this.handleCancel()}
            className="btn btn-secondary ml-2"
          >
            Cancel
          </button>
         
        </form>
      </div>
    );
  }
}

export default PostForm;
