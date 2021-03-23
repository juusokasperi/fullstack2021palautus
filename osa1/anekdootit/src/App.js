import React, { useState } from 'react'

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
      {text}
</button>
)

const App = () => {
  const showNewAnecdote = () => {
    setSelected(randomInteger(0,anecdotes.length-1))
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}<br />
        has {points[selected]} points</p>
      <p>
        <Button handleClick={voteAnecdote} text="vote" />
        <Button handleClick={showNewAnecdote} text="next anecdote" />
      </p>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[points.indexOf(Math.max(...points))]}<br />
        has {Math.max(...points)} points
      </p>
    </div>
  )
}

export default App