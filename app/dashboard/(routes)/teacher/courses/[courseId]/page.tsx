import React from 'react'

const Course = ({params}: {params: {courseId: string}}) => {
  return (
    <div>Course: {params.courseId}</div>
  )
}

export default Course