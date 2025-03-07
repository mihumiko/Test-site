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
  const [adminMode, setAdminMode] = useState(false);

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
        maxWidth: "80vw",
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
            <Card sx={{ backgroundColor: "transparent", width: "260px" }}>
              <CardActionArea component={Link} to={`/product/${product.id}`}>
                <CardMedia
                  component="img"
                  height="175"
                  image={`http://localhost:5000/static/${product.image}`}
                  alt={product.name}
                  sx={{
                    borderRadius: "8px 8px 0 0",
                    objectFit: "cover",
                    width: "260px",
                  }}
                />
              </CardActionArea>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">{product.name}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginRight: "10px",
                  }}
                >
                  <Typography variant="h6" sx={{ padding: 2 }}>
                    {product.price + "₽"}
                  </Typography>
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
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
