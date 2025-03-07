import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid2,
} from "@mui/material";

export default function EditProductForm({ product, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    ingredients: product.ingredients,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    `http://localhost:5000/static/${product.image}`
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Здесь будет логика отправки данных на сервер
    // После успешного обновления:
    // onSuccess(updatedProduct);
  };

  return (
    <>
      <DialogTitle>Редактирование товара: {product.name}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Название"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Цена"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Описание"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <Box sx={{ mt: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <Button variant="contained" component="span">
                    Изменить изображение
                  </Button>
                </label>
              </Box>
              {preview && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
            </Grid2>
          </Grid2>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
}
