import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm/>', () => {

  const createBlog = jest.fn()
  let component

  beforeEach(() => {

    component = render(<NewBlogForm createBlog={createBlog} />)
  })

  test('content renders', () => {
    expect(component.container).toHaveTextContent('Title')
  })

  test('inputs update', () => {
    const author = component.container.querySelector('#newAuthor')
    const form = component.container.querySelector('form')

    const testAuthor = 'Juuser'
    fireEvent.change(author, {
      target: { value: testAuthor }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)

    console.log(createBlog)
    console.log(createBlog.mock.calls[0][0])

    expect(createBlog.mock.calls[0][0].author).toBe(testAuthor)
  })
})