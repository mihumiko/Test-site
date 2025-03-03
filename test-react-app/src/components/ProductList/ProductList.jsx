import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProductList } from "../../api/ProductListApi";
import { CircularProgress } from "@mui/material";
import {
  Grid2,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productList = await fetchProductList();
        setProducts(productList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!products) {
    return <h2>Товар не найден</h2>;
  }

  return (
    <Box
      sx={{
        maxWidth: "70vw",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <Grid2
        container
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          padding: 2,
        }}
      >
        {products.map((product) => (
          <Grid2
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <Card sx={{ backgroundColor: "transparent" }}>
              <CardActionArea component={Link} to={`/product/${product.id}`}>
                <CardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    borderRadius: "8px 8px 0 0",
                    objectFit: "cover",
                  }}
                />
              </CardActionArea>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">{product.name}</Typography>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={(event) => {
                    event.stopPropagation();
                    console.log("Добавлено в корзину", product.name);
                  }}
                  sx={{
                    marginLeft: "auto",

                    whiteSpace: "nowrap",
                  }}
                >
                  Добавить
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
