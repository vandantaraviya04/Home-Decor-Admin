'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import toast from 'react-hot-toast';

import { Iconify } from 'src/components/iconify';
import { PRODUCTS, type ProductCategory, type ProductStatus } from 'src/_mock/home-decor';

// ----------------------------------------------------------------------

const ProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.string().min(1, 'Price is required').refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, 'Price must be greater than 0'),
  stock: z.string().min(1, 'Stock is required').refine((v) => !isNaN(parseInt(v)) && parseInt(v) >= 0, 'Stock cannot be negative'),
  status: z.string().min(1, 'Status is required'),
  sku: z.string().min(1, 'SKU is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().optional(),
});

type ProductFormData = z.infer<typeof ProductSchema>;

const CATEGORIES: ProductCategory[] = [
  'Furniture', 'Lighting', 'Textiles', 'Rugs', 'Wall Art', 'Accessories', 'Plants', 'Mirrors'
];

// ----------------------------------------------------------------------

export default function ProductFormView({ productId }: { productId?: string }) {
  const router = useRouter();
  const theme = useTheme();
  const isEditing = !!productId;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const product = productId ? PRODUCTS.find((p) => p.id === productId) : null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      category: '',
      price: '',
      stock: '',
      status: 'active',
      sku: '',
      description: '',
      image: '',
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        price: String(product.price),
        stock: String(product.stock),
        status: product.status,
        sku: product.sku,
        description: product.description,
        image: product.image,
      });
      setImagePreview(product.image);
    }
  }, [product, reset]);

  const onSubmit = handleSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success(isEditing ? 'Product updated successfully!' : 'Product added successfully!');
    router.push('/admin/products');
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setValue('image', url);
    }
  };

  const categoryValue = watch('category');
  const statusValue = watch('status');

  return (
    <Box>
      {/* Breadcrumb */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Button
          component={Link}
          href="/admin/products"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          sx={{ color: 'text.secondary' }}
        >
          Products
        </Button>
        <Iconify icon="eva:arrow-ios-forward-fill" width={16} sx={{ color: 'text.disabled' }} />
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </Typography>
      </Stack>

      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {/* Main Info */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Product Details" />
              <CardContent>
                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Name"
                      {...register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={4}
                      {...register('description')}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Price (₹)"
                      type="number"
                      inputProps={{ step: '0.01', min: '0' }}
                      {...register('price')}
                      error={!!errors.price}
                      helperText={errors.price?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Stock Quantity"
                      type="number"
                      inputProps={{ min: '0' }}
                      {...register('stock')}
                      error={!!errors.stock}
                      helperText={errors.stock?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="SKU"
                      {...register('sku')}
                      error={!!errors.sku}
                      helperText={errors.sku?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.category}>
                      <InputLabel shrink>Category</InputLabel>
                      <Select
                        label="Category"
                        value={categoryValue || ''}
                        {...register('category')}
                        onChange={(e) => setValue('category', e.target.value)}
                        notched
                      >
                        {CATEGORIES.map((cat) => (
                          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                      </Select>
                      {errors.category && (
                        <FormHelperText>{errors.category.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar - Image & Status */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Image Upload */}
              <Card>
                <CardHeader title="Product Image" />
                <CardContent>
                  <Box
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: 1.5,
                      border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 1,
                      overflow: 'hidden',
                      bgcolor: alpha(theme.palette.grey[500], 0.04),
                      '&:hover': { bgcolor: alpha(theme.palette.grey[500], 0.08) },
                    }}
                  >
                    {imagePreview ? (
                      <Box
                        component="img"
                        src={imagePreview}
                        alt="Product"
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <>
                        <Iconify icon="solar:camera-add-bold-duotone" width={40} sx={{ color: 'text.disabled' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                          Click to upload image
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          PNG, JPG up to 5MB
                        </Typography>
                      </>
                    )}
                  </Box>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                  {imagePreview && (
                    <Button
                      fullWidth
                      size="small"
                      variant="outlined"
                      color="error"
                      sx={{ mt: 1 }}
                      onClick={() => { setImagePreview(''); setValue('image', ''); }}
                    >
                      Remove Image
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Status */}
              <Card>
                <CardHeader title="Product Status" />
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel shrink>Status</InputLabel>
                    <Select
                      label="Status"
                      value={statusValue || 'active'}
                      {...register('status')}
                      onChange={(e) => setValue('status', e.target.value)}
                      notched
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Actions */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            component={Link}
            href="/admin/products"
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator={isEditing ? 'Updating...' : 'Saving...'}
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
}
