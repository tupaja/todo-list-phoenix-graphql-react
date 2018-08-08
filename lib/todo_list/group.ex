defmodule TodoList.Group do
  use Ecto.Schema
  import Ecto.Changeset


  schema "groups" do
    field :title, :string
    field :uuid, Ecto.UUID
    belongs_to :list, TodoList.List
    has_many :todos, TodoList.Todo

    timestamps()
  end

  @doc false
  def changeset(group, attrs) do
    group
    |> cast(attrs, [:list_id, :title])
    |> validate_required([:list_id, :title])
  end
end
