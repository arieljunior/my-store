import { Alert, Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  fetchCartItems,
  removeCartItem,
  selectCart,
  updateCartItem,
} from "../store/slices/cart-slice";
import { CartItemSkeleton } from "../components/Cart/CartItemSkeleton";
import { CartEmpty } from "../components/Cart/CartEmpty";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../store";
import CartSummary from "../components/Cart/CartSummary";
import CartItemRow from "../components/Cart/CartItemRow";

function CartPage() {
  const dispatch = useAppDispatch();
  const {
    items,
    status,
    error,
    totalAmount,
    totalQuantity,
    processingItemIds,
  } = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleUpdateQuantity = useCallback(
    (documentId: string, quantity: number) => {
      dispatch(updateCartItem({ documentId, quantity }));
    },
    [dispatch],
  );

  const handleRemove = useCallback(
    (documentId: string) => {
      dispatch(removeCartItem(documentId));
    },
    [dispatch],
  );

  const isLoading = status === "loading";
  const isFailed = status === "failed";
  const isEmpty = status === "succeeded" && items.length === 0;
  const hasItems = status === "succeeded" && items.length > 0;

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        color="primary.main"
        sx={{ mb: 4 }}
      >
        Meu Carrinho
      </Typography>

      {isFailed && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error ?? "Ocorreu um erro ao carregar o carrinho."}
        </Alert>
      )}

      {isLoading && <CartItemSkeleton />}
      {isEmpty && <CartEmpty />}

      {hasItems && (
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            {items.map((item) => (
              <CartItemRow
                key={item.documentId}
                item={item}
                isProcessing={processingItemIds.includes(item.documentId)}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CartSummary
              totalAmount={totalAmount}
              totalQuantity={totalQuantity}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default CartPage;
