import { useState } from "react";
import { submitFeedback } from "../api";

const FEEDBACK_MAX_LENGTH = 500;

export function CitizenPage({ user }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (message.length > FEEDBACK_MAX_LENGTH) {
      setError(`Feedback must be ${FEEDBACK_MAX_LENGTH} characters or fewer.`);
      return;
    }
    try {
      await submitFeedback({ nric: user.nric, name: user.name, message });
      setSubmitted(true);
      setMessage("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <main className="page-shell">
      <div className="page-heading">
        <div className="eyebrow">Public feedback</div>
        <h1>What would you like us to know?</h1>
        <p>Tell us about an issue, an idea, or a positive experience in your community.</p>
      </div>
      <section className="form-card">
        {submitted && <div className="success-banner">Thank you. Your feedback has been received.</div>}
        <form onSubmit={handleSubmit}>
          <label>Your feedback
            <textarea
              maxLength={FEEDBACK_MAX_LENGTH}
              rows="7"
              value={message}
              onChange={(event) => setMessage(event.target.value.slice(0, FEEDBACK_MAX_LENGTH))}
              placeholder="Share your feedback here..."
            />
          </label>
          <div className="character-count" aria-live="polite">
            {message.length} / {FEEDBACK_MAX_LENGTH} characters
          </div>
          <div className="form-footer">
            <span className="muted">Please do not include sensitive personal information.</span>
            <button className="primary-button">Submit feedback</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </main>
  );
}
