import React, { FormEventHandler, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import * as styles from './Search.module.css';
import Input from '../../Input/Input';

function Search() {
  const [, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>('');
  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSearchParams({ search });
  };

  return (
    <form onSubmit={submitHandler} className={styles.search}>
      <Input
        id="search"
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchbar}
      />
      <button aria-label="Search" type="submit" className={styles.search_btn}>
        <FaSearch />
      </button>
    </form>
  );
}

export default Search;
