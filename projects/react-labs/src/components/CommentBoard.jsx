import { useEffect, useState } from "react";

const emptyForm = { username: "", remarks: "", rating: "5" };

export default function CommentBoard() {
  const [comments, setComments] = useState(() => {
    try { return JSON.parse(localStorage.getItem("react-lab-comments")) || []; }
    catch { return []; }
  });
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("react-lab-comments", JSON.stringify(comments));
  }, [comments]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function addComment(event) {
    event.preventDefault();
    if (form.username.trim().length < 2 || form.remarks.trim().length < 5) {
      setError("Enter a username and at least five characters of feedback.");
      return;
    }
    setComments((items) => [{ ...form, id: crypto.randomUUID() }, ...items]);
    setForm(emptyForm);
    setError("");
  }

  return (
    <div className="comments-layout">
      <form className="comment-form" onSubmit={addComment} noValidate>
        <h2>Controlled comment form</h2>
        <label>Username<input name="username" value={form.username} onChange={updateField} /></label>
        <label>Remarks<textarea name="remarks" value={form.remarks} onChange={updateField} /></label>
        <label>Rating<select name="rating" value={form.rating} onChange={updateField}>{[5,4,3,2,1].map((value) => <option key={value}>{value}</option>)}</select></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button>Post comment</button>
      </form>
      <div>
        <h2>Comments</h2>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((comment) => <article className="comment" key={comment.id}><strong>@{comment.username}</strong><span>{"★".repeat(Number(comment.rating))}</span><p>{comment.remarks}</p></article>)}
      </div>
    </div>
  );
}
