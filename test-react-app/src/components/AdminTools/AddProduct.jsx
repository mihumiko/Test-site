import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  InputLabel,
  OutlinedInput,
  FormControl,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    ingredients: [],
    image: null,
  });
  const [newIngredient, setNewIngredient] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()],
      }));
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Название обязательно";
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Введите корректную цену";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Описание обязательно";
    }
    if (formData.ingredients.length === 0) {
      newErrors.ingredients = "Добавьте хотя бы один ингредиент";
    }
    if (!formData.image) {
      newErrors.image = "Выберите изображение";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "ingredients") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (key === "price") {
        formDataToSend.append(key, parseFloat(formData[key]));
      } else if (key === "image") {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Необходима авторизация");
        return;
      }

      console.log("Отправка данных на сервер...");
      console.log("Токен:", token);

      const response = await fetch("http://localhost:5000/admin/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      console.log("Статус ответа:", response.status);
      console.log(
        "Заголовки ответа:",
        Object.fromEntries(response.headers.entries())
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Успешный ответ:", result);
        alert("Продукт успешно добавлен!");
        setFormData({
          name: "",
          price: "",
          description: "",
          ingredients: [],
          image: null,
        });
        setNewIngredient("");
      } else {
        const errorText = await response.text();
        console.error("Текст ошибки:", errorText);
        try {
          const error = JSON.parse(errorText);
          alert(error.message || "Ошибка при добавлении продукта");
        } catch (e) {
          alert("Ошибка при добавлении продукта: " + errorText);
        }
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при добавлении продукта: " + error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        p: 4,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "primary.main",
            mb: 3,
          }}
        >
          Добавить новый продукт
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl error={!!errors.name}>
              <TextField
                fullWidth
                label="Название"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
              />
            </FormControl>

            <FormControl error={!!errors.price}>
              <TextField
                fullWidth
                label="Цена"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                variant="outlined"
                InputProps={{
                  startAdornment: "₽",
                }}
              />
            </FormControl>

            <FormControl error={!!errors.description}>
              <TextField
                fullWidth
                label="Описание"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                variant="outlined"
              />
            </FormControl>

            <FormControl error={!!errors.ingredients}>
              <Typography variant="subtitle1" gutterBottom>
                Ингредиенты
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  label="Добавить ингредиент"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleAddIngredient}
                          edge="end"
                          color="primary"
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <List dense>
                {formData.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={ingredient} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              {errors.ingredients && (
                <FormHelperText error>{errors.ingredients}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.image}>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ height: 56 }}
              >
                {formData.image
                  ? "Изменить изображение"
                  : "Выбрать изображение"}
                <VisuallyHiddenInput
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
              </Button>
              {formData.image && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Выбрано: {formData.image.name}
                </Typography>
              )}
              {errors.image && (
                <FormHelperText error>{errors.image}</FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              Добавить продукт
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default AddProduct;
