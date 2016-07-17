import { Link } from 'react-router';
import { matchPattern } from 'react-router/lib/PatternUtils';
import classNames from 'classnames';

import { Motion, spring } from 'react-motion';

window.routesStore = {};

function enableStateForPathname(pathname, params) {
  for (var pattern in routesStore) {
    var matchedRoute = matchRoutes([pattern], pathname, params);

    if (matchedRoute == pattern) {
      routesStore[pattern] = true;
    } else {
      routesStore[pattern] = false;
    }
  }
}

function matchRoute(pattern, pathname, params) {
  var remainingPathname = pathname;
  var paramNames = [], paramValues = [];

  if (remainingPathname !== null && pattern) {
    const matched = matchPattern(pattern, remainingPathname)

    if (!matched.paramNames || !matched.paramValues) {
      return false;
    }
    remainingPathname = matched.remainingPathname
    paramNames = [ ...paramNames, ...matched.paramNames ]
    paramValues = [ ...paramValues, ...matched.paramValues ]

    if (remainingPathname === '') {
      // We have an exact match on the route. Just check that all the params
      // match.
      // FIXME: This doesn't work on repeated params.
      return(paramNames.every((paramName, index) => (
        (String(paramValues[index]) === String(params[paramName]))
      )));
    }
  }

  return false;
}

function matchRoutes(routes, pathname, params) {
  var matched = false, patternMatched = '';
  for(var i = 0; i < routes.length; i++) {
    if (matchRoute(routes[i], pathname, params)) {
      if (matched == true) {
        if (matchRoute(patternMatched, routes[i], params)) {
          patternMatched = routes[i];
        }
      } else {
        matched = true;
        patternMatched = routes[i];
      }
    }
  }

  if (matched) {
    return patternMatched;
  } else {
    return false;
  }
}

var openState = (!Modernizr.touchevents) ? (localStorage.getItem('sidebar-open-state') === 'true' ? true : false) : false;

export default function SidebarMixin(ComposedComponent) {
  return React.createClass({
    displayName: 'SidebarMixin',
    getInitialState() {
      return {
        open: true
      };
    },
    isOpen() {
      return this.state.open === open;
    },
    sidebarStateChangeCallback(open) {
      if(this.isOpen()) return;
      if(open !== undefined) {
        openState = open;
      } else {
        openState = !this.state.open;
      }
      this.setState({
        open: openState // toggle sidebar
      });
      localStorage.setItem('sidebar-open-state', openState);
    },
    enablePath(props) {
      enableStateForPathname(props.location.pathname, props.params);
      ReactBootstrap.Dispatcher.emit('sidebar:activate');
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.location.pathname !== nextProps.location.pathname) {
        this.enablePath(nextProps);
      }
    },
    componentWillMount() {
      ReactBootstrap.Dispatcher.on('sidebar', this.sidebarStateChangeCallback);
    },
    componentWillUnmount() {
      ReactBootstrap.Dispatcher.off('sidebar', this.sidebarStateChangeCallback);
    },
    componentDidMount() {
      this.setState({
        open: openState
      });

      this.enablePath(this.props);
    },
    render() {
      return <ComposedComponent {...this.props} open={this.state.open} />;
    }
  });
}

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      left: ((this.props.sidebar * 100) + '%'),
      visibility: (this.props.sidebar === 0) ? 'visible' : 'hidden'
    };
  }

  repositionScrollbar(child_node, top, height) {
    var node = $(ReactDOM.findDOMNode(this.refs.sidebar));
    var scrollTo = top - node.offset().top + node.scrollTop();
    if(node.find(child_node).length) {
      if(scrollTo > ($(window).height() / 2)) {
        node.scrollTop(scrollTo - ($(window).height() / 2) + 100);
      }
    }
    if(!Modernizr.touchevents) {
      this.updateScrollbar();
    }
  }

  updateScrollbar() {
    if(!Modernizr.touchevents) {
      $(ReactDOM.findDOMNode(this.refs.sidebar)).perfectScrollbar('update');
    }
  }

  initializeScrollbar() {
    $(ReactDOM.findDOMNode(this.refs.sidebar)).perfectScrollbar({
      suppressScrollX: true
    });
  }

  handleKeyChange(sidebar) {
    var newLeft = ((this.props.sidebar*100) - (sidebar*100))+'%';
    this.setState({
      left: newLeft,
      visibility: 'visible'
    });
  }

  componentWillUnmount() {
    ReactBootstrap.Dispatcher.off('sidebar:reposition', this.repositionScrollbar.bind(this));
    ReactBootstrap.Dispatcher.off('sidebar:update', this.updateScrollbar.bind(this));
    ReactBootstrap.Dispatcher.off('sidebar:keychange', this.handleKeyChange.bind(this));
  }

  componentDidMount() {
    if(!Modernizr.touchevents) {
      this.initializeScrollbar();
    }

    ReactBootstrap.Dispatcher.on('sidebar:reposition', this.repositionScrollbar.bind(this));
    ReactBootstrap.Dispatcher.on('sidebar:update', this.updateScrollbar.bind(this));
    ReactBootstrap.Dispatcher.on('sidebar:keychange', this.handleKeyChange.bind(this));

    if (this.props.active) {
      ReactBootstrap.Dispatcher.emit('sidebar:controlbtn', this.props);
      ReactBootstrap.Dispatcher.emit('sidebar:keychange', this.props.sidebar);
    }
  }

  render() {
    var props = {
      style: {
        left: this.state.left,
        visibility: this.state.visibility,
        transition: 'all 0.3s ease',
        OTransition: 'all 0.3s ease',
        MsTransition: 'all 0.3s ease',
        MozTransition: 'all 0.3s ease',
        WebkitTransition: 'all 0.3s ease'
      },
      ...this.props,
      className: classNames('sidebar',
                            'sidebar__main',
                            this.props.className)
    };

    return (
      <div ref='sidebar' {...props} children={null} data-id={this.props.sidebar}>
        <div ref='innersidebar'>{this.props.children}</div>
      </div>
    );
  }
}

export class SidebarNav extends React.Component {
  static id = 0;

  constructor(props) {
    super(props);

    this.id = ++SidebarNav.id;
  }

  getID() {
    return this.id;
  }

  getHeight() {
    return ReactDOM.findDOMNode(this.refs.ul).getClientRects()[0].height;
  }

  search(text) {
    ReactBootstrap.Dispatcher.emit('sidebar:search', text, this.getID());
  }

  render() {
    var classes = classNames('sidebar-nav',
                              this.props.className);

    if (this.props.sidebarNavItem) {
      this.props.sidebarNavItem.childSidebarNav = this;
    }

    var props = {
      ...this.props,
      className: classes
    };

    var children = React.Children.map(this.props.children, (el) => {
      return React.cloneElement(el, {
        SidebarNavID: this.getID(),
        sidebarNavItem: this.props.sidebarNavItem,
        rootSidebarNavItem: this.props.rootSidebarNavItem
      });
    });

    return (
      <ul ref='ul' {...props} children={null}>
        {children}
      </ul>
    );
  }
}

export class SidebarNavItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open || false,
      active: this.props.active || false,
      toggleOpen: this.props.open || false,
      dir: 'left',
      opposite: false,
      height: 45,
    };

    this.routes = [];
  }

  handleLayoutDirChange(dir) {
    this.setState({
      dir: dir === 'ltr' ? 'left' : 'right',
      opposite: dir === 'ltr' ? false : true
    });
  }

  getTotalHeight() {
    if (this.childSidebarNav) {
      return this.childSidebarNav.getHeight() + 45;
    } else {
      return 45;
    }
  }

  openSidebarNav(fullOpen, height, isClosing) {
    if (this.state.open && !height) return;

    height = height || 0;
    var thisHeight = this.getTotalHeight();
    var totalHeight = height + thisHeight;

    if (this.childSidebarNav) {
      this.setState({
        height: totalHeight,
        open: true,
        toggleOpen: true,
      }, () => {
        ReactBootstrap.Dispatcher.emit('sidebar:update');
        if (this.props.sidebarNavItem) {
          if (isClosing) {
            this.props.sidebarNavItem.openSidebarNav(false, 45 - totalHeight, true);
          } else {
            if (fullOpen) {
              this.props.sidebarNavItem.openSidebarNav(true, totalHeight - 45);
            } else {
              this.props.sidebarNavItem.openSidebarNav(false, thisHeight - 45);
            }
          }
        }
      });
    }
  }

  closeSidebarNav(collapseRoot) {
    if (!this.state.open) return;

    var thisHeight = this.getTotalHeight();
    if (this.childSidebarNav) {
      this.setState({
        height: 45,
        open: false,
        toggleOpen: false,
      }, () => {
        ReactBootstrap.Dispatcher.emit('sidebar:update');
        if (this.props.sidebarNavItem) {
          this.props.sidebarNavItem.openSidebarNav(false, 45 - thisHeight, true);
        }
      });
    }
  }

  toggleSidebarNav() {
    if (this.state.height === 45) {
      this.openSidebarNav();
    } else {
      this.closeSidebarNav();
    }
  }

  getTopmostLi(node, li, original_node) {
    if (!original_node) original_node = node;
    while (node.parentNode) {
      if (node.parentNode.className.search('sidebar-nav-container') !== -1) {
        if (li) {
          return li;
        } else {
          return original_node;
        }
      }

      if (node.parentNode.nodeName.toLowerCase() === 'li') {
        li = node.parentNode;
      }
      node = node.parentNode;
    }
  }

  getSiblingsLi(node) {
    var original_node = node;
    var sibilings = [];
    while (node.nextSibling) {
      sibilings.push(node.nextSibling);
      node = node.nextSibling;
    }
    node = original_node;
    while (node.previousSibling) {
      sibilings.push(node.previousSibling);
      node = node.previousSibling;
    }

    return sibilings;
  }

  getSiblingsNav(node) {
    var original_node = node;
    var siblings = [];
    while (node.nextSibling) {
      if (node.nextSibling.className.search('sidebar-nav') !== -1) {
        siblings.push(node.nextSibling);
      }
      node = node.nextSibling;
    }
    node = original_node;
    while (node.previousSibling) {
      if (node.previousSibling.className.search('sidebar-nav') !== -1) {
        siblings.push(node.previousSibling);
      }
      node = node.previousSibling;
    }

    return siblings;
  }

  getTopmostSidebar(node) {
    while (node.parentNode) {
      if (node.parentNode.className.search('sidebar__main') !== -1) {
        return node.parentNode;
      }
      node = node.parentNode;
    }
  }

  checkAndClose(props) {
    var node = ReactDOM.findDOMNode(this._node);

    var topmostLi = this.getTopmostLi(node);
    var topmostSiblingLis = this.getSiblingsLi(topmostLi);
    var siblingLis = this.getSiblingsLi(node);
    var topmostSidebar = this.getTopmostSidebar(node);
    var id = parseInt(topmostSidebar.getAttribute('data-id')) || 0;

    ReactBootstrap.Dispatcher.emit('sidebar:controlbtn', {sidebar: id});
    ReactBootstrap.Dispatcher.emit('sidebar:keychange', id);

    for (var i = siblingLis.length - 1; i >= 0; i--) {
      var li = siblingLis[i];
      li.close();
    };

    for (var i = 0; i < topmostSiblingLis.length; i++) {
      var li = topmostSiblingLis[i];
      li.close();
    }

    try {
      var height = node.getClientRects()[0].height;
      var top = node.getClientRects()[0].top;
      setTimeout(() => {
        ReactBootstrap.Dispatcher.emit('sidebar:reposition', node, top, height);
      }, 300);
    } catch(e) {

    }
  }

  handleSearch(text, id) {
    var node = $(this._node);

    if (!this.props.hidden) {
      if(id === this.props.SidebarNavID) {
        if(node.text().toLowerCase().search(text.toLowerCase()) === -1) {
          node.slideUp();
        } else {
          node.slideDown();
        }
      }
    }
  }


  closeNav() {
    this.closeSidebarNav();
  }

  handleClick = (e) => {
    if (!this.props.href) {
      e.preventDefault();
      e.stopPropagation();
      this.toggleSidebarNav();
    }
    if (this.props.hasOwnProperty('onClick')) {
      this.props.onClick();
    }

    this.closeNav();
  };

  activateSidebar() {
    var found = false, route;
    for (var i = 0; i < this.routes.length; i++) {
      var r = this.routes[i];
      if (routesStore[r]) {
        route = r;
        found = true;
        break;
      }
    }
    if (found) {
      this.setState({
        active: true
      });

      this.checkAndClose(this.props);

      if (this.props.sidebarNavItem) {
        this.props.sidebarNavItem.openSidebarNav(true);
      }

      if (this.props.rootSidebarNavItem) {
        this.props.rootSidebarNavItem.openSidebarNav();
      }
    } else {
      this.setState({
        active: false
      });
    }
  }

  closeSidebarRoot() {
    if (!this.props.sidebarNavItem) {
      this.closeSidebarNav();
    }
  }

  componentWillUnmount() {
    ReactBootstrap.Dispatcher.off('sidebar:activate', this.activateSidebar.bind(this));
    ReactBootstrap.Dispatcher.off('sidebar:close', this.closeSidebarRoot.bind(this));
    ReactBootstrap.Dispatcher.off('sidebar:search', this.handleSearch.bind(this));
  }

  componentDidMount() {
    ReactBootstrap.Dispatcher.on('sidebar:activate', this.activateSidebar.bind(this));
    ReactBootstrap.Dispatcher.on('sidebar:close', this.closeSidebarRoot.bind(this));
    ReactBootstrap.Dispatcher.on('sidebar:search', this.handleSearch.bind(this));

    if (this.props.hasOwnProperty('href') && this.props.href.length && this.props.href !== '#') {
      routesStore[this.props.href] = this.state.active;

      this.routes.push(this.props.href);

      if (this.props.aliases) {
        for (var i = 0; i < this.props.aliases.length; i++) {
          var alias = this.props.aliases[i];
          this.routes.push(alias);
          routesStore[alias] = this.state.active;
        }
      }
    }

    var node = ReactDOM.findDOMNode(this._node);
    node.close = this.closeNav.bind(this);
  }

  render() {
    var classes = classNames({
      'open': this.state.open,
      'active': this.state.active,
      'sidebar-nav-item': true,
    });
    var toggleClasses = classNames({
      'toggle-button': true,
      'open': this.state.toggleOpen,
      'opposite': this.state.opposite
    });
    var icon=null, toggleButton = null;
    if(this.props.children) {
      toggleButton = <Icon className={toggleClasses.trim()} bundle='fontello' glyph={this.state.dir+'-open-3'} />;
    }
    if(this.props.glyph || this.props.bundle) {
      icon = <Icon bundle={this.props.bundle} glyph={this.props.glyph} />;
    }
    var style = {height: this.props.autoHeight ? 'auto' : this.state.height};

    var props = {
      name: null,
      style: style,
      tabIndex: '-1',
      ...this.props,
      className: classes.trim()
    };

    var RouteLink = 'a';
    var componentProps = {
      name: null,
      tabIndex: -1,
      href: this.props.href || '',
      onClick: this.handleClick,
      style: {height: 45}
    };

    var pointerEvents = 'all';
    if(this.props.hasOwnProperty('href') && this.props.href.length && this.props.href !== '#') {
      RouteLink = Link;
      componentProps.to = this.props.href;
      delete componentProps.href;

      if(this.props.href.search(":") !== -1) {
        pointerEvents = 'none';
      }
    }

    var isRoot = this.props.sidebarNavItem ? false : true;

    var children = React.Children.map(this.props.children, (el) => {
      return React.cloneElement(el, {
        sidebarNavItem: this,
        rootSidebarNavItem: isRoot ? this : this.props.rootSidebarNavItem
      });
    });

    return (
      <Motion style={{height: spring(this.state.height, {stiffness: 300, damping: 20, precision: 0.0001})}}>
        {(style) =>
          <li ref={(c) => this._node = c} {...props} style={{display: this.props.hidden ? 'none': 'block', pointerEvents: pointerEvents, ...style}}>
            <RouteLink {...componentProps}>
              {icon}
              <span className='name'>{this.props.name}</span>
              {toggleButton}
            </RouteLink>
            {children}
          </li>
        }
      </Motion>
    );
  }
}

export class SidebarControls extends React.Component {
  render() {
    var classes = classNames('sidebar-controls-container',
                              this.props.className);
    var props = {
      dir: 'ltr',
      ...this.props,
      className: classes
    };

    return (
      <div {...props} children={null}>
        <div className='sidebar-controls' tabIndex='-1'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class SidebarControlBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.active || false
    };
  }

  handleClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ReactBootstrap.Dispatcher.emit('sidebar:controlbtn', this.props);
    ReactBootstrap.Dispatcher.emit('sidebar:keychange', this.props.sidebar);
  };

  handleState(props) {
    if(props.hasOwnProperty('sidebar')) {
      if(props.sidebar === this.props.sidebar) {
        this.setState({active: true});
      } else {
        this.setState({active: false});
      }
    }
  }

  componentWillUnmount() {
    ReactBootstrap.Dispatcher.off('sidebar:controlbtn', this.handleState.bind(this));
  }

  componentDidMount() {
    ReactBootstrap.Dispatcher.on('sidebar:controlbtn', this.handleState.bind(this));
  }

  render() {
    var classes = classNames('sidebar-control-btn', {
      'active': this.state.active
    }, this.props.className);

    var props = {
      tabIndex: '-1',
      onClick: this.handleClick,
      ...this.props,
      className: classes.trim()
    };
    return (
      <li {...props}>
        <a href='#' tabIndex='-1'>
          <Icon bundle={this.props.bundle} glyph={this.props.glyph}/>
        </a>
      </li>
    );
  }
}

export class SidebarBtn extends React.Component {
  handleSidebarStateChange = (props) => {
    if(props['data-id'] === 'sidebar-btn') {
      ReactBootstrap.Dispatcher.emit('sidebar');
    }
  };

  render() {
    var classes = classNames('pull-left visible-xs-inline-block',
                             this.props.className);
    var props = {
      ...this.props,
      classes
    };

    return (
      <NavContent {...props}>
        <Nav onItemSelect={this.handleSidebarStateChange}>
          <NavItem data-id='sidebar-btn' className='sidebar-btn' href='/'>
            <Icon bundle='fontello' glyph='th-list-5' />
          </NavItem>
        </Nav>
      </NavContent>
    );
  }
}
