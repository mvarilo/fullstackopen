import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blog'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const infoMessage = (text, type) => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        "title": newBlogTitle,
        "author": newBlogAuthor,
        "url": newBlogUrl
      }

      const savedBlog = await blogService.create(newBlog)

      setBlogs([...blogs], savedBlog)
      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')
      infoMessage(`New blog added`, 'note');
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      infoMessage(`Login error`, 'error');
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const newBlogForm = () => (
    <form onSubmit={handleCreate}>
      <div>
        Title:
        <input
          type="text"
          value={newBlogTitle}
          name="newBlogTitle"
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={newBlogAuthor}
          name="newBlogAuthor"
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          value={newBlogUrl}
          name="newBlogUrl"
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    window.location.reload();
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={message} type={messageType} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
          <button onClick={logOut}>logout</button>
          </p>
          {newBlogForm()}
        </div>
      }

      <div>
        <h2>Bloglist</h2>
        <Notification message={message} type={messageType} />
        {/* <p>{user.name} logged in <button onClick={logOut}>Logout</button></p>
        {newBlogForm()} */}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>

      <Footer />
    </div >
  )
}

export default App 