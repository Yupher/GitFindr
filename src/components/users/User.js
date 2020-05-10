import React, { Fragment, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import Repos from "../repos/Repos";
import githubContext from '../../context/github/githubContext'

const User =({ match })=> {
  const gitContext = useContext(githubContext)
  const {user, loading, repos, getUser,getUserRepos} = gitContext
  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    company,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  
  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Go Back{" "}
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success " />
      ) : (
        <i className="fas fa-times-circle text-danger " />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt=""
            className="round-img"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location} </p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark my-1"
          >
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: {login} </strong>
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>
                    Website:{" "}
                    <a
                      href={
                        blog.includes("https://") ? blog : `https://${blog}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      {blog}
                    </a>
                  </strong>
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: {company} </strong>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Follwers: {followers} </div>
        <div className="badge badge-success">Following: {following} </div>
        <div className="badge badge-light">Public Repos: {public_repos} </div>
        <div className="badge badge-dark">Public Gists: {public_gists} </div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
