defmodule TodoList.Resolvers.List.Groups do
  import Ecto.Query

  def call(%{list_uuid: list_uuid}, _info) do
    result = TodoList.Repo.get_by(TodoList.List, uuid: list_uuid)
    |> Ecto.assoc(:groups) 
    |> order_by([g], [g.id])
    |> TodoList.Repo.all
    {:ok, result}
  end

  def call(%{}, _info) do
    {:error, %{errors: [list_uuid: {"can't be blank", [validation: :required]}]}}
  end
end
