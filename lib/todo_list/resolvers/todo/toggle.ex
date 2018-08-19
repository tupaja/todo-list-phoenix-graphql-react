defmodule TodoList.Resolvers.Todo.Toggle do
  alias Ecto.Multi

  def call(%{id: id}, _info) do
    todo = TodoList.Repo.get(TodoList.Todo, id)
    {:ok, result} = Multi.new
    |> Multi.update(:toggle_todo, TodoList.Todo.toggle_changeset(todo, %{completed: !todo.completed}))
    |> Multi.run(:update_todos, fn %{toggle_todo: toggle_todo} ->
      query = """
        UPDATE todos t
        SET locked = subquery.locked
        FROM
        (
          SELECT todo_dependencies.todo_id AS id,
            NOT(BOOL_AND(todos.completed)) AS locked
          FROM todo_dependencies
          INNER JOIN todos ON todos.id = todo_dependencies.dependency_id
          WHERE todo_id IN (
            SELECT td1.todo_id
            FROM todo_dependencies td1
            WHERE td1.dependency_id = $1
          )
          GROUP BY todo_dependencies.todo_id
        ) AS subquery
        WHERE subquery.id = t.id;
      """
      result = Ecto.Adapters.SQL.query!(TodoList.Repo, query, [toggle_todo.id])
      {:ok, result}
    end)
    |> TodoList.Repo.transaction

    {:ok, result[:toggle_todo]}
  end

  def call(%{}, _info) do
    {:error, %{errors: [id: {"can't be blank", [validation: :required]}]}}
  end
end
