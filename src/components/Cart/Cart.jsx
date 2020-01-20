import React, {useState} from 'react';
import {observer} from 'mobx-react';
import styles from './Cart.module.scss';
import CreateForm from '../../containers/CreateForm/CreateForm';

const Cart = observer(({cart}) => {

    const [isEditing, setIsEditing] = useState(false);

    const saveCartTitle = newTitle => {
        cart.saveTitle(newTitle);
        setIsEditing(false);
    }

    return (isEditing ?
        <CreateForm
            inputTag='textarea'
            onSubmit={saveCartTitle}
            defaultValue={cart.title}
            submitOnBlur={true}
            disableActions={true}
            submitBtnText='Добавить карточку'
            placeholder='Введите название карточки'
        />
    :
        <form onSubmit={() => setIsEditing(true)} className={styles.Cart}>
            <button
                className={styles.Cart__button}
                type="submit"
                onClick={() => setIsEditing(true)}
            >
                {cart.title}
            </button>
        </form>
    );
});

export default Cart;