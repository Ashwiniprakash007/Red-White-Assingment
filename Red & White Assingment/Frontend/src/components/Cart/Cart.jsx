import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Typography, Card, CardContent, Grid, CardMedia,Button,Container,CircularProgress } from "@mui/material";


export const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  //const classes = useStyles();

  const fetchCartItemsWithDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      console.log("Cart data:", data);
      setCartData(data[0].items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items with details:", error);
    }
  };

  useEffect(() => {
    fetchCartItemsWithDetails();
  }, []);


  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
          },
      });
      if (!response.ok) {
        throw new Error('Failed to remove product from cart');
      }
      // Fetch cart items again to update the UI
      fetchCartItemsWithDetails();
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    <div>
    <Navbar />
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Cart Page
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {cartData.map((item) => (
            <Grid item xs={12} key={item._id}>
              <Card style={{ display: "flex" }}>
                <CardMedia
                  style={{ width: 160 }}
                  image={item.productId.image}
                  title={item.productId.title}
                />
                <CardContent style={{ flex: "1 0 auto" }}>
                  <Typography variant="h5" component="h2">
                    {item.productId.title}
                  </Typography>
                  <Typography variant="body1">
                    Description: {item.productId.description}
                  </Typography>
                  <Typography variant="body1">
                    Category: {item.productId.category}
                  </Typography>
                  <Typography variant="body1">
                    Price: {item.productId.price}
                  </Typography>
                  <Typography variant="body1">
                    Quantity: {item.quantity}
                  </Typography>
                </CardContent>
                <Button
                onClick={() => removeFromCart(item.productId._id)}
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "auto" }}
                >
                  Remove
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  </div>





















    // <div>
    //   <Navbar />
    //   <h2>Cart Page</h2>
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     <div>
    //       {cartData && cartData.length > 0 ? (
    //         cartData.map((item) => (
    //           <div key={item._id}>
    //             <h3>{item.productId.title}</h3>
    //             <p>Description: {item.productId.description}</p>
    //             <p>Category: {item.productId.category}</p>
    //             <p>Price: {item.productId.price}</p>
    //             <p>Quantity: {item.quantity}</p>
    //             {item.productId.image && (
    //               <img src={item.productId.image} alt="Product" />
    //             )}
    //           </div>
    //         ))
    //       ) : (
    //         <p>No items in the cart</p>
    //       )}
    //     </div>
    //   )}
    // </div>
  );
};

