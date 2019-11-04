import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
        <label>
          <input type="radio" value="Default" name="sort" checked={null}
            onChange={props.handleSortButton}/>
          Default
        </label>
      <label>
        <input type="radio" value="Alphabetically" name="sort" checked={null}
          onChange={props.handleSortButton}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" name="sort" checked={null}
          onChange={props.handleSortButton}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.handleFilterButton} name="filter">
          <option value="All" >All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
