import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(24);

  function toggleLike() {
    setLiked((current) => {
      setLikes((count) => count + (current ? -1 : 1));
      return !current;
    });
  }

  return (
    <div className="center-card">
      <h2>Events and useState</h2>
      <button className={`like-button ${liked ? "liked" : ""}`} onClick={toggleLike} aria-pressed={liked}>
        {liked ? "♥" : "♡"} {likes}
      </button>
      <p>{liked ? "You liked this lesson." : "Click to add your like."}</p>
    </div>
  );
}
