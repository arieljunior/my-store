import { Box, Grid, Skeleton } from "@mui/material";

function DetailSkeleton() {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={500}
          sx={{ borderRadius: 2 }}
        />
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Skeleton variant="text" width="80%" height={60} />
        <Skeleton variant="text" width="40%" height={40} />
        <Box my={3}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
        </Box>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ borderRadius: 2, mt: "auto" }}
        />
      </Grid>
    </Grid>
  );
}

export default DetailSkeleton;
