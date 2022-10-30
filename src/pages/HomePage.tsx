import React, { FormEvent, useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";
import logo from "../assets/images/enter.jpg";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(true);

  const debounced = useDebounce(search); // ререндерн в input только при delay

  const {
    isLoading,
    isError,
    data: gitUsers,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3, // если search меньше 3 не отправлять запрос
  });
  const [
    getUserRepos,
    { isLoading: isReposLoading, isError: isReposError, data: gitUserRepos },
  ] = useLazyGetUserReposQuery(); // массив, первый аргумент это функция которая при необходимости отправить запрос

  useEffect(() => {}, [debounced]);

  const handleClick = (username: string) => {
    // window.open(url, "_blank");  при остром желании редирект
    getUserRepos(username);
    setVisible(!visible);
  };

  const handleVisible = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <div className="flex flex-col pt-10 mx-auto h-screen w-screen">
      <div className="relative w-[560px] self-center">
        <form onSubmit={(e) => handleVisible(e)} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search github username..."
            className="border py-2 px-4 w-full h-[42px] mb-2 placeholder:italic focus:outline-none focus:border-stone-800 rounded-sm"
          />
          <img
            className="inline-block h-[46px] w-13 ring-2 ring-white self-top"
            src={logo}
          />
        </form>

        <ul
          className={` absolute left-0 top-[42px] max-h-[320px] shadow-md bg-white text-center w-full overflow-y-scroll ${
            visible ? "hidden" : ""
          }`}
        >
          {isLoading && <p className="text-center animate-bounce">...</p>}
          {gitUsers?.map((user) => (
            <li
              onClick={() => handleClick(user.login)}
              key={user.id}
              className="hover:bg-stone-800 hover:text-white py-2 px-4 flex justify-left"
            >
              <img
                className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                src={user.avatar_url}
                alt="avatar"
              />
              <p className="self-center m-auto">{user.login}</p>
            </li>
          ))}
        </ul>
        {isError && (
          <p className="text-center text-red-500 animate-pulse">
            Sorry, something went wrong
          </p>
        )}
        {gitUsers?.length === 0 && (
          <p className="text-center text-red-500 animate-pulse">
            No such github user...
          </p>
        )}
      </div>
      <div className="flex w-full p-10 flex-row flex-wrap gap-5 justify-center">
        {isReposLoading && <p className="text-center animate-bounce">...</p>}
        {gitUserRepos?.map((repo) => {
          return <RepoCard key={repo.id} repo={repo}/>;
        })}
      </div>
    </div>
  );
};

export default HomePage;
