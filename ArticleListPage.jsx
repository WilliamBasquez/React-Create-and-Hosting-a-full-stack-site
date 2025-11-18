import { Link } from "react-router-dom";

export default function ArticlesList({ articles }) {
  return (
    <>
      <div>
        <h1>Articles List</h1>
        <p>This is the articles list page of the application.</p>
        <ArticlesList articles={articles} />
      </div>
    </>
  );
}
