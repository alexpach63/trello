import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

const Button = ({text, level, size, cover, icon, ...rest}) => {
    const classNames = cn(styles.Button, {
        [styles['Button--lvl--success']]: level === 'success',
        [styles['Button--size--big']]: size === 'big',
        [styles['Button--cover']]: cover,
    })
    return (
        <button className={classNames} {...rest}>
            {!!icon &&
                <div className={text ? styles.Button__icon : ''}>
                    {icon}
                </div>
            }
            {text}
        </button>
    )
}

export default Button;