import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => <h1>{props.text}</h1>

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const Statistic = (props) => <tr><td>{props.text}</td><td>{props.value || 0}{props.suffix}</td></tr>

const Statistics = (props) => {
    if (!(props.good || props.neutral || props.bad)) {
        return <div>No feedback given</div>
    }
    const all = props.good + props.neutral + props.bad
    const average = (props.good - props.bad) / all
    const positive = props.good * 100 / all
    return (
        <table>
            <tbody>
                <Statistic text={'good'} value={props.good} />
                <Statistic text={'neutral'} value={props.neutral} />
                <Statistic text={'bad'} value={props.bad} />
                <Statistic text={'all'} value={all} />
                <Statistic text={'average'} value={average} />
                <Statistic text={'positive'} value={positive} suffix={' %'} />
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Title text={'give feedback'} />
            <Button text={'good'} handleClick={() => setGood(good + 1)} />
            <Button text={'neutral'} handleClick={() => setNeutral(neutral + 1)} />
            <Button text={'bad'} handleClick={() => setBad(bad + 1)} />
            <Title text={'statistics'} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)