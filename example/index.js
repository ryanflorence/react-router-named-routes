import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import {
  NamedRoutes,
  NamedRouteLink as Link
} from 'react-router-named-routes'

const App = React.createClass({
  render() {
    return (
      <div style={{ fontFamily: 'sans-serif', fontWeight: '200' }}>
        <h1>Named Route Links!</h1>
        <div style={{ display: 'flex' }}>
          <div>
            <h2>Index</h2>
            <ul>
              <li>
                <Link to="chapter" params={{ chapter: '1' }}>
                  Chapter 1
                </Link>
              </li>
              <li>
                <Link to="chapter" params={{ chapter: '2' }}>
                  Chapter 2
                </Link>
              </li>
            </ul>
          </div>
          <div style={{ flex: '1', paddingLeft: '60px' }}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})

const Home = React.createClass({
  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    )
  }
})

const Chapter = React.createClass({
  render() {
    const { chapter } = this.props.params
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <h2>Chapter {chapter}</h2>
          <ul>
            <li><Link to="home">Up to Home</Link></li>
            <li><Link to="page" params={{ chapter, page: 1 }}>Chapter {chapter}, Page 1</Link></li>
            <li><Link to="page" params={{ chapter, page: 2 }}>Chapter {chapter}, Page 2</Link></li>
          </ul>
        </div>
        <div style={{ flex: '1', paddingLeft: '60px' }}>
          {this.props.children}
        </div>
      </div>
    )
  }
})

const Page = React.createClass({
  render() {
    const { chapter, page } = this.props.params
    return (
      <div>
        <h2>Chapter {chapter}, Page {page}</h2>
        <ul>
          <li><Link to="home">Up to Home</Link></li>
          <li><Link to="chapter" params={{ chapter }}>Up to Chapter {chapter}</Link></li>
        </ul>
      </div>
    )
  }
})

const routes = (
  <Route path="/" component={App}>
    <IndexRoute name="home" component={Home}/>
    <Route name="chapter" path="ch/:chapter" component={Chapter}>
      <Route name="page" path=":page" component={Page}/>
    </Route>
  </Route>
)

render(
  <Router
    history={browserHistory}
    routes={routes}
    render={props => <NamedRoutes {...props} routeConfig={routes}/>}
  />,
  document.getElementById('app')
)

