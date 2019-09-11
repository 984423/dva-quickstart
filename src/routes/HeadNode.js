import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

export default class HeadNode extends PureComponent{

  static propTypes = {
    loaderState: PropTypes.string.isRequired,
  };

  static defaultProps = {
    loaderState: '',
  };

  render(){
    const {
      loaderState
    } = this.props
    if (loaderState !== 'refreshing') {
      return null
    }
    return(
      <h3 className="pull-load-head-default">
        刷新中...
      </h3>
    )
  }
}