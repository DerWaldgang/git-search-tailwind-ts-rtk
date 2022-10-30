import React, { MouseEvent } from "react";
import RepoCard from "../components/RepoCard";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IRepo } from "../models/IRepos";
import { Tooltip } from "@material-tailwind/react";

const FavoritePages = () => {
  const favoriteRepos = useTypedSelector((state) => state.github.favorite);
  const { removeFromFavoriteAction } = useActions();
  if (favoriteRepos.length === 0) return <h1>No repositories was added!</h1>;

  const handleRemoveFavorite = (
    e: MouseEvent<HTMLButtonElement>,
    repo: IRepo
  ) => {
    e.preventDefault();
    removeFromFavoriteAction(repo);
  };


  return (
    <div
      className="h-screen w-screen hover:after:content-[attr(title)]"
      data-title="Go to the Repo?"
    >
      <h1 className="w-full py-10 text-center text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-amber-400">My Favorites Repositories</h1>
      <div className="w-[89%] m-auto flex flex-row justify-center flex-wrap gap-10">
        {favoriteRepos.map((repo) => {
          return (
            <Tooltip
              content="Go to the Repo?"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              key={repo.id}
              className=" bg-slate-800 text-white"
            >
              <div
                
                className="border relative py-4 px-3 rounded bg-gradient-to-br from-amber-400 to-stone-800  w-[30.290%] h-40 cursor-pointer"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="flex flex-col justify-between flex-start h-full"
                >
                  <h2 className="text-lg font-bold">{repo.full_name}</h2>
                  <p className="text-sm font-thin">
                    Description: {repo?.description}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm">Forks: {repo.forks}</p>
                    <button
                      onClick={(e) => handleRemoveFavorite(e, repo)}
                      className="px-2 py-1 bg-stone-800 text-white hover:bg-red-800 transition-colors font-thin rounded-lg"
                    >
                      Get Out
                    </button>
                  </div>
                </a>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritePages;
