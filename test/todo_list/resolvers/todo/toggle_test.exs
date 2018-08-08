defmodule TodoList.Resolvers.Todo.ToggleTest do
  use ExUnit.Case
  use TodoListWeb.ConnCase
  import TodoList.Factory

  describe "call" do
    test "toggles the value of the completed field" do
      todo = insert(:todo, %{completed: true})

      {:ok, result } = TodoList.Resolvers.Todo.Toggle.call(%{id: todo.id}, %{})
      assert result.completed == false

      {:ok, result } = TodoList.Resolvers.Todo.Toggle.call(%{id: todo.id}, %{})
      assert result.completed == true
    end

    test "sets the locked field of todos depending on the changed one" do
      parent_1 = insert(:todo, %{completed: true, locked: true})
      parent_2 = insert(:todo, %{completed: true, locked: true})
      parent_3 = insert(:todo, %{completed: true, locked: true})

      child_1 = insert(:todo, %{completed: false, locked: true})
      child_2 = insert(:todo, %{completed: false, locked: false})
      child_3 = insert(:todo, %{completed: true, locked: false})

      insert(:todo_dependency, %{todo_id: parent_1.id, dependency_id: child_1.id})
      insert(:todo_dependency, %{todo_id: parent_1.id, dependency_id: child_2.id})
      insert(:todo_dependency, %{todo_id: parent_2.id, dependency_id: child_2.id})
      insert(:todo_dependency, %{todo_id: parent_3.id, dependency_id: child_2.id})
      insert(:todo_dependency, %{todo_id: parent_3.id, dependency_id: child_3.id})

      {:ok, result } = TodoList.Resolvers.Todo.Toggle.call(%{id: child_2.id}, %{})

      parent_1 = TodoList.Repo.get(TodoList.Todo, parent_1.id)
      parent_2 = TodoList.Repo.get(TodoList.Todo, parent_2.id)
      parent_3 = TodoList.Repo.get(TodoList.Todo, parent_3.id)

      assert parent_1.locked == true
      assert parent_2.locked == false
      assert parent_3.locked == false
      assert result.completed == true
    end

    test "returns error if the id is not provided" do
      {:error, result } = TodoList.Resolvers.Todo.Toggle.call(%{}, %{})

      assert result.errors == [
        id: {"can't be blank", [validation: :required]}
      ]
    end
  end
end
