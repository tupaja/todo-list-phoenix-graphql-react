defmodule TodoList.Loaders.Todo do
  import Ecto.Query

  def data do
    Dataloader.Ecto.new(TodoList.Repo, query: &query/2)
  end

  def query(queryable, _args) do
    queryable |> order_by([q], [q.id])
  end
end
