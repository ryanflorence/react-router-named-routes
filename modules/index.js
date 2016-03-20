import React from 'react'
import Link from 'react-router/lib/Link'
import { formatPattern } from 'react-router/lib/PatternUtils'
import warning from 'warning'

export const useNamedRoutes = (routes) => ({
  renderRootContainer: (props) => (
    <NamedRoutesContainer {...props} routeConfig={routes}/>
  )
})

const { shape, any, object } = React.PropTypes

const namedRoutesContextType = {
  namedRoutes: shape({
    routeMap: any.isRequired
  }).isRequired
}

const createRouteMap = (route, parentName, parentPath, map = {}) => {
  map       = handleExtractRouteName(route, parentName, parentPath, map)
  let routeName = getRouteName(route, parentName)
  let routePath = getRoutePath(route, parentPath)

  React.Children.forEach(route.props.children, (child) => {
    map = createRouteMap(child, routeName, routePath, map)
  })

  return map
}

const NamedRoutesContainer = React.createClass({
  propTypes: {
    routeConfig: any.isRequired
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
    const { render, ...props } = this.props
    return render(props)
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

/**
 * @param route
 * @param parentName
 * @returns {any}
 */
function getRouteName(route, parentName) {
  if ( !route.props.path && !route.props.name ) {
    return parentName
  }

  let routeName = route.props.name || route.props.path

  if ( !routeName ) {
    return parentName
  }

  validateRouteName(routeName)
  return parentName ? parentName + '.' + routeName : routeName
}

/**
 * @param route
 * @param parentPath
 * @returns {any}
 */
function getRoutePath(route, parentPath) {
  if ( !route.props.path ) {
    return parentPath
  }

  return (parentPath ? parentPath + '/' + route.props.path : route.props.path).replace('//', '/')
}

/**
 * @param name
 */
function validateRouteName(name) {
  if ( name.indexOf(':') !== -1 || name.indexOf('*') !== -1 || name.indexOf('/') !== -1 ) {
    if ( process.env.NODE_ENV !== 'production' ) {
      throw new Error('Invalid route name. The route with name ' + name + ' contains parameters (since it contains ":", "*" or "/" thus the name is invalid. Please check this route.')
    } else {
      throw new Error('Invalid route name "' + name + '". Please compile for "development" to see the full error message')
    }
  }
}

function handleExtractRouteName(route, parentName, parentPath, map) {
  let routeName = getRouteName(route, parentName)
  let routePath = getRoutePath(route, parentPath)

  if ( !routeName ) {
    return map
  }

  map[ routeName ] = routePath
  return map
}
