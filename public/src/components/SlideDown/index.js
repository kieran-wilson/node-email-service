import React, { PureComponent } from 'react';
import { Transition } from 'react-transition-group';

export default class SlideDown extends PureComponent {
  static defaultProps = {
    timeout: 500
  };

  constructor(props) {
    super(props);
    this.state = {
      styles: {
        height: 0,
        opacity: 0,
        transition:
          `height ${this.props.timeout}ms ease-in-out, ` +
          `opacity ${this.props.timeout}ms ease-in-out`
      }
    };
  }

  onEnter = node => {
    this.setState({
      styles: {
        ...this.state.styles,
        height: node.scrollHeight,
        opacity: 1
      }
    });
  };

  onExit = node => {
    this.setState({
      styles: {
        ...this.state.styles,
        height: node.scrollHeight,
        opacity: 0
      }
    });
  };

  onExiting = () => {
    this.setState({
      styles: {
        ...this.state.styles,
        height: 0
      }
    });
  };

  render() {
    const { in: shouldShow, children, timeout, ...rest } = this.props;
    return (
      <Transition
        timeout={timeout}
        in={shouldShow}
        onEnter={this.onEnter}
        onEntered={this.onEntered}
        onExit={this.onExit}
        onExiting={this.onExiting}
        {...rest}
      >
        <div style={this.state.styles} ref={node => (this.node = node)}>
          {children}
        </div>
      </Transition>
    );
  }
}
