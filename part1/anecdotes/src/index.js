import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
    const maxPoints = Math.max(...points);
    const bestAnecdote = props.anecdotes[points.indexOf(maxPoints)];

    const NextAnecdote = () => {
        const random = Math.floor(Math.random() * Math.floor(anecdotes.length));
        setSelected(random);
    }

    const Vote = () => {
        const copy = [...points];
        copy[selected] += 1;
        setPoints(copy);
    }

    return (
        <div>
            <h1>Anecdote of the Day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {points[selected]} votes</p>
            <Button text={'vote'} handleClick={() => Vote()} />
            <Button text={'next anecdote'} handleClick={() => NextAnecdote()} />
            <h1>Anecdote with most votes</h1>
            <p>{bestAnecdote}</p>
            <p>has {maxPoints} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)