import React,{PureComponent} from 'react';
import classNames from 'classnames';

export default class extends PureComponent {
  render() {
    return (
      <section className="<%= component_name %>">
        {this.props.children}
      </section>
    )
  }
}
