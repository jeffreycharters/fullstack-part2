import React from 'react'

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => {
        return s = s + p.exercises
    }, 0)
    return (
        <h3>Number of exercises {total}</h3>
    )
}

const Part = ({ contents }) => {
    return (
        <p>
            {contents.name} {contents.exercises}
        </p>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part =>
                <Part key={part.id} contents={part} />
            )}
        </div>
    )
}

export default Course