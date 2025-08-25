import React, { useState, useEffect } from "react";
import { Quote } from "../types";
import { QuoteCard } from "./QuoteCard";

export const PopularQuotes: React.FC = () => {
  const [popularQuotes, setPopularQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchPopularQuotes();
  }, []);

  const fetchPopularQuotes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/quotes/popular");

      if (!response.ok) {
        throw new Error("Failed to fetch popular quotes");
      }

      const quotes: Quote[] = await response.json();
      setPopularQuotes(quotes);

      // Fetch likes for each popular quote
      const likesPromises = quotes.map((quote) =>
        fetch(`http://localhost:3001/api/quotes/${quote.id}/likes`)
          .then((res) => res.json())
          .then((data) => ({ id: quote.id, likes: data.likes }))
      );

      const likesResults = await Promise.all(likesPromises);
      const likesMap = likesResults.reduce(
        (acc, { id, likes }) => ({
          ...acc,
          [id]: likes,
        }),
        {}
      );

      setLikes(likesMap);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (quoteId: string) => {
    try {
      const userId = `user-${Math.random().toString(36).substr(2, 9)}`;
      const response = await fetch(
        `http://localhost:3001/api/quotes/${quoteId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLikes((prev) => ({
          ...prev,
          [quoteId]: data.likes,
        }));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error("Failed to like quote:", errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="popular-quotes">
        <h3>Popular Quotes</h3>
        <div className="loading">Loading popular quotes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="popular-quotes">
        <h3>Popular Quotes</h3>
        <div className="error">Error loading popular quotes: {error}</div>
      </div>
    );
  }

  return (
    <div className="popular-quotes">
      <h3>Trending Quotes</h3>
      <div className="popular-quotes-grid">
        {popularQuotes.map((quote) => (
          <div key={quote.id} className="popular-quote-card">
            <QuoteCard
              quote={quote}
              onLike={() => handleLike(quote.id)}
              likes={likes[quote.id] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
