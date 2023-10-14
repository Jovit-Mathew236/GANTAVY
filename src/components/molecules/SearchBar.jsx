import React from 'react';
import styles from './molecules.module.css';
import SearchIcon from '../atom/svgs/SearchIcon';

const SearchBar = ({ searchQuery, searchField, onSearchFieldChange, onSearchQueryChange }) => {
  const months = [
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

  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <div>
      <div className={styles.searchBarContainer}>
        <p className={styles.searchIcon}>
          <SearchIcon />
        </p>
        {searchField !== 'year' && searchField !== 'month' && <input
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
          {
            years.map((year, i) => {
              return <option key={i} value={year}>{year}</option>
            })
          }
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
