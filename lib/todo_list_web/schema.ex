defmodule TodoListWeb.Schema do
  use Absinthe.Schema

  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  def context(ctx) do
    loader = 
      Dataloader.new()
      |> Dataloader.add_source(:generic, TodoList.Loaders.Generic.data())
      |> Dataloader.add_source(:todo, TodoList.Loaders.Todo.data())
    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  object :list do
    field :id, non_null(:id)
    field :uuid, non_null(:string)
  end

  object :group do
    field :id, non_null(:id)
    field :uuid, non_null(:string)
    field :title, non_null(:string)
    field :todos, list_of(:todo), resolve: dataloader(:todo)
  end

  object :todo do
    field :id, non_null(:id)
    field :title, non_null(:string)
    field :completed, non_null(:boolean)
    field :locked, non_null(:boolean)
    field :dependencies, list_of(:todo), resolve: dataloader(:generic)
  end

  query do
    field :groups, list_of(:group) do
      arg :list_uuid, non_null(:string)
      resolve &TodoList.Resolvers.List.Groups.call/2
    end
  end

  mutation do
    field :create_list, type: :list do
      resolve &TodoList.Resolvers.List.Create.call/2
    end

    field :create_group, type: :group do
      arg :title, non_null(:string)
      arg :list_uuid, non_null(:string)
      resolve &TodoList.Resolvers.Group.Create.call/2
    end

    field :create_todo, type: :todo do
      arg :title, non_null(:string)
      arg :group_id, non_null(:id)
      arg :dependencies, list_of(:id)
      resolve &TodoList.Resolvers.Todo.Create.call/2
    end

    field :toggle_todo, type: :todo do
      arg :id, non_null(:id)
      resolve &TodoList.Resolvers.Todo.Toggle.call/2
    end
  end
end
