import React from "react";
import { ProductList } from "../../data/productData";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function AllProduct() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 8,
      }}
    >
      {ProductList.map((menu) => (
        <Card sx={{ maxWidth: 300, display: "flex", m: 2 }}>
          <CardActionArea>
            <CardMedia
              sx={{ height: 200 }}
              component={"img"}
              src={menu.image}
              alt={menu.name}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom component={"div"}>
                {menu.name}
              </Typography>
              <Typography variant="body2">{menu.description}</Typography>
            </CardContent>
            <CardActions sx={{ float: "right" }}>
              <Button size="small">Share</Button>
            </CardActions>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
