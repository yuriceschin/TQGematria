import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";

export default class A extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.allRecurrencesliberTrigrammatonCsv.edges,
      sort: {
        column: "count",
        direction: "desc"
      }
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort = column => {
    return e => {
      const direction = this.state.sort.column
        ? this.state.sort.direction === "asc"
          ? "desc"
          : "asc"
        : "desc";
      const sortedColumns = this.state.data.sort((a, b) => {
        switch (column) {
          case "word": {
            const nameA = a.node.word.toUpperCase(); // ignore upper and lowercase
            const nameB = b.node.word.toUpperCase(); // ignore upper and lowercase

            if (nameA < nameB) return -1;
            if (nameA < nameB) return 1;
            else return 0;
          }
          case "value": {
            const nameA = a.node.value * 1; // ignore upper and lowercase
            const nameB = b.node.value * 1; // ignore upper and lowercase

            if (nameA < nameB) return -1;
            if (nameA < nameB) return 1;
            else return 0;
          }
          case "count": {
            const nameA = a.node.count * 1; // ignore upper and lowercase
            const nameB = b.node.count * 1; // ignore upper and lowercase

            if (nameA < nameB) return -1;
            if (nameA < nameB) return 1;
            else return 0;
          }
          default:
            return a - b;
        }
      });

      if (direction === "desc") {
        sortedColumns.reverse();
      }

      this.setState({
        users: sortedColumns,
        sort: {
          column,
          direction
        }
      });
    };
  };

  setArrow = column => {
    let className = "sort-direction";

    if (this.state.sort.column === column) {
      className += this.state.sort.direction === "asc" ? " asc" : " desc";
    }

    return className;
  };

  render() {
    return (
      <Layout>
        <h2>Liber Trigrammaton - Words value and recurrences</h2>

        <p>
          There is a total of <strong>390</strong> words in Liber Trigrammaton
          and <strong>188</strong> different words (including numbers and &).
          <br />
          Here you can find each word, its value based upon the TQ Gematria and
          the number of times it appears in Liber Trigrammaton.
        </p>
        <div className="table">
          <div className="header">
            <div onClick={this.onSort("word")}>
              Word
              <span className={`${this.setArrow("word")}`} />
            </div>
            <div onClick={this.onSort("value")}>
              Value
              <span className={this.setArrow("value")} />
            </div>
            <div onClick={this.onSort("count")}>
              Count
              <span className={this.setArrow("count")} />
            </div>
          </div>
          <div className="body">
            {this.state.data.map((row, i) => (
              <div className="row" key={`${row.node.word} ${i}`}>
                <div>{row.node.word}</div>
                <div>{row.node.value}</div>
                <div>{row.node.count}</div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export const IndexQuery = graphql`
  query {
    allRecurrencesliberTrigrammatonCsv {
      edges {
        node {
          word
          value
          count
        }
      }
    }
  }
`;