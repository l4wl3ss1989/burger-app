import React from 'react';

import styles from './BurgerIngredient.module.scss';

const burgerIngredient = (props) => {

    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className={styles.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className={styles.BreadTop}>
                    <div className={styles.Seed1}></div>
                    <div className={styles.Seed2}></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className={styles.Meat}></div>;
            break;
        case ('cheese'):
            ingredient = <div className={styles.Cheese}></div>;
        break;
        case ('salad'):
            ingredient = <div className={styles.Salad}></div>;
        break;
        case ('bacon'):
            ingredient = <div className={styles.Bacon}></div>;
        break;
    }

    return (
        <div>
            
        </div>
    );
};

export default burgerIngredient;