import React from 'react';
import styles from './molecules.module.css';
import SearchIcon from '../atom/svgs/SearchIcon';

const SearchBar = ({ searchQuery, searchField, onSearchFieldChange, onSearchQueryChange }) => {
  const months =[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"]
  
  console.log(searchField);
  return (
    <div>
      <div className={styles.searchBarContainer}>
        <p className={styles.searchIcon}>
          <SearchIcon />
        </p>
       {searchField !== 'year' && searchField !== 'month' &&  <input
          type="text"
          id="searchBar"
          name="searchBar"
          className={styles.searchBar}
          placeholder="Search..."
          autoComplete="off"
          value={searchQuery}
          onChange={onSearchQueryChange}
        />}
        {searchField === 'year' && <select
        onChange={onSearchQueryChange}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2024">2024</option>
        </select>}
        {searchField === 'month' && <select 
        onChange={onSearchQueryChange}
        >
          {
            months.map((month, i) => {
              return <option key={i} value={month}>{month}</option>
            })
          }
        </select>}

        <p>By</p>
        <select
          className={styles.searchBar}
          value={searchField}
          onChange={onSearchFieldChange}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="year">Year</option>
          <option value="month">Month</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
