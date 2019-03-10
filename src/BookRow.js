import React, { Component } from "react";

class BookRow extends Component {
  render() {
    const book = this.props.book;
    const authors = book.authors.map(author => {
      console.log("Helooooooooo" + author.name);
      return author.name + ", ";
    });
    console.log(book);
    return (
      <tr>
        <td>{book.title}</td>
        <td>{authors} &nbsp </td>
        <td>
          <button className="btn" style={{ backgroundColor: book.color }} />
        </td>
      </tr>
    );
  }
}

export default BookRow;
