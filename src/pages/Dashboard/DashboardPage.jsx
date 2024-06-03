import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'; // For products
import ReplayIcon from '@mui/icons-material/Replay'; // For returns
import { Link } from 'react-router-dom';



const DashboardPage = () => {
  // Sample data for the cards
  const cardData = [
    { title: 'Orders', number: 120, icon: <ShoppingCartIcon />, link:"/dashboard/all-orders" },
    { title: 'User Logins', number: 80, icon: <LoginIcon />, link:"/dashboard/all-users" },
    { title: 'Products', number: 200, icon: <ProductionQuantityLimitsIcon />, link:"/dashboard/products" },
    { title: 'Returns', number: 30, icon: <ReplayIcon />, link:"/dashboard/return-products" }
  ];

  return (
    <>

      <Grid container spacing={2}>
        {cardData.map((data, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link to={data.link}>
              <Card raised sx={{
                bgcolor: '#a9afc3', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: 1
              }}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ fontSize: "30px", fontWeight: 600 }}> {data.number}</Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: "20px" }}> {data.title}</Typography>
                </CardContent>
                <Box sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginRight: 2, p: 4, bgcolor: '#ff6060', borderRadius: "50%",
                  fontSize: "50px"
                }}>
                  {data.icon}
                </Box>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>



      <Box sx={{ mt: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ width: '100%', height: '300px', bgcolor: 'gray' }}>
            asdf
          </Grid>
          <Grid item xs={6} sx={{ width: '100%', height: '300px', bgcolor: 'gray' }}>
            asdf
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardPage;
