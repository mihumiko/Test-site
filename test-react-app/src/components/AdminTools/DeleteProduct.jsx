import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid2,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { fetchProductList, deleteProduct } from "../../api/ProductListApi";

export default function DeleteProduct() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

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

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "80vw", margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Управление товарами
      </Typography>

      <Grid2 container spacing={3}>
        {products.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                position: "relative",
                "&:hover": {
                  boxShadow: 6,
                  "& .delete-icon": {
                    opacity: 1,
                  },
                },
                backgroundColor: "transparent",
                width: "260px",
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
                className="delete-icon"
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
                <Tooltip title="Удалить товар">
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDialog(product)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
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

      {/* Диалог подтверждения удаления */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <Typography>
            Вы действительно хотите удалить товар "{selectedProduct?.name}"?
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Это действие нельзя отменить.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleDeleteProduct(selectedProduct?.id);
              handleCloseDialog();
            }}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
