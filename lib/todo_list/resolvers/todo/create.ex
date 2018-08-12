defmodule TodoList.Resolvers.Todo.Create do
  import Ecto.Query

  def call(args, _info) do
    changes = Map.merge(args, %{ locked: locked?(args[:dependencies])})
    %TodoList.Todo{}
    |> TodoList.Todo.create_changset(changes)
    |> Ecto.Changeset.put_assoc(
      :todo_dependencies,
      todo_dependencies(args[:dependencies])
    )
    |> TodoList.Repo.insert(returning: true)
  end

  defp locked?(nil), do: false
  defp locked?([]), do: false
  defp locked?(dependencies) do
    dependency_ids = Enum.map(dependencies, &String.to_integer/1)
    query = from t in "todos",
      where: t.id in ^dependency_ids,
      select: fragment("NOT(BOOL_AND(completed))")
    TodoList.Repo.one(query)
  end

  defp todo_dependencies(nil), do: []
  defp todo_dependencies(dependencies) do
    dependencies |> Enum.map(&todo_dependency/1)
  end

  defp todo_dependency(id) do
    %TodoList.TodoDependency{}
    |> TodoList.TodoDependency.changeset(%{dependency_id: id})
  end
end
