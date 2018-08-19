defmodule TodoList.Application do
  use Application

  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    workers =
      Application.get_env(:todo_list, :workers)
      |> Enum.map(&worker(TodoList.Executable, [&1]))

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(TodoList.Repo, []),
      # Start the endpoint when the application starts
      supervisor(TodoListWeb.Endpoint, []),
      # Start your own worker by calling: TodoList.Worker.start_link(arg1, arg2, arg3)
      # worker(TodoList.Worker, [arg1, arg2, arg3]),
    ] ++ workers


    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: TodoList.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    TodoListWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
