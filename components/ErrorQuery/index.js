// @flow
import * as React from 'react';
import { Section } from './styles';
import ErrorQuery from './error-query';

type Props = {};
type State = {
  showQuery: boolean
};

class ErrorQueryComponent extends React.Component<Props, State> {
  state = {
    showQuery: false
  };

  render() {
    return (
      <Section>
        <h2>Click on button below to create Graphql Error Query</h2>
        <h3>
          Error handling by apollo-link-error, it will automatically redirect to
          error page if there an error is occured on Graphql Query
        </h3>
        <button
          type="button"
          onClick={() => {
            this.setState({ showQuery: true });
          }}
        >
          Create Error
        </button>
        {this.state.showQuery && <ErrorQuery />}
      </Section>
    );
  }
}

export default ErrorQueryComponent;
