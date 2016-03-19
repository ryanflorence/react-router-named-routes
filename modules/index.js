import React from 'react'
import Link from 'react-router/lib/Link'
import RouterContext from 'react-router/lib/RouterContext'
import IndexRoute from 'react-router/lib/IndexRoute'
import { formatPattern } from 'react-router/lib/PatternUtils'
import warning from 'warning'

const { shape, any, object } = React.PropTypes

const namedRoutesContextType = {
  namedRoutes: shape({
    routeMap: any.isRequired
  }).isRequired
}


const createRouteMap = (routes, accumulatedPath='', map={}) => {
  React.Children.forEach(routes, (route) => {
    const slash = accumulatedPath === '/' ? '' : '/'
    const path = route.type === IndexRoute ? accumulatedPath :
      route.props.path === '/' ?
        '/' : `${accumulatedPath}${slash}${route.props.path}`
    if (route.props.name)
      map[route.props.name] = path
    if (route.props.children)
      createRouteMap(route.props.children, path, map)
  })
  return map
}

export const NamedRoutes = React.createClass({
  propTypes: {
    routeConfig: any.isRequired
  },

  getDefaultProps() {
    return { render: props => <RouterContext {...props}/> }
  },

  childContextTypes: namedRoutesContextType,

  getInitialState() {
    const routeMap = createRouteMap(this.props.routeConfig)
    return { routeMap }
  },

  getChildContext() {
    return { namedRoutes: { routeMap: this.state.routeMap } }
  },

  render() {
    return this.props.render(this.props)
  }
})

export const NamedRouteLink = React.createClass({

  contextTypes: namedRoutesContextType,

  propTypes: {
    params: object,
    query: object,
    state: object
  },

  render() {
    const { to, params, query, state } = this.props
    const { routeMap } = this.context.namedRoutes
    const pattern = routeMap[to]
    if (!pattern) {
      warning(false, `[react-router-named-routes] No route was found with the name "${to}".`)
      return <Link {...this.props}/>
    } else {
      const pathname = params ? formatPattern(pattern, params) : pattern
      const loc = { pathname, query, state }
      return <Link {...this.props} to={loc} />
    }
  }

})

