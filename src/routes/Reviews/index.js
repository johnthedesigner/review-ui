import CreateReviewContainer from './containers/CreateReviewContainer'
import ReviewContainer from './containers/ReviewContainer'
import ReviewsContainer from './containers/ReviewsContainer'
import ThingsContainer from './containers/ThingsContainer'

export default [{
  path: '/reviews',
  component: ReviewsContainer
},
{
  path: '/review/:reviewId',
  component: ReviewContainer
},
{
  path: '/reviews/create',
  component: CreateReviewContainer
},{
  path: '/things',
  component: ThingsContainer
}]