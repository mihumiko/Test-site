import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { HOST } from "../../data";
import { fetchProductById } from "../../api/ProductPageApi";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!product) {
    return <h2>Товар не найден</h2>;
  }

  return (
    <Box
      sx={{
        maxWidth: "60vw",
        width: "100%",
        margin: "0 auto",
        display: "flex",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          padding: "20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <img
          src={`http://localhost:5000/static/${product.image}`}
          alt={product.name}
          style={{
            maxWidth: "100%",
            height: "350px",
            borderRadius: "8px",
          }}
        />
        <Box
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            marginLeft: "10px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4">{product.name}</Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: "10px",
              wordWrap: "break-word",
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: "100px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </Typography>
          <Typography variant="h6">Ингредиенты</Typography>
          <Box
            component="ul"
            sx={{
              marginTop: "10px",
              paddingLeft: "20px",
              boxSizing: "border-box",
              width: "100%",
              textAlign: "left",
            }}
          >
            {product.ingredients.map((ingredient, index) => (
              <Typography component="li" variant="body1" key={index}>
                {ingredient}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              textAlign: "right",
              width: "100%",
              marginRight: "20px",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingBagIcon />}
            >
              Заказ
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
