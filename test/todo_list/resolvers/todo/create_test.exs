defmodule TodoList.Resolvers.Todo.CreateTest do
  use ExUnit.Case
  use TodoListWeb.ConnCase
  import TodoList.Factory

  describe "call" do
    test "inserts a new todo without any dependencies" do
      group = insert(:group, %{})
      count_before = TodoList.Repo.aggregate(TodoList.Todo, :count, :id)

      {:ok, result } = TodoList.Resolvers.Todo.Create.call(%{
        title: "Buy milk",
        group_id: group.id
      }, %{})

      count_after = TodoList.Repo.aggregate(TodoList.Todo, :count, :id)
      dependency_ids = 
        Ecto.assoc(result, :dependencies) 
        |> TodoList.Repo.all 
        |> Enum.map(&(&1.id))

      assert result.title == "Buy milk"
      assert result.locked == false
      assert result.completed == false
      assert result.group_id == group.id
      assert dependency_ids == []
      assert count_before + 1 == count_after
    end

    test "inserts a new todo with dependencies" do
      group = insert(:group, %{})
      dependency_1 = insert(:todo, %{})
      dependency_2 = insert(:todo, %{})
      count_before = TodoList.Repo.aggregate(TodoList.Todo, :count, :id)

      {:ok, result } = TodoList.Resolvers.Todo.Create.call(%{
        dependencies: [dependency_1.id, dependency_2.id],
        title: "Buy milk",
        group_id: group.id
      }, %{})

      count_after = TodoList.Repo.aggregate(TodoList.Todo, :count, :id)

      dependency_ids = 
        Ecto.assoc(result, :dependencies) 
        |> TodoList.Repo.all 
        |> Enum.map(&(&1.id))

      assert result.title == "Buy milk"
      assert result.locked == true
      assert result.completed == false
      assert result.group_id == group.id
      assert dependency_ids == [dependency_1.id, dependency_2.id]
      assert count_before + 1 == count_after
    end

    test "doesn't create a todo without group or title" do
      count_before = TodoList.Repo.aggregate(TodoList.Todo, :count, :id)

      {:error, result } = TodoList.Resolvers.Todo.Create.call(%{}, %{})

      count_after = TodoList.Repo.aggregate(TodoList.Todo, :count, :id)

      assert count_before == count_after
      assert result.errors == [
        title: {"can't be blank", [validation: :required]},
        group_id: {"can't be blank", [validation: :required]}
      ]
    end
  end
end

