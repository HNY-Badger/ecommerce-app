import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { FaSearch } from 'react-icons/fa';
import * as styles from './Search.module.css';
import Input from '../../Input/Input';

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function Search({ value, onChange, onSubmit }: Props) {
  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={submitHandler} className={styles.search}>
      <Input
        id="search"
        type="search"
        placeholder="Search"
        value={value}
        onChange={onChange}
        className={styles.searchbar}
      />
      <button aria-label="Search" type="submit" className={styles.search_btn}>
        <FaSearch />
      </button>
    </form>
  );
}

export default Search;
