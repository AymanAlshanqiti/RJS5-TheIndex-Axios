import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  state = {
    authors: [],
    currentAuthor: null,
    filteredAuthors: this.authors,
    loading: true
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const authors = response.data;
      this.setState({ authors: authors });
      this.setState({ loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  selectAuthor = async author => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
      );
      const autherObj = response.data;
      this.setState({ currentAuthor: autherObj });
    } catch (error) {
      console.error(error);
    }
    this.setState({ loading: false });
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
        />
      );
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <br />
          <br />
          <br />
          <div className="row col-12 my-4 justify-content-md-center">
            <div class="loader" />
          </div>
        </div>
      );
    }
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
