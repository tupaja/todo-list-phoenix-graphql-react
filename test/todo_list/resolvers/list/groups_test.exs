defmodule TodoList.Resolvers.List.GroupsTest do
  use ExUnit.Case
  use TodoListWeb.ConnCase
  import TodoList.Factory

  describe "call" do
    test "returns sorted collection of groups for a given list" do
      list = insert(:list, %{})
      group_1 = insert(:group, %{list: list})
      group_2 = insert(:group, %{list: list})
      group_3 = insert(:group, %{list: list})

      uuid = TodoList.Repo.get(TodoList.List, list.id).uuid

      {:ok, result } = TodoList.Resolvers.List.Groups.call(%{list_uuid: uuid}, %{})
      group_ids = result |> Enum.map(&(&1.id))

      assert group_ids == [group_1.id, group_2.id, group_3.id]
    end

    test "returns an error when the list_uuid is not provided" do
      {:error, result } = TodoList.Resolvers.List.Groups.call(%{}, %{})

      assert result.errors == [
        list_uuid: {"can't be blank", [validation: :required]}
      ]
    end
  end
end

