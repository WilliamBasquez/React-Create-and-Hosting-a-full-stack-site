import { useParams, useLoaderData } from "react-router-dom";
import articles from "../article-content.js";
import axios from "Axios"
import CommentsList from "../CommentsList.jsx";
import { useState } from "react";
import AddCommentForm from "../AddCommentForm.jsx";
import useUser from "../useUser.js"

export default function ArticlePage() {
  const {isLoading, user} = useUser();

  const { name } = useParams();

  const article = articles.find(a => a.name === name);

  const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  async function onUpvoteClicked(){
    const token = user && await user.getIdToken();
    const headers = token ? {Authorization: token} : {};
    try{
      const response = await axios.post('/api/articles/' + name + '/upvote', null, {headers});
      const updatedArticleData = response.data;
      setUpvotes(updatedArticleData.upvotes);
    } catch (e){
      console.error("Error upvoting the article", e);
    }
  }

  async function onAddComment({nameText, commentText}){
    const token = user && await user.getIdToken();
    const headers = token ? {Authorization: token} : {};
    try{
      const response = axios.post('/api/articles/' + name + '/comments', {
        postedBy: nameText,
        text: commentText,
      }, {headers});
      
      const updatedArticleData = (await response).data;
      setComments(updatedArticleData.comments);
    } catch (e){
      console.error("Error adding comment to the article", e);
    }
  }

  return (
    <>
      <div>
        <h1>Article Page, article {name}</h1>
        <p>This is the article page of the application.</p>
        <p>This article has {upvotes} upvotes!</p>
        {user && <button onClick={onUpvoteClicked}>Upvote!</button>}
        {article.content.map((p, index) => (
          <p key={index}>{p}</p>
        ))}

        {user ? <AddCommentForm onAddComment={onAddComment} /> : <p><em>You must be logged in to add comments.</em></p>}
        <CommentsList comments={comments} />
      </div>
    </>
  );
}

export async function articleLoader({params}){
  const response = await axios.get('/api/articles/' + params.name);
  const {upvotes, comments} = response.data;
  return {upvotes, comments}
}