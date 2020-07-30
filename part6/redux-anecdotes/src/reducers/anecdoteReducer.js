import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      const anecdotes = state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote)
      const sortedAnecdotes = anecdotes.sort((a, b) => (
        a.votes > b.votes ? -1 : 0
      ))
      return sortedAnecdotes
    case 'ADD_NEW':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch({
      type: 'VOTE',
      data: anecdote,
    })
  }
}

export const addNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'ADD_NEW',
      data: newAnecdote,
    })
  }
}


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer