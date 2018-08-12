defmodule TodoList.Resolvers.List.CreateTest do
  use ExUnit.Case
  use TodoListWeb.ConnCase

  test "inserts a new list record" do
    count_before = TodoList.Repo.aggregate(TodoList.List, :count, :id)

    {:ok, result } = TodoList.Resolvers.List.Create.call(%{}, %{})

    count_after = TodoList.Repo.aggregate(TodoList.List, :count, :id)

    assert result.uuid != nil
    assert count_before + 1 == count_after
  end
end

