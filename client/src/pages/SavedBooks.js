// *** Include Modules: npm (react, react-router-dom), /components, /utils
import React, { Component } from "react";
import DeleteBtn from "../components/Button";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListSaved } from "../components/List";
import { Card } from "../components/Card";

class SavedBooks extends Component {
  // Setting our component's initial state
  state = {
    books: [],
    title: "",
    authors: "",
    description: "",
    image: "",
    link: "",
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res => {
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      })
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  handelDeleteSubmit = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Google Books Search</h1>
            </Jumbotron>
            <Card heading="Saved Books">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListSaved
                      handleDeleteSubmit={this.handleDeleteSubmit}
                      id={book._id}
                      title={book.title}
                      authors={book.authors}
                      description={book.description}
                      imageLinks={book.image}
                      infoLink={book.link}
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
export default SavedBooks;
