import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import AppBase from 'components';


import Container from './container';
import Success from './success';


const routes = (
  <Route path="/" component={Container}>
    <IndexRedirect to="/success"/>
    <Route path="/success" component={Success}/>
  </Route>
);


export default class extends AppBase {
  static initialState() {
    return {
      memory: {
        total: 0,
        rows: []
      },
      local: {
        test: 200,
        store: 0,
        items: [
          {key: 1}
        ]
      },
      session: {
        afei: 'session test..'
      }
    }
  }

  render() {
    return (
      <Router history={hashHistory}>
        {routes}
      </Router>
    )
  }
}
