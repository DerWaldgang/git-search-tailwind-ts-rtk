import React, { MouseEvent } from "react";
import { text } from "stream/consumers";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IRepo } from "../models/IRepos";

interface RepoCardProps {
  repo: IRepo;
}

const RepoCard = ({ repo }: RepoCardProps) => {
  const format = repo.updated_at?.toString();

  const { addToFavoriteAction } = useActions();

  const myFavorRepos = useTypedSelector((state) => state.github.favorite);

  const isFavorite = myFavorRepos.find((item) => {
    if (item.id === repo.id) return true;
    return false;
  });

  const handleFavorite = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    
    if(!isFavorite){
        addToFavoriteAction(repo);
    }
    
  };

  return (
    <div className="border py-4 px-3 rounded hover:shadow-md hover:bg-gray-100 transition-all w-[30%] h-40 cursor-pointer">
      <a
        href={repo.html_url}
        target="_blank"
        className="flex flex-col justify-between flex-start h-full"
      >
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm font-thin">Description: {repo?.description}</p>
        <p className="text-sm">Forks: {repo.forks}</p>
        <div className="flex justify-between">
          <p className="text-sm self-end">
            {format?.substring(11, 19)} {format?.substring(0, 10)}
          </p>
          <p
            className={`text-2xl self-end ${isFavorite && "text-yellow-400"} hover:text-yellow-400 px-4 pt-3 `}
            onClick={(e) => handleFavorite(e)}
          >
            ★
          </p>
        </div>
      </a>
    </div>
  );
};

export default RepoCard;
