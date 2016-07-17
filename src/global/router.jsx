import { Router, match, RouterContext } from 'react-router';

if(window.hasOwnProperty('vex')) {
  vex.defaultOptions.className = 'vex-theme-flat-attack';
}

var initGoogleAnalytics = () => {
  if(window.hasOwnProperty('ga') && typeof window.ga === 'function') {
    window.ga('send', 'pageview', {
     'page': window.location.pathname + window.location.search  + window.location.hash
    });
  }
};

var finishPageLoad = () => {
  // l20n initialized only after everything is rendered/updated
  l20n.ready();
  setTimeout(() => {
    $('body').removeClass('fade-out');
  }, 500);
};

var onUpdate = (notReady) => {
  // cleanup (do not modify)
  rubix_bootstrap.core.reset_globals_BANG_();
  if(window.Rubix && notReady) window.Rubix.Cleanup();

  Pace.restart();

  initGoogleAnalytics();
  if(!notReady) finishPageLoad();
};

var InitializeRouter = (routes) => {
  onUpdate(true);
  var rootInstance = ReactDOM.render(routes, document.getElementById('app-container'), () => {
    finishPageLoad();
  });
};

module.exports = (routes) => {
  if('document' in window) {
    InitializeRouter(routes(true, onUpdate));
  } else {
    // called only server side!
    if(__BACKEND__ === 'rails') {
      var RoutingContextWrapper = React.createClass({
        displayName: "RoutingContextWrapper",
        childContextTypes: {
          data: React.PropTypes.oneOfType([
                  React.PropTypes.string,
                  React.PropTypes.object
                ])
        },
        getChildContext: function getChildContext() {
          return { data: this.props.data };
        },
        render: function render() {
          return React.createElement(RouterContext, this.props.renderProps);
        }
      });

      global.StaticComponent = React.createClass({
        render() {
          var Handler = null, props = this.props, data = props.data || "";

          ReactBootstrap.Dispatcher.removeAllListeners();
          rubix_bootstrap.core.reset_globals_BANG_();

          match({
            routes: routes(),
            location: (this.props.path +
                        (this.props.query ? ('?' + this.props.query)
                                          : ''))
          }, function(err, redirectLocation, renderProps) {
            Handler = <RoutingContextWrapper data={data} renderProps={renderProps} />
          });

          return Handler;
        }
      });
    } else {
      return () => {
        ReactBootstrap.Dispatcher.removeAllListeners();
        rubix_bootstrap.core.reset_globals_BANG_();
        return routes(false);
      };
    }
  }
};
