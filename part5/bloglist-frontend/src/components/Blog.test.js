import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('<Blog />', () => {
  let component
  let mockHandler
  let updateBlog


  beforeEach(() => {

    const user = {
      name: 'Juuseri Name',
      username: 'juuseri',
      id: '231232'
    }

    const blog = {
      id: '041434',
      title: 'Component testing is done with react-testing-library',
      author: 'Authori',
      url: 'url',
      user: user,
      likes: 3
    }

    let setUpdate

    mockHandler = jest.fn()
    updateBlog = jest.fn()

    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        setUpdate={setUpdate}
        user={user}
        onClick={mockHandler}
        handleLike={updateBlog}
      />
    )
  })

  test('renders title and author', () => {
    const div = component.container.querySelector('.titleauthor')

    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('Authori')

  })


  test('renders title and author without likedelete', () => {
    const div = component.container.querySelector('.titleauthor')
    const urllike = component.container.querySelector('.likedelete')

    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('Authori')
    expect(urllike).toHaveStyle('display: none;')
  })

  test('click shows more', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.titleauthor')
    const urllike = component.container.querySelector('.likedelete')

    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('Authori')
    expect(urllike).toHaveTextContent('likes')
    expect(urllike).toHaveTextContent('remove')
  })

  test('click like twice increases likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const like = component.getByRole('button', { name: 'like' })
    fireEvent.click(like)
    fireEvent.click(like)
    // const urllike = component.container.querySelector('.likedelete')
    // expect(urllike).toHaveTextContent('likes 5')
    expect(updateBlog.mock.calls).toHaveLength(2)
  })


})