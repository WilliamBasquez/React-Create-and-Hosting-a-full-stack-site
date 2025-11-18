import { Link } from "react-router-dom";
import articles from "../article-content";

export default function ArticlesList() {
  return (
    <>
      <div>
        <h1>Articles List</h1>
        <p>This is the articles list page of the application.</p>
        {articles.map((a) => (
          <Link key={a.name} to={"/articles/" + a.name}>
            <h3>{a.title}</h3>
            <p>{a.content[0].substring(0, 150)}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
