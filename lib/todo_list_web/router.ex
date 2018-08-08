defmodule TodoListWeb.Router do
  use TodoListWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api" do
    pipe_through :api

    forward "/graphiql",
      Absinthe.Plug.GraphiQL,
      schema: TodoListWeb.Schema

    forward "/",
      Absinthe.Plug,
      schema: TodoListWeb.Schema
  end

  scope "/", TodoListWeb do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TodoListWeb do
  #   pipe_through :api
  # end
end
