# Named Routes for React Router

WIP

## Usage

```js
import { NamedRoutes, NamedRouteLink } from 'react-router-named-routes'

// name your routes
const routes = (
  <Route path="/" component={Root}>
    <IndexRoute name="home" component={Home}/>
    <Route path="chapter" path="chapter/:number" component={Chapter}/>
  </Route>
)

// use it in `render` of your `Router` and pass it your route config
<Router
  routes={routes}
  render={props => <NamedRoutes {...props} routeConfig={routes}}
/>

// now you can use `NamedRouteLink` anywhere
<NamedRouteLink to="chapter" params={{ number: 10 }}/>
```

