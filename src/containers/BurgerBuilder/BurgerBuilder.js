import React, { Component } from 'react';

import Auxiliar from '../../hoc/Auxilar';

class BurgerBuilder extends Component {
    render() {
        return (
            <Auxiliar>
                <div>Burger</div>
                <div>Build Controls</div>
            </Auxiliar>
        );
    }
}

export default BurgerBuilder;