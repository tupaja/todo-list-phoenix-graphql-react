defmodule TodoList.List do
  use Ecto.Schema
  import Ecto.Changeset


  schema "lists" do
    field :uuid, Ecto.UUID
    has_many :groups, TodoList.Group

    timestamps()
  end

  @doc false
  def changeset(list, attrs) do
    list
    |> cast(attrs, [:uuid])
    |> validate_required([])
  end
end
