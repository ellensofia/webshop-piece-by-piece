import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperTextProps,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Product } from '../../data';
import { useProducts } from '../contexts/ProductsContext';
import AdminButton from './AdminButton';

//--------------------------Interfaces------------------------------//

interface AdminProductFormProps {
  product?: Product;
  open: boolean;
  onClose?: () => void;
  mode: 'add' | 'edit';
}
type ProductCreate = Omit<Product, 'id'>;

const validationSchema = yup.object({
  title: yup
    .string()
    .min(2, 'Title must be at least two characters')
    .required('Title required'),
  image: yup.string().required('Image required'),
  //images: yup.array(yup.string()),
  price: yup
    .number()
    .min(1, 'Price must be greater than 0')
    .required('Price required'),
  pieces: yup
    .number()
    .positive('Pieces must be a positive number')
    .integer('Pieces must be an integer'),
  description: yup
    .string()
    .min(4, 'Description must be at least four characterns')
    .required('Description required'),
});

function generateShortId(length: number = 8) {
  return Math.random().toString(36).substring(2, length);
}

//--------------------------Function------------------------------//

export default function AdminProductForm({
  product,
  open,
  onClose,
  mode,
}: AdminProductFormProps) {
  const navigate = useNavigate();
  const { products, setProducts, selectedProduct } = useProducts();
  const isEdit = mode === 'edit';

  //const { productId } = useParams<{ productId: string }>();

  const formik = useFormik<ProductCreate>({
    initialValues:
      isEdit && selectedProduct
        ? {
            title: selectedProduct.title,
            image: selectedProduct.image,
            images: selectedProduct.images,
            price: selectedProduct.price,
            pieces: selectedProduct.pieces,
            description: selectedProduct.description,
          }
        : {
            title: '',
            image: '',
            images: [],
            price: '' as any,
            pieces: '' as any,
            description: '',
          },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newProduct: Product = {
        id: isEdit && selectedProduct ? selectedProduct.id : generateShortId(),
        image: values.image,
        title: values.title,
        description: values.description,
        price: values.price,
        pieces: values.pieces,
        images: values.images,
      };

      if (isEdit) {
        setProducts(
          products.map((product) =>
            product.id === newProduct.id ? newProduct : product
          )
        );
      } else {
        setProducts([...products, newProduct]);
      }

      if (onClose) {
        onClose();
      }
      navigate('/admin');
    },
  });

  //--------------------------Return------------------------------//

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{isEdit ? 'Edit item' : 'Add new item'}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
          data-cy="product-form"
          // id="product-form"
        >
          <TextField
            fullWidth
            margin="normal"
            variant="standard"
            id="title"
            name="title"
            inputProps={{
              'data-cy': 'product-title',
            }}
            label={
              <>
                Title<span style={requiredIndicator}>*</span>
              </>
            }
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            onBlur={formik.handleBlur}
            FormHelperTextProps={
              { 'data-cy': 'product-title-error' } as FormHelperTextProps
            }
          />
          <TextField
            fullWidth
            margin="normal"
            variant="standard"
            id="price"
            name="price"
            inputProps={{
              'data-cy': 'product-price',
            }}
            label={
              <>
                Price<span style={requiredIndicator}>*</span>
              </>
            }
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            FormHelperTextProps={
              { 'data-cy': 'product-price-error' } as FormHelperTextProps
            }
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="standard"
            id="pieces"
            name="pieces"
            label="Pieces"
            type="number"
            value={formik.values.pieces}
            onChange={formik.handleChange}
            error={formik.touched.pieces && Boolean(formik.errors.pieces)}
            helperText={formik.touched.pieces && formik.errors.pieces}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="standard"
            id="image"
            name="image"
            inputProps={{
              'data-cy': 'product-image',
            }}
            label={
              <>
                Image<span style={requiredIndicator}>*</span>
              </>
            }
            value={formik.values.image}
            onChange={formik.handleChange}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
            onBlur={formik.handleBlur}
            FormHelperTextProps={
              { 'data-cy': 'product-image-error' } as FormHelperTextProps
            }
          />
          <TextField
            fullWidth
            margin="normal"
            variant="standard"
            id="description"
            name="description"
            inputProps={{
              'data-cy': 'product-description',
            }}
            label="Description"
            value={formik.values.description}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.description && formik.errors.description}
            FormHelperTextProps={
              { 'data-cy': 'product-description-error' } as FormHelperTextProps
            }
          />
          {/* <Button
            onClick={() =>
              formik.setFieldValue('images', [...formik.values.images, ''])
            }
          >
            Add more images
          </Button> */}
        </Box>
      </DialogContent>
      <DialogActions sx={buttonContainer}>
        <AdminButton to="/admin">Cancel</AdminButton>
        <AdminButton
          type="submit"
          onClick={formik.handleSubmit}
        >
          {isEdit ? 'Save' : 'Add'}
        </AdminButton>
      </DialogActions>
    </Dialog>
  );
}

const buttonContainer = {
  justifyContent: 'space-between',
  margin: '0 1rem',
};

const requiredIndicator = {
  color: 'red',
};
