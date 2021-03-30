import React from 'react'

const Course = ({course}) => {
    const exercises = []
    for (var i = 0; i < course.parts.length; i++) {
      exercises.push(course.parts[i].exercises)
    }
    const total = (accumulator, currentValue) => accumulator + currentValue;
  
    return (
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <b>total of {exercises.reduce(total)} exercises</b>
    </div>
    )
  }

const Content = ({parts}) => {
    return (
      <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
      </>
    )
  }

const Header = ({name}) => {
    return (
      <h1>
        {name}
      </h1>
    )
  }

const Part = ({part}) => {
    return (
      <>
        {part.name} {part.exercises} <br />
      </>
    )
  }

export default Course