defmodule TodoList.Resolvers.Group.Create do
  import Ecto.Changeset
  alias Ecto.Multi

  def call(args, _info) do
    validated_args(args)
    |> case do
      %{valid?: true, changes: changes} -> create_group(changes)
      %{valid?: false, errors: errors} -> {:error, %{errors: errors}}
    end
  end

  defp validated_args(args) do
    types = %{list_uuid: :string, title: :string}
    {%{}, types}
      |> cast(args, Map.keys(types))
      |> validate_required([:list_uuid, :title])
  end

  defp create_group(changes) do
    Multi.new
    |> Multi.run(:get_list, fn (_changes) ->
      case TodoList.Repo.get_by(TodoList.List, uuid: changes[:list_uuid]) do
        nil -> {:error, :no_list_found}
        list -> {:ok, list}
      end
    end)
    |> Multi.run(:create_group, fn(%{get_list: list}) ->
      %TodoList.Group{}
      |> TodoList.Group.changeset(%{list_id: list.id, title: changes[:title]})
      |> TodoList.Repo.insert(returning: true)
    end)
    |> TodoList.Repo.transaction
    |> case do
      {:ok, result } -> {:ok, result[:create_group]}
      {:error, :get_list, :no_list_found, _result} -> 
        {:error, %{
          errors: [
            list: {
              "can't find list with the provided uuid", 
              [validation: :required]
            }
          ]
        }}
    end
  end
end
