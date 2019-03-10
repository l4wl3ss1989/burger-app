import React from 'react';

import styles from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={styles.NavigationItems}>
       <NavigationItem link="/" active>Burger Builer</NavigationItem>
       <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;