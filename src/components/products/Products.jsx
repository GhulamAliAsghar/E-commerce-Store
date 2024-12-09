import { Box, Button, Card, CircularProgress, Divider, Snackbar, TextField, Tooltip, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";


const Products = () => {

    const [cart, setCart] = useState([]);
    const [searchProduct, setSearchProduct] = useState()
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const addCart = (product) => {
        const ifExist = cart.find((cart) => (cart.name === product.name))
        if (!ifExist) {

            setCart((prev) => [...cart, product]);
        } else {
            setOpen(true)
        }

    };

    const searchHandler = (e) => {
        if (e?.target?.value === "") {
            setSearchProduct(products)
        }
        const filteredArr = searchProduct.filter((item) => item?.title.toLowerCase().includes(e.target?.value.toLowerCase()))
        setSearchProduct(filteredArr);
    };

    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const products = await axios.get('https://fakestoreapi.com/products')
                setSearchProduct(products.data,);
                if (products.status === 200) {
                    setIsLoading(false)
                } else {

                }
            } catch (error) {

            }

        }
        fetchProducts()

    }, [cart])



    return (
        <>
            <Box className="container ms-lg-5 ps-lg-5">
                <TextField onChange={searchHandler} size="small" className="ms-5 mt-3" />
            </Box>

            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Product Already Added"
                    action={action}
                />
            </div>

            {isLoading ? <Box className="text-center mt-5 pt-5">
                <CircularProgress />
            </Box> :
                <Box className="container">

                    <Box className="row gap-2 my-3">
                        {
                            searchProduct?.map((product, index) => {

                                return (

                                    <Card className="container col-sm-12 col-md-3 text-center p-4 my-3" key={index} sx={{ cursor: "pointer", minHeight: "300px", maxHeight: "300px", width: '275px' }}>
                                        <img className="product-img" style={{ minHeight: "100px", maxHeight: "100px" }} src={product.image} alt="" />
                                        <Tooltip title={product?.title} placement="top">
                                            <Typography marginTop='20px' variant="body2">{product?.title.length >= 18 ? `${product?.title?.slice(0, 18)}...` : product?.title}</Typography>
                                        </Tooltip>
                                        <Typography variant="body1">{product?.price}</Typography>
                                        <Divider variant="fullWidth" sx={{ borderColor: "gray" }} />
                                        <Box sx={{ display: "flex", justifyContent: "space-around", paddingTop: "20px" }}>
                                            <ShareIcon />
                                            <FavoriteIcon />
                                            <AddShoppingCartIcon onClick={() => { addCart(product) }} />
                                        </Box>

                                    </Card>

                                )
                            })
                        }
                    </Box>
                </Box>
            }

        </>
    );
}

export default Products