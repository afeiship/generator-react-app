import AppBase, {$app} from 'components/scripts/index';

export default class extends React.PureComponent {

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}
