import React from 'react'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification
} from '../reducers/notificationReducer'
import { connect, useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(
      addNewAnecdote({
        content,
        votes: 0,
      })
    )
    dispatch(setNotification(`new anecdote ${content}`, 5))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm