import CreateReviewContainer from './containers/CreateReviewContainer'
import ReviewContainer from './containers/ReviewContainer'
import ReviewsContainer from './containers/ReviewsContainer'
import ThingsContainer from './containers/ThingsContainer'
import ThingContainer from './containers/ThingContainer'

import './styles/main.scss'

export default [{
  path: '/reviews',
  component: ReviewsContainer
},
{
  path: '/review/:id',
  component: ReviewContainer
},
{
  path: '/reviews/create/:thingId',
  component: CreateReviewContainer
},
{
  path: '/things',
  component: ThingsContainer
},
{
  path: '/thing/:id',
  component: ThingContainer
}]