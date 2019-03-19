import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// Change to statless later!***

class Checkout extends Component {

    state = {
        ingredients: {},
        // ingredients: {
        //     salad: 0,
        //     meat: 0,
        //     cheese: 0,
        //     bacon: 0
        // },
        price : 0
    }

    componentWillMount() {
        if (this.props.location.query){
            this.setState({ 
                ingredients: this.props.location.query.ingredients, 
                price: this.props.location.query.totalPrice 
            }); 
        }else {
            // this.props.history.push('/');
        }
    }

    checkoutCancelledHandled = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandled = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        //console.log(this.state)
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandled}
                    onCheckoutContinued={this.checkoutContinuedHandled}              
                />
                <Route 
                    path={`${this.props.match.path}/contact-data`} 
                    render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} /> }
                />
            </div>
        );
    }
}

export default Checkout;