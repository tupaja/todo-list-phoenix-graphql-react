import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import serialize from "form-serialize";
import Select from "react-select";
import { CREATE_TODO } from "queries/todo";
import { GROUP_FRAGMENT } from "queries/group";
import { changeDependencies, clearDependencies } from "actions/todo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TitleInput } from "./styles";

const getOptions = groups => groups.map(group => ({
  label: group.title,
  options: group.todos.map(todo => ({
    label: todo.title,
    value: todo.id
  }))
}));

class TodoForm extends Component {
  addTodo = (cache, { data: { createTodo } }) => {
    const { group } = this.props;
    const oldGroup = cache.readFragment({
      id: `Group:${group.id}`,
      fragment: GROUP_FRAGMENT
    });
    const newTodos = oldGroup.todos.concat([createTodo]);
    const newGroup = Object.assign({}, oldGroup, { todos: newTodos });
    cache.writeFragment({
      id: `Group:${group.id}`,
      fragment: GROUP_FRAGMENT,
      data: newGroup
    });
  }

  handleSubmit(event, callback) {
    event.preventDefault();
    const form = event.target;
    const { group, dependencies, clearDependencies } = this.props;
    const dependencyIds = dependencies.map(
      dependency => dependency.value
    );
    const variables = Object.assign({}, serialize(form, { hash: true }), {
      groupId: group.id,
      dependencies: dependencyIds
    });
    callback({ variables });
    form.reset();
    clearDependencies();
  }

  render() {
    const { groups, dependencies, changeDependencies } = this.props;
    return (
      <Mutation mutation={CREATE_TODO} update={this.addTodo}>
        {createTodo => (
          <div className="panel-block is-block">
            <form onSubmit={event => this.handleSubmit(event, createTodo)}>
              <TitleInput />
            </form>
            <Select
              isMulti
              className="control"
              onChange={changeDependencies}
              options={getOptions(groups)}
              value={dependencies}
            />
          </div>
        )}
      </Mutation>
    );
  }
}

TodoForm.propTypes = {
  group: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  dependencies: PropTypes.array.isRequired,
  clearDependencies: PropTypes.func.isRequired,
  changeDependencies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ dependencies: state.dependencies });

const mapDispatchToProps = dispatch => bindActionCreators(
  { changeDependencies, clearDependencies },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
