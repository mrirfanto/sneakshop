import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, deleteProduct } from "../actions/productActions";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    // create product
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="my-3" onClick={createProductHandler}>
            + Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="p-2">{product._id}</td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{`$${product.price}`}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.brand}</td>
                <td className="p-2 d-flex justify-content-center">
                  <Link
                    className="m-r-2"
                    to={`/admin/product/${product._id}/edit`}
                  >
                    <Button variant="dark" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
