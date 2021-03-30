import React from 'react'

const Filter = ({personFilter, handleFilterChange}) => {
    return (
      <form>
        <div>filter shown with <input value={personFilter} onChange={handleFilterChange} /></div>
      </form>
    )
  }

export default Filter