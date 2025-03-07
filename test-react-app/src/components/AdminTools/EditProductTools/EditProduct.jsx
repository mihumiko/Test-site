import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid2,
  Dialog,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { fetchProductList } from "../../../api/ProductListApi";
import EditProductForm from "./EditProductForm";

export default function EditProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const productList = await fetchProductList();
      setProducts(productList);
    };
    loadProducts();
  }, []);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ maxWidth: "80vw", margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Редактирование товаров
      </Typography>

      <Grid2 container spacing={3}>
        {products.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                position: "relative",
                backgroundColor: "transparent",
                width: "260px",
                "&:hover": {
                  boxShadow: 6,
                  "& .edit-icon": {
                    opacity: 1,
                  },
                },
              }}
            >
              <CardMedia
                component="img"
                height="175"
                image={`http://localhost:5000/static/${product.image}`}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <Box
                className="edit-icon"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  opacity: 0,
                  transition: "opacity 0.3s",
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "50%",
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => handleOpenDialog(product)}
                >
                  <EditIcon />
                </IconButton>
              </Box>
              <CardContent>
                <Typography variant="h6" noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.price} ₽
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Диалог редактирования */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <EditProductForm
            product={selectedProduct}
            onClose={() => setOpenDialog(false)}
            onSuccess={(updatedProduct) => {
              setProducts(
                products.map((p) =>
                  p.id === updatedProduct.id ? updatedProduct : p
                )
              );
              setOpenDialog(false);
            }}
          />
        )}
      </Dialog>
    </Box>
  );
}
