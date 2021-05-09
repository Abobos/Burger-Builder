import React, { Component } from "react";

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";

import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const newOrder = {
      ingredients: { ...this.props.ingredients },
      price: +this.props.price,
      customer: {
        name: "Blessing Makaraba",
        address: {
          street: "10 Ojodu Berger",
          zipCode: "+234",
          country: "Nigeia",
        },
        email: "blessingmakaraba@gmail.com",
      },

      deliveryMethod: "fastest",
    };

    const response = await axios.post("/orders.json", newOrder);
    this.setState({ loading: false });

    console.log({ response });

    this.props.history.push("/");
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />

        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your email"
        />

        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />

        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />

        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
