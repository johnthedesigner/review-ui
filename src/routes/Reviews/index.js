import ReviewsContainer from './containers/ReviewsContainer'
import CreateReviewContainer from './containers/CreateReviewContainer'

export default [{
  path: '/reviews',
  component: ReviewsContainer
},
{
  path: '/reviews/create',
  component: CreateReviewContainer
}]