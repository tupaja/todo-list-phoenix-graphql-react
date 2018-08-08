import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withRouter, Route } from "react-router";
import Groups from "components/Groups";
import Todos from "components/Todos";
import { LIST_GROUPS } from "queries/list";

const List = ({ match }) => (
  <Query query={LIST_GROUPS} variables={{ listUuid: match.params.listUuid }}>
    {({ loading, error, data, refetch }) => {
      if (loading) {
        return (
          <p>Loading...</p>
        );
      }
      if (error) {
        return (
          <p>Something went wrong</p>
        );
      }

      return (
        <div className="container">
          <h1 className="title">
            List
          </h1>
          <div className="columns">
            <div className="column panel">
              <p className="panel-heading">
                Groups
              </p>
              <Groups elements={data.groups} query={LIST_GROUPS} />
            </div>
            <div className="column panel">
              <Route
                path="/l/:listUuid/g/:groupUuid"
                render={() => (
                  <Todos
                    query={LIST_GROUPS}
                    groups={data.groups}
                    refetch={refetch}
                  />
                )}
              />
            </div>
          </div>
        </div>
      );
    }}
  </Query>
);

List.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(List);
