import { Clear } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Product } from '../../data';
import { useProducts } from '../contexts/ProductsContext';
import { theme } from '../theme';

interface Props {
  product: Product;
}

export default function AdminCard({ product }: Props) {
  const { setSelectedProduct } = useProducts();
  const { id, title, image, images, price, pieces } = product;

  const handleEditButtonClick = () => {
    setSelectedProduct(product);
    console.log(product);
  };

  return (
    <Card
      sx={styledCard}
      data-cy="product"
    >
      <CardMedia
        sx={styledCardMedia}
        component="img"
        image={image}
        alt="Image thumbnail"
      />
      <Box sx={styledBox}>
        <CardContent sx={styledCardContent}>
          <Typography
            variant="h5"
            data-cy="product-title"
          >
            {title}
          </Typography>
          <Typography variant="body1">
            Article number: <span data-cy="product-id">{id}</span>
          </Typography>
          <Typography variant="body1">Pieces: {pieces}</Typography>
          <Typography
            variant="body1"
            data-cy="product-price"
          >
            {price} SEK
          </Typography>
        </CardContent>
      </Box>
      <Box sx={rightContainer}>
        <IconButton
          sx={removeButton}
          aria-label="remove"
          data-cy="admin-remove-product"
        >
          <Clear />
        </IconButton>
        {/* <Link to={`/admin/edit/${product.id}`} data-cy="admin-edit-product"> */}
        <Link
          to={`/admin/product/${product.id}`}
          data-cy="admin-edit-product"
          onClick={handleEditButtonClick}
        >
          <Typography sx={styledLink}>Edit</Typography>
        </Link>
      </Box>
    </Card>
  );
}

const styledCard = {
  margin: '1rem 0',
  display: 'flex',
};

const styledCardMedia = {
  maxWidth: 0.3,
};

const styledCardContent = {
  padding: '0 1rem',
};

const styledBox = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
};

const removeButton = {
  height: '2rem',
  width: '2rem',
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: theme.palette.lightGrey.main,
  },
};

const editLink = {};

const rightContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
};

const styledLink = {
  textDecorationColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'DM Sans',
};
