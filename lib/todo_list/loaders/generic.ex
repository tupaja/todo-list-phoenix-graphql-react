defmodule TodoList.Loaders.Generic do
  def data do
    Dataloader.Ecto.new(TodoList.Repo)
  end
end
