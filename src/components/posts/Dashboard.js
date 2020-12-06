import React, { Component } from "react";
import Post from "./Post";

import { getCuisines } from "../../services/cuisineService";
import { getPosts, deletePosts } from "../../services/postService";

import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { getCurrentUser } from "./../../services/authService";
import SearchBox from "./../common/searchBox";
import { getFavourites } from './../../services/favouriteService';
class Dashboard extends Component {
  state = {
    posts: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    favouriteReviews : []
  };
  async componentDidMount() {
    const user = getCurrentUser();
    const { data: posts } = await getPosts();
    const { data: cuisines } = await getCuisines();
    
    const genres = [{ name: "All Cuisines" }, ...cuisines.data];
    const fav =await getFavourites();
   
    this.setState({ posts: posts.posts, genres, user,favouriteReviews:fav.data.favorites });
    
  }
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handlePostDelete = async (post) => {
    const orignalPosts = this.state.posts;
    const posts = this.state.posts.filter((p) => p._id !== post._id);
    this.setState({ posts });
    try {
      deletePosts(post._id);
    } catch (ex) {
      this.setState({ posts: orignalPosts });
    }
  };
  getPagedData = () => {
    let {
      currentPage,
      pageSize,
      posts: allMovies,
      selectedGenre,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = filtered.filter((movie) =>
        movie.item_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedGenre && selectedGenre._id) {
      filtered =
        selectedGenre && selectedGenre._id
          ? filtered.filter((m) => m.cuisine === selectedGenre.name)
          : filtered;
    }

    const movies = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    let {  searchQuery } = this.state;
    const {  data: posts } = this.getPagedData();

    
    const filtered =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.posts.filter(
            (m) => m.cuisine === this.state.selectedGenre.name
          )
        : this.state.posts;

    return (
      <div className="row">
        <div className="col-3">
          <div style={{ marginBottom: "10px", width: "100%" }}>
            <form>
              <h5>Search Bar</h5>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
            </form>
          </div>
          <h5>Filter</h5>
          <ListGroup
            selectedItem={this.state.selectedGenre}
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col-7">
          {" "}
          {posts.map((post) => (
            <Post
              key={post._id}
              value={post}
              user={this.state.user}
              fav = {this.state.favouriteReviews}
              onPostDelete={this.handlePostDelete}
            />
          ))}
          <Pagination
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div className="col-2"></div>
      </div>
    );
  }
}

export default Dashboard;
