import AppBase, {$app} from 'components';

export default class extends React.PureComponent {

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}
