defmodule TodoList.Repo.Migrations.CreateTodoDependencies do
  use Ecto.Migration

  def change do
    create table(:todo_dependencies) do
      add :todo_id, references(:todos, on_delete: :nothing), null: false
      add :dependency_id, references(:todos, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:todo_dependencies, [:todo_id])
    create index(:todo_dependencies, [:dependency_id])
  end
end
