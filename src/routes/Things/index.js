import CreateThingContainer from './containers/CreateThingContainer'
import ThingsContainer from './containers/ThingsContainer'
import ThingContainer from './containers/ThingContainer'

import './styles/main.scss'

export default [{
  path: '/things',
  component: ThingsContainer
},
{
  path: '/thing/:id',
  component: ThingContainer
},
{
  path: '/things/create',
  component: CreateThingContainer
}]