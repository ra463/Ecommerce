import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseStock = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseStock = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToStoreHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Product Added To Store Successfully");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const submitReviewButton = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Thanks for giving review");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} Ecommerce`} />
          <div className="ProductDetails">
            <div>
              <Carousel className="CarouselImage">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="image"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detail-1">
                <p className="tick">
                  <CheckCircleIcon /> Official Store{" "}
                </p>
                <h2>{product.name}</h2>
                <p className="id">
                  <span>Product : </span>#{product._id}
                </p>
              </div>
              <div className="detail-2">
                <span>
                  Ratings : <Rating {...options} />
                </span>
                <span className="star">({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detail-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detail-3-1">
                  <div className="detail-3-1-1">
                    <button onClick={decreaseStock}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseStock}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToStoreHandler}
                  >
                    Add To Store
                  </button>
                </div>
              </div>
              <div className="detail-4">
                <p className="color">
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "Available"}
                  </b>
                </p>
                <span>Details :</span>
                <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Give Review
              </button>
            </div>
          </div>
          <h2 className="ratingsheading">Ratings & Reviews</h2>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Give Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={submitReviewButton} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="review">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReview">No New Review Yet </p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
