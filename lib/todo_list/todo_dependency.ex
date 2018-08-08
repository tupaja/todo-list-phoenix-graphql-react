defmodule TodoList.TodoDependency do
  use Ecto.Schema
  import Ecto.Changeset


  schema "todo_dependencies" do
    belongs_to :dependency, TodoList.Todo
    belongs_to :todo, TodoList.Todo

    timestamps()
  end

  @doc false
  def changeset(todo_dependency, attrs) do
    todo_dependency
    |> cast(attrs, [:dependency_id])
    |> validate_required([:dependency_id])
  end
end
