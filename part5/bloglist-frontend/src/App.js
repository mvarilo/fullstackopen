import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blog'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [update, setUpdate] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [update])

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

  const blogFormRef = useRef()

  // const handleCreate = async (event) => {
  //   event.preventDefault()
  //   try {
  //     blogFormRef.current.toggleVisibility()

  //     const sendUser = {
  //       _id: user._id,
  //       username: user.username,
  //       name: user.name
  //     }

  //     const newBlog = {
  //       "title": newBlogTitle,
  //       "author": newBlogAuthor,
  //       "url": newBlogUrl,
  //       "user": sendUser
  //     }

  //     const savedBlog = await blogService.create(newBlog)

  //     setBlogs(blogs.concat(savedBlog))
  //     setNewBlogAuthor('')
  //     setNewBlogTitle('')
  //     setNewBlogUrl('')
  //     infoMessage(`A new blog ${savedBlog.title} by ${savedBlog.author} added`, 'note');
  //   } catch (exception) {
  //     console.log(exception)
  //   }
  // }

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(blogObject)

      infoMessage(`A new blog ${savedBlog.title} by ${savedBlog.author} added`, 'note');
      setBlogs(blogs.concat(savedBlog))

    } catch (exception) {
      infoMessage(`Couldn't save blog`, 'error');
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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    window.location.reload();
  }

  const sortLikes = (asc = true) => () => (
    asc ?
      setBlogs(blogs.sort((a, b) => a.likes - b.likes)) :
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  )

  const updateBlog = async (id, blogObject) => {
    try {
      const updateBlog = await blogService.update(id, blogObject)
      infoMessage(`${user.name} liked ${updateBlog.title}`, 'note');
      setBlogs(blogs.map(blog => blog.id === updateBlog.id ? updateBlog : blog))
    } catch (error) {
      infoMessage('Could not update', 'error');
    }
  }

  const blogForm = () => (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog}
            setBlogs={setBlogs} setUpdate={setUpdate}
            user={user} handleLike={updateBlog} />
        ))}
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h1>Bloglist</h1>
        <Notification message={message} type={messageType} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={message} type={messageType} />
      <div>
        <p>{user.name} logged in
          <button onClick={logOut}>logout</button>
        </p>

        <Togglable buttonLabel="Add note" ref={blogFormRef}>
          <NewBlogForm
            createBlog={addBlog}
          />
        </Togglable>
      </div>

      <div>
        <h2>Bloglist</h2>
        <div>
          <p>
            Sort by:
          <button onClick={sortLikes()}>Likes (asc)</button>
            <button onClick={sortLikes(false)}>Likes (desc)</button>
          </p>
        </div>
        <Notification message={message} type={messageType} />
        {blogForm()}
      </div>

      <Footer />
    </div >
  )
}

export default App 