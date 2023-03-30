import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image7 from "../images/image7.png";
import axios from "axios";
import Swal from "sweetalert2";

function Food() {
  const navigate = useNavigate();
  const [food, setFood] = useState([]);
  const [counter, setCounter] = useState(0);
  const [cart, setCart] = useState([]);
  const [buy, setBuy] = useState([]);

  //buy

  const handleBuy = () => {
    if (cart.length > 0) {
      setBuy(cart);
      setCart([]);
      Swal.fire("Purchased!", "", "success");
    } else {
      Swal.fire("Not purchased", "", "info");
    }
  };

  const handleClick = (item) => {
    if (cart.find((product) => product._id == item._id)) {
      console.log("bor");
    } else {
      console.log("yoq");
      setCart([...cart, item]);
    }
  };

  const handleDel = (i) => {
    let newCart = cart.filter((item, index) => index !== i);
    setCart(newCart);
    console.log(cart);
  };

  //increment

  const handleIncrement = (cartId) => {
    console.log(cartId);

    cart.map((value) => {
      if (value._id === cartId) {
        console.log(value._id, cartId);
        value.counter++;
        console.log(value.counter);
      }
    });
  };

  //decroment

  const handleDecroment = (cartId) => {
    // if (counter > 1) {
    //   setCounter((counter) => counter - 1);
    // }
    // let newCart = cart.filter((item, index) => index!== cartId);
    // setCart(newCart);
    // console.log(cart);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/foods`)
      .then((res) => {
        setFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isAppear, setIsAppear] = useState(false);

  const showCard = () => {
    setIsAppear(!isAppear);
  };

  return (
    <>
      <div>
        {/* Navbar start */}

        <section className="menu">
          <div className="nav">
            <div className="logo">
              <h1>
                Food <b>io</b>
              </h1>
            </div>
            <ul>
              <li>
                <a href="#" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#our-menu">Foods</a>
              </li>
              <li>
                <a href="#iframe">Service</a>
              </li>
            </ul>
            <div>
              <span
                className="btn bag"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <i className="bx bx-shopping-bag"></i>
                <h6 className="cart-length">{cart.length}</h6>
              </span>

              <span
                className="btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop"
                aria-controls="offcanvasTop"
              >
                <i className="bx bx-menu"></i>
              </span>
            </div>
          </div>
        </section>

        {/* Navbar end */}

        {/* Buying cart start */}

        <div className="offcanvas-in-header">
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header-cart">
              {cart.map((cart, i) => {
                return (
                  <div className="cartt" key={cart.id}>
                    <div className="cart-item-div">
                      <img src={cart.image} alt="404" className="cart-image" />
                      <button onClick={() => handleDel(i)} className="x-btn">
                        x
                      </button>
                      <h5>{cart.title}</h5>
                      <h6>Price : ${cart.price}</h6>
                      <p>Product number : {counter}</p>
                      <p>Total price : ${cart.price * counter}</p>
                      <div className="btn-div">
                        <div className="counter-div">
                          <div className="minus">
                            <button
                              onClick={() => handleDecroment(cart._id)}
                              className="btn-div-btn"
                            >
                              -
                            </button>
                          </div>
                          <div className="plus">
                            <button
                              onClick={() => handleIncrement(cart._id)}
                              className="btn-div-btn"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button className="btn btn-success" onClick={handleBuy}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Buying cart end */}

        {/* Phone navbar start */}

        <div>
          <div
            className="offcanvas offcanvas-top"
            tabIndex="-1"
            id="offcanvasTop"
            aria-labelledby="offcanvasTopLabel"
          >
            <div className="offcanvas-header">
              <ul>
                <li>
                  <a href="#" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#our-menu">Foods</a>
                </li>
                <li>
                  <a href="#iframe">Service</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Phone navbar end */}

        {/* Food header start */}

        <section className="grid">
          <div className="content">
            <div className="content-left">
              <div className="info">
                <h2>
                  Order Your Best <br /> Food anytime
                </h2>
                <p>
                  Hey, Our delicious food is waiting for you, <br /> We are
                  always near to you with fresh item of food
                </p>
              </div>
              <button className="explore-food">
                <a href="#our-menu">Explore Food</a>
              </button>
            </div>
            <div className="content-right">
              <img src={image7} alt="404" className="images" />
            </div>
          </div>
        </section>

        {/* Food header end */}

        <div id="our-menu"></div>
        <h1 className="our-menu">
          Our<span>Menu</span>
        </h1>
        <div className="menu" id="Menu">
          {food.map((foods) => {
            return (
              <div className="menu-box" key={foods.id}>
                <div className="menu_box">
                  <div className="menu_card">
                    <div className="menu_image">
                      <img src={foods.image} />
                    </div>

                    <div className="small_card">
                      <i className="fa-solid fa-heart"></i>
                    </div>

                    <div className="menu_info">
                      <h2>{foods.title}</h2>
                      <p>{foods.description}</p>
                      <div className="priceandbtn">
                        <h3>${foods.price}</h3>
                        <i
                          onClick={() => handleClick(foods)}
                          className="bx bxs-plus-circle"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer-div">
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="footer-col">
                <h4>contact us</h4>
                <ul>
                  <li>
                    <a href="#">
                      <i className="bx bx-phone"></i> +998998863758
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mail.google.com/mail/u/0/#search/ashurovabror25%40gmail.com?compose=new"
                      target={"_blank"}
                    >
                      <i className="bx bx-envelope"></i>{" "}
                      ashurovabror25@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bx bx-current-location"></i>{" "}
                      Uzbekistan/Tashkent
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>location</h4>
                <ul>
                  <li>
                    <iframe
                      id="iframe"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.1901160346524!2d69.22629601488596!3d41.32647910773264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bb7a0ebbae3%3A0xf9e01b5d45fc68cd!2sPDP%20Academy!5e0!3m2!1sru!2s!4v1679483049967!5m2!1sru!2s"
                      width="600"
                      height="450"
                      className="iframe"
                      style={{ border: "0" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>follow us</h4>
                <div className="social-links">
                  <a href="#" target="_blank">
                    <i className="bx bxl-facebook-circle"></i>
                  </a>
                  <a href="https://t.me/the_ebror" target="_blank">
                    <i className="bx bxl-telegram"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/the_ebror/"
                    target="_blank"
                  >
                    <i className="bx bxl-instagram"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i className="bx bxl-linkedin-square"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Food;
