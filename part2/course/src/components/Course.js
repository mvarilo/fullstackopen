import React from 'react'

const Header = (props) => {
    return (
        <header>
            <h2>{props.title}</h2>
        </header>
    );
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
}

const Total = (props) => {

    return (
        <p>
            <b>total of {props.value} exercises</b>
        </p>
    );
}

const Content = (props) => {
    const parts = () => props.parts.map(part => <Part key={part.id} part={part} />)

    const total = props.parts.reduce(
        (prevValue, currentValue) => prevValue + currentValue.exercises, 0
    );

    return (
        <div>
            {parts()}
            <Total value={total} />
        </div>
    )
}

const Course = (props) => {
    const courses = () => props.courses.map(course => {
        return (
            <div key={course.id}>
                <Header title={course.name} />
                <Content parts={course.parts} />
            </div>
        )
    })

    return <div>{courses()}</div>
}


export default Course;