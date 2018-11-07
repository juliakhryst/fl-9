import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const isAll = props.currentFilter === 'all' ? 'active' : '';
  const isFavorite = props.currentFilter === 'favorite' ? 'active' : '';

  return (
    <div className="filter-container">
      <button type="button" className={`filter-tab ${isAll}`} onClick={() => props.handleFilter('all')}>
        All
      </button>
      <button type="button" className={`filter-tab ${isFavorite}`} onClick={() => props.handleFilter('favorite')}>
        Favorite
      </button>
      <hr />
    </div>
  );
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export { Filter };
