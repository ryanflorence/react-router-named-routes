# Named Routes for React Router

WIP. Link to routes by a global name, instead of a path.

## Installation

```
npm install react-router-named-routes react-router-apply-middleware
```

## Usage

```js
import { useNamedRoutes, NamedRouteLink } from 'react-router-named-routes'
import applyMiddleware from 'react-router-apply-middleware'

// name your routes
const routes = (
  <Route path="/" component={Root}>
    <IndexRoute name="home" component={Home}/>
    <Route path="chapter" path="chapter/:number" component={Chapter}/>
  </Route>
)

// use it in `render` of your `Router` and pass it your route config
<Router
  render={applyMiddleware(useNamedRoutes(routes))}
  routes={routes}
/>

// now you can use `NamedRouteLink` anywhere
<NamedRouteLink to="home"/>
<NamedRouteLink to="chapter" params={{ number: 10 }}/>
<NamedRouteLink
  to="chapter"
  params={{ number: 10 }}
  query={{ foo: 'bar' }}
/>
```

## More Work

- need to figure out `router.push`
- this might be better as a `useNamedRoutes` history middleware instead
  of router middleware

