import React from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useState } from 'react';
import { searchWeather } from '../api/api';
import style from './Search.module.scss';

function Search({ onSearchChange }, props) {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search cities"
      className={style.input}
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={searchWeather}
    />
  );
}

export default Search;
