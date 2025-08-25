import { useState, useCallback } from "react";
import axios from "axios";

export const useLike = () => {
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const likeQuote = useCallback(async (quoteId: string, userId: string) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { likeQuote, likes, isLoading };
};
