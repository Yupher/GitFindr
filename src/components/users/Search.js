import React, { useState, useContext } from "react";
import githubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/AlertContext'

const Search = () => {
  const gitContext = useContext(githubContext)
  const alertContext = useContext(AlertContext)
  const{setAlert} =  alertContext

  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      setAlert("search is empty", "light");
    } else {
      gitContext.searchUser(search);
      setSearch('');
    }
  };
  const onChange = (e) => setSearch(e.target.value);

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search Users"
          value={search}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        ></input>
      </form>
      {gitContext.users.length > 0 ? (
        <button className="btn btn-light btn-block" onClick={gitContext.clearUser}>
          Clear
        </button>
      ) : null}
    </div>
  );
};

export default Search;
