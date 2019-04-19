import React, { Component } from "react";
import { generateSeed, generateAddresses, sendEther } from "./generate_seed";

import "./styles.css";

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: "",
      from: "",
      to: "",
      amount: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddresses = this.handleAddresses.bind(this);
    this.handleSeed = this.handleSeed.bind(this);
    this.handleEther = this.handleEther.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleAddresses(event) {
    generateAddresses(this.state);
    event.preventDefault();
  }

  handleSeed(event) {
    generateSeed(this.state);
    event.preventDefault();
  }

  handleEther(event) {
    sendEther(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="alert alert-info" role="alert" id="info">
              Create or use your existing wallet.
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="seed">Enter 12-word seed</label>
                <input
                  name="mnemonic"
                  type="text"
                  className="form-control"
                  id="seed"
                  value={this.state.mnemonic}
                  onChange={this.handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                id="generate_button"
                onClick={this.handleAddresses}
              >
                Generate Details
              </button>
              <button
                type="button"
                className="btn btn-primary"
                id="seed_button"
                onClick={this.handleSeed}
              >
                Generate New Seed
              </button>
            </form>
            
            {/*<h3 className="text-xs-center">
              Address, Keys and Balances of the seed
            </h3>
            <ol id="list" />
            <h3 className="text-xs-center">Send ether</h3>
            <form>
              <div className="form-group">
                <label htmlFor="address1">From address</label>
                <input
                  name="from"
                  type="text"
                  className="form-control"
                  id="address1"
                  value={this.state.from}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address2">To address</label>
                <input
                  name="to"
                  type="text"
                  className="form-control"
                  id="address2"
                  value={this.state.to}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ether">Amount ether to send</label>
                <input
                  name="amount"
                  type="text"
                  className="form-control"
                  id="ether"
                  value={this.state.amount}
                  onChange={this.handleChange}
                />
              </div>
              <button
                type="button"
                id="ether_submit"
                className="btn btn-primary"
                onClick={this.handleEther}
              >
                Send Ether
              </button>
            </form> */}
          </div>
        </div>
      </div>
    );
  }
}
