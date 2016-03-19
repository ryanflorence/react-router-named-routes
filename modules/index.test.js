/*eslint-env mocha*/
import React from 'react'
import expect from 'expect'
import { Router, Route, IndexRoute } from 'react-router'
import { NamedRoutes, NamedRouteLink } from './index'
import { render } from 'react-dom'
import createHistory from 'react-router/lib/createMemoryHistory'

describe('NamedRoutes', () => {
  const run = (link, initialPath, assertion) => {
    const linkWithId = React.cloneElement(link, { className: '__subject__' })

    const Container = React.createClass({
      componentDidMount() {
        assertion(div.querySelector('a.__subject__'))
      },
      render() {
        return this.props.children
      }
    })

    const Parent = ({ children }) => <div>Parent {children}</div>
    const Reference = ({ children }) => <div>Reference {linkWithId} {children}</div>
    const Child = () => <div>Child</div>
    const Sibling = () => <div>Sibling</div>
    const Index = () => <div>Index</div>

    const routes = (
      <Route path="/" component={Container}>
        <IndexRoute name="index" component={Index}/>
        <Route name="parent" path="p" component={Parent}>
          <Route name="reference" path="r" component={Reference}>
            <Route name="child" path="c/:param" component={Child} />
          </Route>
          <Route name="sibling" path="s" component={Sibling}/>
        </Route>
      </Route>
    )

    const div = document.createElement('div')

    render((
      <Router
        routes={routes}
        history={createHistory(initialPath)}
        render={props => <NamedRoutes {...props} routeConfig={routes}/>}
      />
    ), div)
  }

  it('links to routes by name', (done) => {
    run(<NamedRouteLink to="parent"/>, '/p/r', (node) => {
      expect(node.getAttribute('href')).toEqual('/p')
      done()
    })
  })

  it('works with index routes', (done) => {
    run(<NamedRouteLink to="index"/>, '/p/r', (node) => {
      expect(node.getAttribute('href')).toEqual('/')
      done()
    })
  })

  it('injects params', (done) => {
    run(<NamedRouteLink to="child" params={{ param: 'test' }}/>, '/p/r', (node) => {
      expect(node.getAttribute('href')).toEqual('/p/r/c/test')
      done()
    })
  })

  describe('isActive', () => {
    it('renders links as active')
    it('renders index links as active')
  })
})
