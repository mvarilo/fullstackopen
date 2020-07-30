import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification
} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) => state.anecdotes)
    .sort((a, b) => b.votes - a.votes)
    .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>))}
    </div>
  )
}

export default AnecdoteList