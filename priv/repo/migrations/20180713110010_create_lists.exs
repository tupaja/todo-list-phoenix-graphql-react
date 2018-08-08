defmodule TodoList.Repo.Migrations.CreateLists do
  use Ecto.Migration

  def change do
    create table(:lists) do
      add :uuid, :uuid, null: false, default: fragment("gen_random_uuid()")

      timestamps()
    end

    create unique_index(:lists, [:uuid])
  end
end
