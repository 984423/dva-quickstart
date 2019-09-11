import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { STATS } from 'react-pullload';

export default class FooterNode extends PureComponent{

  static propTypes = {
    loaderState: PropTypes.string.isRequired,
    hasMore: PropTypes.bool.isRequired
  };

  static defaultProps = {
    loaderState: STATS.init,
    hasMore: true
  };

  render(){
    const {
      loaderState,
      hasMore
    } = this.props
    let className = `pull-load-footer-default ${hasMore? "" : "nomore"}`

    return(
      <h3 className={className} style={{textAlign: 'center'}}>
        {
          loaderState === STATS.loading ? 'loading...' : ""
        }
      </h3>
    )
  }
}