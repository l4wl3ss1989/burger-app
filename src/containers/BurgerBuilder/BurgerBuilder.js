import React, { Component } from 'react';
import axios from '../../axios.orders';

import {INGREDIENT_PRICES, BASE_BURGER_PRICE} from '../../configurations/Burger/BurgerConfig';
import Auxiliar from '../../hoc/Auxiliar/Auxilar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class BurgerBuilder extends Component {

    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        ingredients: null,
        totalPrice: BASE_BURGER_PRICE,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props)
        axios.get(`https://react-my-burger-21def.firebaseio.com/ingredients.json`)
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error =>{
            this.setState({error: true})
        })
    }

    updatePurchaseState (ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        }); 

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Max Schmarzmuller',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '41351',
        //             country: 'Germany'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //         console.log(error);
        //     });
        this.props.history.push({ 
            pathname: '/checkout',
            query: { ingredients: this.state.ingredients, totalPrice: this.state.totalPrice }
        });
    }

    render() {
        const diabledInfo = {
            ...this.state.ingredients
        };
        for (let key in diabledInfo) {
            diabledInfo[key] = diabledInfo[key] <= 0;
        }
        let orderSummary = null;               
        let burger = this.state.error ? <p>Ingredients con't be loaded</p> : < Spinner />;
        
        if (this.state.ingredients) {
            burger = (
                <Auxiliar>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={diabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                    />
                </Auxiliar>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }
        
        return (
            <Auxiliar>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliar>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);