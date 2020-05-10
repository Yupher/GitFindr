import React, { useReducer } from "react";
import axios from "axios";
import githubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
  SEARCH_USER,
  SET_LOADING,
  CLEAR_USER,
  GET_USER,
  GET_REPOS,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);
  //search users
  const searchUser = async (text) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_APP_CLIENT_ID}&client_secret=${process.env.GITHUB_APP_CLIENT_SECRET}`
    );
    dispatch({
      type: SEARCH_USER,
      payload: res.data.items
    })
  };
  //get user
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.GITHUB_APP_CLIENT_ID}&client_secret=${process.env.GITHUB_APP_CLIENT_SECRET}`
    );
    dispatch({type: GET_USER, payload: res.data})
  };

  // get user repo 
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_APP_CLIENT_ID}&client_secret=${process.env.GITHUB_APP_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  };

  //clear user 
  const clearUser = () => dispatch({type: CLEAR_USER})


  //set loading
  const setLoading = ()=> dispatch ({type: SET_LOADING})

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUser,
        getUser,
        getUserRepos,
        clearUser
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default  GithubState