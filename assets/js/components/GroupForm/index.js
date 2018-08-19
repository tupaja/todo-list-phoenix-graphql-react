import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import serialize from "form-serialize";
import { withRouter } from "react-router";
import { CREATE_GROUP } from "queries/group";
import { getGroupUrl } from "utils";

export class GroupForm extends Component {
  createGroup = (cache, { data: { createGroup } }) => {
    const { query, match, history } = this.props;
    const { groups } = cache.readQuery({
      query,
      variables: match.params
    });
    cache.writeQuery({
      query,
      variables: match.params,
      data: { groups: groups.concat([createGroup]) }
    });
    history.push(getGroupUrl(match.params.listUuid, createGroup.uuid));
  }

  handleSubmit(event, callback) {
    event.preventDefault();
    const { match } = this.props;
    const form = event.target;
    const variables = Object.assign(
      {},
      serialize(form, { hash: true }),
      match.params
    );
    callback({ variables });
    form.reset();
  }

  render() {
    return (
      <Mutation mutation={CREATE_GROUP} update={this.createGroup}>
        {createGroup => (
          <form
            className="panel-block"
            onSubmit={event => this.handleSubmit(event, createGroup)}
          >
            <input data-test="group-title" className="input" name="title" type="text" />
          </form>
        )}
      </Mutation>
    );
  }
}

GroupForm.propTypes = {
  match: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(GroupForm);
