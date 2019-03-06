import React from 'react';

import Auxilar from '../../hoc/Auxilar';
import styles from './Layout.module.scss';

const layout = (props) => (
    <Auxilar>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Auxilar>
    
);

export default layout;