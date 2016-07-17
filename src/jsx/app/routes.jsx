import { IndexRoute, Route, Router } from 'react-router';

import { hashHistory, browserHistory } from 'react-router';

import classNames from 'classnames';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

import SidebarMixin from 'global/jsx/sidebar_component';

import Blank from 'routes/blank';
import Blank1 from 'routes/blank1';

import quotes from 'routes/quotes';

import SimpleSearch from 'routes/simpleSearch';
import nesto from 'routes/nesto'



@SidebarMixin
class App extends React.Component {
  render() {
    var classes = classNames({
      'container-open': this.props.open
    });

    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header />
        {this.props.children}
        <Footer />
      </Container>
    );
  }
}

export default (withHistory, onUpdate) => {
  const history = withHistory?
                  (Modernizr.history ?
                    browserHistory
                  : hashHistory)
                : null;
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={App}>
        <IndexRoute component={quotes} />
        <Route path='/app/search' component={SimpleSearch} />
          <Route path='nesto' component={nesto} />

        <Route path='something-else' component={Blank} />
        <Route path='something-else-1' component={Blank1} />
     
          <Route path='something-else-1/:categories' component={Blank1} />
        <Route path='app/:id' component={Blank1} />

      </Route>
    </Router>
  );
};
