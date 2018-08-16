import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { CREATE_LIST } from "queries/list";

class Home extends Component {
  redirectToList = (data) => {
    const { history } = this.props;
    history.push(`/l/${data.createList.uuid}`);
  }

  render() {
    return (
      <Mutation mutation={CREATE_LIST} onCompleted={this.redirectToList}>
        {createList => (
          <div className="container">
            <h1 className="title">
              Create your list!
            </h1>
            <button type="button" className="button" onClick={createList}>
              Create
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired
};

export default Home;
