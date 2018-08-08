defmodule TodoList.Factory do
  use ExMachina.Ecto, repo: TodoList.Repo

  def list_factory do
    %TodoList.List{}
  end

  def group_factory do
    %TodoList.Group{
      title: sequence(:title, &"Group #{&1}"),
      list: build(:list)
    }
  end

  def todo_factory do
    %TodoList.Todo{
      title: sequence(:title, &"Todo #{&1}"),
      completed: false,
      locked: false,
      group: build(:group)
    }
  end

  def todo_dependency_factory do
    %TodoList.TodoDependency{}
  end
end
