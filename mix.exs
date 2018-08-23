defmodule TodoList.Mixfile do
  use Mix.Project

  def project do
    [
      app: :todo_list,
      version: "0.0.1",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix, :gettext] ++ Mix.compilers,
      start_permanent: Mix.env == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {TodoList.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:absinthe_plug, "~> 1.4.0"},
      {:cowboy, "~> 1.0"},
      {:dataloader, "~> 1.0.0"},
      {:ex_machina, "~> 2.2"},
      {:gettext, "~> 0.11"},
      {:phoenix, "~> 1.3.3"},
      {:phoenix_ecto, "~> 3.2",
        git: "https://github.com/phoenixframework/phoenix_ecto",
        ref: "c45ed42470b47b1f73d85aef7815659cfe37a788"
      },
      {:phoenix_html, "~> 2.10"},
      {:phoenix_live_reload, "~> 1.0", only: [:dev, :cypress]},
      {:phoenix_pubsub, "~> 1.0"},
      {:poison, "~> 3.1.0"},
      {:postgrex, ">= 0.0.0"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      "test": ["ecto.create --quiet", "ecto.migrate", "test"],
      "cypress": ["ecto.create --quiet", "ecto.migrate", "phx.server"]
    ]
  end
end
