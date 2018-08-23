use Mix.Config

import_config "dev.exs"

config :todo_list, TodoList.Repo,
  pool: Ecto.Adapters.SQL.Sandbox,
  username: "postgres",
  password: "postgres",
  database: "todo_list_test",
  hostname: "localhost",
  ownership_timeout: 500_000
config :todo_list, sql_sandbox: true
config :todo_list, :workers, [
  "./assets/node_modules/cypress/bin/cypress run --project ./assets"
]
