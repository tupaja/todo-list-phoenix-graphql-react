import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import List from "./components/List";
import Home from "./components/Home";
import initStore from "./store";

import "../css/app.scss";

const history = createBrowserHistory();
const store = initStore(history);
const client = new ApolloClient({
  uri: "http://localhost:4000/api/graphiql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/l/:listUuid" component={List} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
