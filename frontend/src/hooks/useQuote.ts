// useQuote.ts
import { useState, useCallback } from "react";
import axios from "axios";

export const useQuote = () => {
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomQuote = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://localhost:3001/api/quotes/random"
      );
      setQuote(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { quote, loading, error, fetchRandomQuote };
};

export const useLike = () => {
  const [likes, setLikes] = useState<Record<string, number>>({});

  const likeQuote = useCallback(async (quoteId: string, userId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/quotes/${quoteId}/like`,
        { userId }
      );

      setLikes((prev) => ({
        ...prev,
        [quoteId]: response.data.likes,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Failed to like quote:", errorMessage);
    }
  }, []);

  return { likeQuote, likes };
};
