defmodule TodoList.Resolvers.Group.CreateTest do
  use ExUnit.Case
  use TodoListWeb.ConnCase
  import TodoList.Factory

  describe "when the title or list_uuid are not provided" do
    test "returns errors" do
      {:error, result} = TodoList.Resolvers.Group.Create.call(%{
      }, %{})
      assert result.errors == [
        list_uuid: {"can't be blank", [validation: :required]},
        title: {"can't be blank", [validation: :required]}
      ]
    end
  end

  describe "when the list with a given uuid is not found" do
    test "returns an error" do
      {:error, result} = TodoList.Resolvers.Group.Create.call(%{
        list_uuid: "c95e409c-9c94-4c80-be57-001aebea42ae",
        title: "Awesome group"
      }, %{})
      assert result.errors == [
        list: {"can't find list with the provided uuid", [validation: :required]}
      ]
    end
  end

  describe "when the params are correct" do
    test "inserts a new group record for the given list" do
      list = insert(:list, %{})
      list_uuid = TodoList.Repo.get(TodoList.List, list.id).uuid
      count_before = TodoList.Repo.aggregate(TodoList.Group, :count, :id)

      {:ok, result} = TodoList.Resolvers.Group.Create.call(%{
        list_uuid: list_uuid,
        title: "Awesome group"
      }, %{})

      count_after = TodoList.Repo.aggregate(TodoList.Group, :count, :id)

      assert result.uuid != nil
      assert result.title == "Awesome group"
      assert result.list_id == list.id
      assert count_before + 1 == count_after
    end
  end
end

