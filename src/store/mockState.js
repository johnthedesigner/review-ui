import faker from 'faker'

function makeItems (index) {
  let items = []
  for (let i=0; i<10; i++) {
    let item = {
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraphs(),
      rating: faker.random.number(5),
      id: faker.random.uuid()
    }
    items.push(item)
  }
  return items
}

const buildMockState = () => {
  return {
    reviews : {
      // items: [{title:'test',id:0},{title:'test2',id:1}]
      items: makeItems()
    }
  }
}

const mockState = buildMockState()

export default mockState