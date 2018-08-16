import React, { Component } from "react";
import PropTypes from "prop-types";
import find from "lodash/find";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";
import classNames from "classnames";
import TodoForm from "components/TodoForm";
import { TOGGLE_TODO } from "queries/todo";

const handleClick = (todo, callback) => {
  callback({ variables: { id: todo.id } });
};

export class Todos extends Component {
  getGroup() {
    const { groups, match } = this.props;
    return find(groups, { uuid: match.params.groupUuid });
  }

  renderTodos = (elements) => {
    const { refetch } = this.props;
    if (elements) {
      return elements.map(todo => (
        <Mutation
          key={todo.id}
          mutation={TOGGLE_TODO}
          update={refetch}
        >
          {(toggleTodo) => {
            const classes = classNames("panel-block", {
              "has-text-grey-light": todo.locked
            });
            return (
              <label className={classes}>
                <input
                  disabled={todo.locked}
                  type="checkbox"
                  checked={todo.completed}
                  onClick={() => handleClick(todo, toggleTodo)}
                  readOnly
                />
                {todo.title}
              </label>
            );
          }}
        </Mutation>
      ));
    }
  }

  render() {
    const group = this.getGroup();
    const { groups } = this.props;

    if (group) {
      return (
        <React.Fragment>
          <p className="panel-heading">
            Todos
          </p>
          {this.renderTodos(group.todos)}
          <TodoForm group={group} groups={groups} />
        </React.Fragment>
      );
    }
    return null;
  }
}

Todos.propTypes = {
  refetch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired
};

export default withRouter(Todos);
