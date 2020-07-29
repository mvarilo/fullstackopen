import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ author: newAuthor, title: newTitle, url: newUrl })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
                Title:
        <input
          type="text"
          value={newTitle}
          id='newTitle'
          name="newTitle"
          onChange={({target}) => setNewTitle(target.value)}
        />
      </div>
      <div>
                Author:
        <input
          type="text"
          value={newAuthor}
          id='newAuthor'
          name="newAuthor"
          onChange={({target}) => setNewAuthor(target.value)}
        />
      </div>
      <div>
                Url:
        <input
          type="text"
          value={newUrl}
          id='newUrl'
          name="newUrl"
          onChange={({target}) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlogForm