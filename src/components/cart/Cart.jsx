import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';


export default function Cart(props) {

    const { open, toggleDrawer } = props;
    const [cartItems, setCartItems] = useState();

    useEffect(() => {
        const productsArr = localStorage.getItem("cartList")
        const productsObj = JSON.parse(productsArr)
        setCartItems(productsObj)
    }, [])


    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    {
                        cartItems?.map((product, index) => {
                            return (
                                <Box key={index} className="d-flex justify-content-around align-items-center my-2">
                                    <img width={"75px"} src={product.img} alt="" />
                                    <Typography>{product.name}</Typography>
                                    <Typography>{product.price}</Typography>
                                </Box>
                            )

                        }
                        )
                    }
                </Box>
            </Drawer>
        </div>
    );
}
