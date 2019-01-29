// *** Include Modules: npm (react, react-router-dom), /components, /utils
import React, { Component } from "react";
// import DeleteBtn from "../components/Button";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListSearch } from "../components/List";
import { Card } from "../components/Card";
import { SearchForm } from "../components/Form";

class SearchBooks extends Component {
  // Setting our component's initial state
  state = {
    title: "",
    authors: [],
    description: "",
    image: "",
    link: "",
    result: [],
    search: ""
  };

  // When component mounts, run default search on Candide
  componentDidMount() {
    // this.loadBooks();
    this.searchBooks("Candide");
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res => {
        this.setState({ books: res.data, title: "", authors: [], description: "", image: "", link: "" })
      })
      .catch(err => console.log(err));
  };

  // Google Books search
  searchBooks = query => {
    API.search(query)
      .then(res => {
        this.setState({
          search: ""
        });
        return this.setState({ result: res.data.items });
      })
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When search form is submitted, call searchBooks() for the value of `this.state.search`
  handleSearchSubmit = event => {
    event.preventDefault();
    this.searchBooks(this.state.search);
  };

  // Save book
  handleSaveSubmit = (id, title, authors, description, imageLinks, infoLink, event) => {
    event.preventDefault();
    if (title && authors) {
      API.saveBook({
        title: title,
        authors: authors,
        description: description,
        image: imageLinks,
        link: infoLink
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Google Books Search</h1>
            </Jumbotron>
            <Card heading="Book Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleSearchSubmit={this.handleSearchSubmit}
              />
            </Card>
            <Card heading="Results">
              {this.state.result.length ? (
                <List>
                  {this.state.result.map(volume => (
                    <ListSearch
                      handleSaveSubmit={this.handleSaveSubmit}
                      id={volume.id}
                      title={volume.volumeInfo.title}
                      authors={volume.volumeInfo.authors}
                      description={volume.volumeInfo.description}
                      imageLinks={volume.volumeInfo.imageLinks.thumbnail}
                      infoLink={volume.volumeInfo.infoLink}
                    />
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

// Export class for importing into App.js
export default SearchBooks;
