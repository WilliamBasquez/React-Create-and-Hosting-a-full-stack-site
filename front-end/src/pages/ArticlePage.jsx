import { useParams } from "react-router-dom";
import articles from "../article-content.js";

export default function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((ar) => ar.name === name);

  return (
    <>
      <div>
        <h1>Article Page, article {name}</h1>
        <p>This is the article page of the application.</p>
        {article.content.map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>
    </>
  );
}
