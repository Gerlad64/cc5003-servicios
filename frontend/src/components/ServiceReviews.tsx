import { useState, useEffect } from "react";
import reviewService from "../requests/reviews";
import type { ReviewData } from "../model/ReviewData";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Rating,
  Divider,
  Alert,
  Collapse,
  Stack,
  Chip
} from '@mui/material';
import {
  RateReview as ReviewIcon,
  Cancel as CancelIcon,
  Send as SendIcon
} from '@mui/icons-material';

import { useReviewsStore } from "../reviewStore";

interface ServiceReviewsProps {
  serviceId: string;
}

export function ServiceReviews({ serviceId }: ServiceReviewsProps) {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  const reviewStore = useReviewsStore();

  useEffect(() => {
    loadReviews();
  }, [serviceId]);

  const loadReviews = async () => {
    try {
      const data = await reviewService.getByServiceId(serviceId);
      setReviews(data);
      reviewStore.setReviews(data);
      console.log(useReviewsStore.getState().reviews);
      setLoading(false);
    } catch (error) {
      console.error("Error loading reviews:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
      setSuccess(true);
      loadReviews();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error creating review:", error);
      setError("Error al publicar la review. Por favor, intenta de nuevo.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography>Cargando reviews...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Reviews ({reviewStore.reviews.length})
        </Typography>
        
        <Button
          variant={showForm ? "outlined" : "contained"}
          startIcon={showForm ? <CancelIcon /> : <ReviewIcon />}
          onClick={() => {
            setShowForm(!showForm);
            setError(null);
          }}
          color={showForm ? "secondary" : "primary"}
        >
          {showForm ? "Cancelar" : "Escribir Review"}
        </Button>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          ¡Review publicada exitosamente!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Collapse in={showForm}>
        <Card elevation={2} sx={{ mb: 4, bgcolor: '#fafafa' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
              Escribe tu review
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Calificación</InputLabel>
                <Select
                  value={newReview.rating}
                  label="Calificación"
                  onChange={(e) => setNewReview({
                    ...newReview,
                    rating: Number(e.target.value),
                  })}
                >
                  <MenuItem value={5}>5 - Excelente</MenuItem>
                  <MenuItem value={4}>4 - Muy bueno</MenuItem>
                  <MenuItem value={3}>3 - Bueno</MenuItem>
                  <MenuItem value={2}>2 - Regular</MenuItem>
                  <MenuItem value={1}>1 - Malo</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Comentario"
                multiline
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview({
                  ...newReview,
                  comment: e.target.value,
                })}
                required
                placeholder="Comparte tu experiencia con este servicio..."
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                fullWidth
                sx={{
                  py: 1.5,
                  bgcolor: 'secondary.main',
                  '&:hover': {
                    bgcolor: 'secondary.dark'
                  }
                }}
              >
                Publicar Review
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Collapse>

      <Divider sx={{ my: 3 }} />

      <Box>
        {reviewStore.reviews.length === 0 ? (
          <Card elevation={1} sx={{ p: 4, textAlign: 'center', bgcolor: '#fafafa' }}>
            <Typography variant="h6" color="text.secondary">
              No hay reviews todavía
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sé el primero en compartir tu experiencia
            </Typography>
          </Card>
        ) : (
          <Stack spacing={2}>
            {reviewStore.reviews.map((review) => (
              <Card key={review.id} elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Rating value={review.rating} readOnly size="large" />
                      <Chip 
                        label={`${review.rating}/5`} 
                        size="small" 
                        color="primary"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.7 }}>
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}