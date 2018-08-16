// this can be replaced with MockedProvider provided by
// apollo as soon as they allow passing cache as a prop
// related issues:
// https://github.com/apollographql/react-apollo/pull/2142
// https://github.com/apollographql/react-apollo/pull/2254

import React, { Component } from "react";
import PropTypes from "prop-types";
import ApolloClient from "apollo-client";
import { InMemoryCache as Cache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { MockLink } from "react-apollo/test-links";

// eslint-disable-next-line import/prefer-default-export
export class MockedProvider extends Component {
  static defaultProps = {
    addTypename: true
  };

  constructor(props, context) {
    super(props, context);
    const { mocks, addTypename, cache, defaultOptions } = this.props;
    const link = new MockLink(mocks, addTypename);
    this.client = new ApolloClient({
      link,
      cache: cache || new Cache({ addTypename }),
      defaultOptions
    });
  }

  render() {
    const { children } = this.props;
    return <ApolloProvider client={this.client}>{children}</ApolloProvider>;
  }
}

MockedProvider.propTypes = {
  mocks: PropTypes.array,
  addTypename: PropTypes.bool,
  cache: PropTypes.object,
  defaultOptions: PropTypes.object,
  children: PropTypes.node.isRequired
};
