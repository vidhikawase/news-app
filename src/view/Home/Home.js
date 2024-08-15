import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import toast , {Toaster }from "react-hot-toast";
import NewsCard from "./../../component/NewsCard/NewsCard.js";

const Home = () => {
  const [news, setNews] = useState([])
  const [search, setSearch] = useState("political news")

   toast.loading("News Loading......")

  const loadNews = async () => {
    
   try{
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=tesla&from=2024-07-15&sortBy=publishedAt&apiKey=ad8f71b2dfcd48f1acc78be4ebebdf94`
    );

    setNews(response.data.articles);
   }
   catch{
    toast.error("Error Loading News")
   }
  }

   toast.dismiss();
   toast.success("News Loaded Succesfully.")

  useEffect(() => {
    loadNews()
  }, []);

  useEffect(() => {
    loadNews();
  }, [search]);

  return (
    <div>
      <div className="inputbox">
        <p>News App</p>

        <input
          type="text"
          placeholder="search...."
          value={search}
          className="input"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {news.map((newNews, i) => {
        const { author, title, description, url, urlToImage, publishedAt } =
          newNews;

        return (
          <NewsCard
            key={i}
            author={author}
            title={title}
            description={description}
            url={url}
            urlToImage={urlToImage}
            publishedAt={publishedAt}
          />
        );
      })}
      <Toaster/>
    </div>
  );
};

export default Home;
