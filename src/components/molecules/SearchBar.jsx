import React from 'react';
import styles from './molecules.module.css';
import SearchIcon from '../atom/svgs/SearchIcon';

const SearchBar = ({ searchQuery, searchField, onSearchFieldChange, onSearchQueryChange }) => {
  return (
    <div>
      <div className={styles.searchBarContainer}>
        <p className={styles.searchIcon}>
          <SearchIcon />
        </p>
        <input
          type="text"
          id="searchBar"
          name="searchBar"
          className={styles.searchBar}
          placeholder="Search..."
          autoComplete="off"
          value={searchQuery}
          onChange={onSearchQueryChange}
        />
        <p>By</p>
        <select
          className={styles.searchBar}
          value={searchField}
          onChange={onSearchFieldChange}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
