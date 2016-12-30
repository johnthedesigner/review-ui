import faker from 'faker'
import _ from 'lodash'

// Make array with (x) number of things
function mockArray (count, mockFn) {
  let items = []
  for (let i=0; i<count; i++) {
    items.push(mockFn(i))
  }
  return items
}

// Mock a review item
function mockReview (index) {
  return {
    createdDate: faker.date.past(),
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraphs(),
    rating: faker.random.number(5),
    id: faker.random.uuid(),
    reviewable: {
      title: faker.lorem.sentence(),
      excerpt: faker.lorem.sentence(),
      thumbnail: faker.image.cats()
    },
    reviewer: {
      username: faker.internet.userName(),
      avatar: faker.image.avatar()
    }
  }
}

// Mock a reviewable item
function mockReviewable (index) {
  return {
    createdDate: faker.date.past(),
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraphs(),
    id: index
  }
}

// Mock state tree
const buildMockState = () => {
  return {
    reviews : {
      items: _.orderBy(mockArray(10,mockReview),'createdDate','desc')
    }
  }
}

export const mockState = buildMockState()

export const testState = {
  messages: {
    errorList: [],
    currentError: {},
    alertList: [],
    currentAlert: {}
  },
  reviews: {
    reviewsById: {},
    feed: {
      items: [],
      isLoading: true
    },
    currentReview: {
      id: null,
      isLoading: true
    },
    thingsById: {},
    thingsList: {
      items: [],
      isLoading: true
    },
    currentThing: {
      id: null,
      isLoading: true
    }
  },
  user: {
    isLoading: true,
    isLoggedIn: false,
    auth: {},
    error: {}
  }
}
