import { useState, useEffect } from "react";
import reviewService from "../requests/reviews";
import type { ReviewData } from "../model/ReviewData";

interface ServiceReviewsProps {
  serviceId: string;
}

export function ServiceReviews({ serviceId }: ServiceReviewsProps) {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    loadReviews();
  }, [serviceId]);

  const loadReviews = async () => {
    try {
      const data = await reviewService.getByServiceId(serviceId);
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading reviews:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Aquí deberías obtener el user_id del usuario autenticado
      const userId = "USER_ID"; // Reemplazar con el ID del usuario actual

      await reviewService.create({
        service_id: serviceId,
        user_id: userId,
        rating: newReview.rating,
        comment: newReview.comment,
      });

      setNewReview({ rating: 5, comment: "" });
      setShowForm(false);
      loadReviews();
      alert("Review publicada exitosamente");
    } catch (error) {
      console.error("Error creating review:", error);
      alert("Error al publicar la review");
    }
  };

  if (loading) return <div>Cargando reviews...</div>;

  return (
    <div>
      <h2>Reviews ({reviews.length})</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancelar" : "Escribir Review"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Calificación:</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({
                ...newReview,
                rating: Number(e.target.value),
              })}
            >
              <option value={5}>5 - Excelente</option>
              <option value={4}>4 - Muy bueno</option>
              <option value={3}>3 - Bueno</option>
              <option value={2}>2 - Regular</option>
              <option value={1}>1 - Malo</option>
            </select>
          </div>

          <div>
            <label>Comentario:</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({
                ...newReview,
                comment: e.target.value,
              })}
              rows={4}
              required
            />
          </div>

          <button type="submit">Publicar Review</button>
        </form>
      )}

      <div>
        {reviews.length === 0 ? (
          <p>No hay reviews todavía</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
              <div>
                <strong>Calificación:</strong> {"⭐".repeat(review.rating)}
              </div>
              <p>{review.comment}</p>
              <small>
                {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}