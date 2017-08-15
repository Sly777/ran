import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import App from '../components/App';
import Header from '../components/Header';
import { onComponentDidMount } from '../libraries/googleAnalytics';

export default class Default extends Component {
  static propTypes = {
    title: PropTypes.string,
    url: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  static defaultProps = {
    title: ''
  };

  componentDidMount() {
    onComponentDidMount();
  }

  render() {
    return (
      <App>
        <Helmet>
          <title>
            {this.props.title !== ''
              ? `${this.props.title} :: RAN! Example`
              : 'RAN! Example'}
          </title>
        </Helmet>
        <Header pathname={this.props.url.pathname} />
        {this.props.children}
      </App>
    );
  }
}
