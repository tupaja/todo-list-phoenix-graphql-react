defmodule TodoList.Todo do
  use Ecto.Schema
  import Ecto.Changeset


  schema "todos" do
    field :completed, :boolean
    field :locked, :boolean
    field :title, :string
    belongs_to :group, TodoList.Group
    has_many :todo_dependencies, TodoList.TodoDependency
    has_many :dependencies, through: [:todo_dependencies, :dependency]

    has_many :todo_parents, TodoList.TodoDependency, foreign_key: :dependency_id
    has_many :parents, through: [:todo_parents, :todo]

    timestamps()
  end

  def create_changset(todo, attrs) do
    todo
    |> cast(attrs, [:title, :completed, :locked, :group_id])
    |> validate_required([:title, :locked, :group_id])
  end

  def toggle_changeset(todo, attrs) do
    todo
    |> cast(attrs, [:completed])
    |> validate_required([:completed])
  end
end
