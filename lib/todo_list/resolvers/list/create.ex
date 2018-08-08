defmodule TodoList.Resolvers.List.Create do
  def call(_args, _info) do
    %TodoList.List{}
    |> TodoList.List.changeset(%{})
    |> TodoList.Repo.insert(returning: true)
  end
end
