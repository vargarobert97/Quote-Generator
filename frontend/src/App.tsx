import React, { useState, useEffect, useCallback } from "react";
import { QuoteCard } from "./components/QuoteCard";
import { PopularQuotes } from "./components/PopularQuotes";
import { useQuote } from "./hooks/useQuote";
import { useLike } from "./hooks/useLike";
import "./App.css";

function App() {
  const [userId] = useState(`user-${Math.random().toString(36).substr(2, 9)}`);
  const { quote, loading, error, fetchRandomQuote } = useQuote();
  const { likeQuote, likes, isLoading: likeLoading } = useLike();

  const handleFetchRandomQuote = useCallback(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  useEffect(() => {
    handleFetchRandomQuote();
  }, [handleFetchRandomQuote]);

  const handleLike = async () => {
    if (quote) {
      await likeQuote(quote.id, userId);
    }
  };

  if (loading)
    return <div className="loading">Loading inspirational quote...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Inspirational Quotes</h1>
        <button onClick={handleFetchRandomQuote} className="new-quote-btn">
          New Quote
        </button>
      </header>

      <main className="app-main">
        {quote && (
          <>
            <QuoteCard
              quote={quote}
              onLike={handleLike}
              likes={likes[quote.id] || 0}
              isLoading={likeLoading}
            />
            <PopularQuotes />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
