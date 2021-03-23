import React, { useState } from 'react';

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


const Statistics = ({good, neutral, bad, total}) => {
    if (total === 0) {
        return "No feedback given."
    }

    const StatisticLine = ({text, value}) => {
        return (
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        )
    }

    const Positive = () => {
        if (good === 0 || total === 0) {
            return "0 %"
        }
        const positive = good / total * 100
        return ( <>{positive} %</> )
    }

    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="total" value={total} />
                <StatisticLine text="average" value={(good - bad) / total} />
                <StatisticLine text="positive" value={<Positive />} />
            </tbody>
        </table>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const handleGoodClick = () => {
        setGood(good + 1)
        setTotal(total + 1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setTotal(total + 1)
    }
    const handleBadClick = () => {
        setBad(bad + 1)
        setTotal(total + 1)
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <p>
            <Button handleClick={handleGoodClick} text="good" />
            <Button handleClick={handleNeutralClick} text="neutral" />
            <Button handleClick={handleBadClick} text="bad" />
            </p>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} total={total}/>

        </div>
    )  
}    
export default App