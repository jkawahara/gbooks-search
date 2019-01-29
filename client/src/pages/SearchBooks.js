// *** Include Modules: npm (react, react-router-dom), /components, /utils
import React, { Component } from "react";
import View from "../components/Button";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Card } from "../components/Card";
import { SearchForm } from "../components/Form";

class SearchBooks extends Component {
  // Structure state object
  state = {
    // books: [],
    // title: "",
    // author: "",
    // synopsis: "",
    title: "",
    authors: "",
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

  // Google Books search
  searchBooks = query => {
    API.search(query)
      .then(res => {
        console.log(res.data.items);
        this.state.search = "";
        return this.setState({ result: res.data.items })
      })
      .catch(err => console.log(err));
  };

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

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
    console.log(id);
    console.log(title);
    console.log(authors);
    console.log(description);
    console.log(imageLinks);
    console.log(infoLink);
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
            <Card heading="Book">
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
                    <ListItem
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
