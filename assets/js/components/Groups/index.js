import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import GroupForm from "components/GroupForm";
import { getGroupUrl } from "utils";

export const Groups = ({ elements, match, query }) => (
  <React.Fragment>
    {elements.map(group => (
      <NavLink
        to={getGroupUrl(match.params.listUuid, group.uuid)}
        activeClassName="is-active has-text-weight-bold"
        className="panel-block"
        key={group.id}
      >
        {group.title}
      </NavLink>
    ))}
    <GroupForm query={query} />
  </React.Fragment>
);

Groups.propTypes = {
  elements: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
};

export default withRouter(Groups);
