# Named Routes for React Router

WIP. Link to routes by a global name, instead of a path.

## Installation

...

## Usage

```js
import { useNamedRoutes, NamedRouteLink } from 'react-router-named-routes'
import applyMiddleware from 'react-router-apply-middleware'

// name your routes
const routes = (
  <Route path="/" component={Root}>
    <IndexRoute name="home" component={Home}/>
    <Route name="chapter" path="chapter/:number" component={Chapter}/>
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

// don't forget, you can just call it Link if you'd prefer
import { NamedRouteLink as Link } from 'react-router-named-routes'
<Link to="home"/>
```

## More Work

- need to figure out `router.push`
- this needs a `useNamedRoutes` history middleware too, unless we're okay with
  wrapping histories in the component lifecycle :\

