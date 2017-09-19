import React,{Component} from 'react';
import classNames from 'classnames';

export default class extends Component {
  render() {
    return (
      <section className="<%= component_name %>">
        {this.props.children}
      </section>
    )
  }
}
