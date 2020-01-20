import React from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';
import styles from './Column.module.scss';
import createFormStyles from '../../containers/CreateForm/CreateForm.module.scss';
import cartStyles from '../Cart/Cart.module.scss';
import Cart from '../Cart/Cart';
import Button from '../Button/Button';
import CreateForm from '../../containers/CreateForm/CreateForm';
import Sortable from 'sortablejs';
import {
    createCustoms,
    removeNode,
    insertNodeAt,
} from '../../utils';
import {IconPlus} from '../../icons';
import {store} from '../../store';

@observer
class Column extends React.Component { 

    listRef = React.createRef();
    state = {
        isEditing: false,
    }

    onUpdate = evt => { // вызывается, если перемещаем елемент внутри своего-же списка
        const {items} = this.props.column;
        const customs = createCustoms(evt, items);

        removeNode(customs.element);
        insertNodeAt(customs.parentElement, customs.element, customs.oldIndex);
        this.props.column.moveCart(customs.item, customs.newIndex)
    }

    onAdd = evt => { // добавляем элемент в новый список
        const {items} = store.draggingColumn.props.column;
        const customs = createCustoms(evt, items);

        removeNode(customs.element);
        this.props.column.addCart(customs.newIndex, customs.item);

    }

    onRemove = evt => { // удаляем из предыдущего списка
        const {items, removeCart} = this.props.column;
        const customs = createCustoms(evt, items);
        
        insertNodeAt(customs.parentElement, customs.element, customs.oldIndex);
        removeCart(customs.oldIndex);
    }

    onChooseCart = evt => {
        evt.item.style.width = evt.item.clientWidth + 'px';
        evt.item.style.height = evt.item.clientHeight + 'px';
    }
    onUnchoose = evt => {
        evt.item.style.width = 'auto';
        evt.item.style.height = 'auto';
    }

    onStart = (evt) => {
        store.draggingColumn = this;
    }

    onEnd = (evt) => {
        store.draggingColumn = null;
    }

    onCreateCartSubmit = title => {
        store.addCartToColumn(title, this.props.column.id);
    }

    setEditing = () => {
        this.setState({
            isEditing: true,
        })
    }

    saveColumnTitle = newTitle => {
        this.props.column.saveTitle(newTitle);
        this.setState({
            isEditing: false,
        })
    }

    componentDidMount() {
        Sortable.create(this.listRef.current, {
            group: "carts",
            forceFallback: true,
            filter: `.${createFormStyles.CreateForm}`,
            ghostClass: cartStyles['Cart--ghost'],
            fallbackTolerance: 10,
            onStart: this.onStart,
            onEnd: this.onEnd,
            onAdd: this.onAdd,
            onRemove: this.onRemove,
            onUpdate: this.onUpdate,
            onChoose: this.onChooseCart,
            onUnchoose: this.onUnchoose,
        });
    }
    
    render(){
        const {title, items, isOpenCreatingCart, setIsOpenCreatingCart} = this.props.column;
        const {isEditing} = this.state;

        const targetClassNames = cn(styles.Column__header__target, {
            [styles['Column__header__target--hide']]: isEditing
        });

        return (
            <>
                <div className={styles.Column__header}>
                    <button className={targetClassNames} onClick={this.setEditing}/>
                    {isEditing ?
                        <CreateForm
                            onSubmit={this.saveColumnTitle}
                            defaultValue={title}
                            submitOnBlur={true}
                            disableActions={true}
                            headindStyle={true}
                        />
                    :
                        <h2>{title}</h2>
                    }
                </div>
                <div className={styles.Column__list} ref={this.listRef}>
                    {items && items.map(item =>
                        <Cart cart={item} key={item.id}/>
                    )}
                    {!!isOpenCreatingCart &&
                        <CreateForm
                            inputTag='textarea'
                            onSubmit={this.onCreateCartSubmit}
                            defaultValue={store.newCartTitle}
                            onCloseForm={() => setIsOpenCreatingCart(false)}
                            submitBtnText='Добавить карточку'
                            placeholder='Введите название карточки'
                        />
                    }
                </div>
                {!isOpenCreatingCart &&
                    <div className={styles.Column__footer}>
                        <Button
                            style={{padding: '12px'}}
                            icon={<IconPlus />}
                            size='big'
                            cover
                            text={'Добавить еще одну карточку'}
                            onClick={() => setIsOpenCreatingCart(true)}
                        />
                    </div>
                }
            </>
        )
    }
}

export default Column;