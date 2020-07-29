const palindrome = string => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = array => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, current) => (favorite.likes > current.likes) ? favorite : current, {})
}

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    user: {
      _id: "5f2181994d09782980e41ef4",
      username: "juuser",
      name: "Juuser Name"
    },
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    user: {
      _id: "5f2181994d09782980e41ef4",
      username: "juuser",
      name: "Juuser Name"
    },
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    user: {
      _id: "5f2181994d09782980e41ef4",
      username: "juuser",
      name: "Juuser Name"
    },
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    user: {
      _id: "5f2181994d09782980e41ef4",
      username: "juuser",
      name: "Juuser Name"
    },
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    user: {
      _id: "5f2181994d09782980e41ef4",
      username: "juuser",
      name: "Juuser Name"
    },
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    user: {
      _id: "5f2181994d09782980e41ef4",
      username: "juuser",
      name: "Juuser Name"
    },
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

module.exports = {
  palindrome,
  average,
  dummy,
  totalLikes,
  favoriteBlog,
  blogs
}