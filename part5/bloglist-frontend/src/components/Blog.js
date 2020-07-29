import React, { useState } from 'react'
import blogService from '../services/blog'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, setUpdate, user, handleLike }) => {
  const [visible, setVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const updateBlog = (event) => {
    event.preventDefault()
    const updateBlog = blog
    updateBlog.likes = blog.likes + 1
    handleLike(blog.id, updateBlog)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const hideWhenNotOwned = { display: removeVisible ? 'none' : '' }

  const show = () => {
    setVisible(true)
    if (blog.user === 'undefined' || user.username !== 'undefined') {
    } else if (blog.user.username !== user.username) {
      setRemoveVisible(true)
    }
  }

  const hide = () => {
    setVisible(false)
    if (blog.user === 'undefined' || user.username !== 'undefined') {
    } else if (blog.user.username !== user.username) {
      setRemoveVisible(false)
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      await blogService.remove(blog.id, user.token)
      blogService.getAll().then(blogs => setBlogs(blogs))
      setUpdate(Math.floor(Math.random() * 100))
    }
  }

  const like = async event => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newBlog = { ...blog, likes }
    await blogService.update(blog.id, newBlog)
    blog.likes += 1
    setUpdate(Math.floor(Math.random() * 100))
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div className="titleauthor">
          {blog.title} {blog.author}
          <button onClick={show}>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className="likedelete">
        {blog.title} {blog.author}
        <button onClick={hide}>hide</button> <br />
        {blog.url} <br />
        <div onClick={updateBlog}>
          likes {blog.likes}
          <button type="submit">like</button>
        </div>
        <div onClick={deleteBlog} style={hideWhenNotOwned}>
          added by {blog.user.name}
          <button type="submit">remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  // setBlogs: PropTypes.func.isRequired,
  // setUpdate: PropTypes.func.isRequired,
};

export default Blog