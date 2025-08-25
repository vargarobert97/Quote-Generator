import React from "react";
import { Quote } from "../types";

interface QuoteCardProps {
  quote: Quote;
  onLike: () => void;
  likes: number;
  isLoading?: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  onLike,
  likes,
  isLoading = false,
}) => {
  const handleLike = () => {
    if (!isLoading) {
      onLike();
    }
  };

  return (
    <div className="quote-card">
      <div className="quote-content">
        <p className="quote-text">"{quote.content}"</p>
        <p className="quote-author">- {quote.author}</p>

        {quote.tags && quote.tags.length > 0 && (
          <div className="quote-tags">
            {quote.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="quote-actions">
        <button
          className={`like-btn ${isLoading ? "loading" : ""}`}
          onClick={handleLike}
          disabled={isLoading}
          aria-label="Like this quote"
        >
          <span className="like-icon">👍</span>
          <span className="like-count">{likes}</span>
          {isLoading && <span className="spinner"></span>}
        </button>

        <div className="popularity">
          <span className="popularity-label">Popularity:</span>
          <span className="popularity-score">{quote.popularity || 0}</span>
        </div>
      </div>
    </div>
  );
};
