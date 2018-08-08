defmodule TodoList.Repo.Migrations.CreateTodos do
  use Ecto.Migration

  def change do
    create table(:todos) do
      add :title, :string, null: false
      add :completed, :boolean, default: false, null: false
      add :locked, :boolean, default: false, null: false
      add :group_id, references(:groups, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:todos, [:group_id])
  end
end
