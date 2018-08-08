defmodule TodoList.Repo.Migrations.CreateGroups do
  use Ecto.Migration

  def change do
    create table(:groups) do
      add :title, :string, null: false
      add :uuid, :uuid, null: false, default: fragment("gen_random_uuid()")
      add :list_id, references(:lists, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:groups, [:list_id])
    create unique_index(:groups, [:uuid])
  end
end
