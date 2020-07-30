import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const Title = (props) => <h1>{props.text}</h1>

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

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <Title text={'statistics'} />
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
