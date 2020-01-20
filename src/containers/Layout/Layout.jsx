import React from 'react';
import cn from 'classnames';
import {observer} from 'mobx-react';
import styles from './Layout.module.scss';
import stylesColumn from '../../components/Column/Column.module.scss';
import Column from '../../components/Column/Column';
import Button from '../../components/Button/Button';
import Sortable from 'sortablejs';
import {store} from '../../store';
import CreateForm from '../CreateForm/CreateForm';
import {
    createCustoms,
    removeNode,
    insertNodeAt,
} from '../../utils';
import {SvgSprite, IconPlus} from '../../icons';

@observer
class Layout extends React.Component {

    state = {
        openCreating: false,
    }
    columnsWrapRef = React.createRef();

    setIsOpenCreating = state => {
        this.setState({
            openCreating: state,
        })
    }

    onUpdateSort = evt => {
        const customs = createCustoms(evt, store.columns);

        removeNode(customs.element);
        insertNodeAt(customs.parentElement, customs.element, customs.oldIndex);
        store.moveColumns(customs.item, customs.newIndex)
    }

    onCreateColumn = title => {
        store.addColumn(title);
        this.setState({
            openCreating: false,
        })
    }
    
    componentDidMount() {
 
        Sortable.create(this.columnsWrapRef.current, {
            handle: `.${stylesColumn.Column__header}`,
            forceFallback: true,
            ghostClass: stylesColumn.ghost,
            onUpdate: this.onUpdateSort,
            fallbackTolerance: 10,
            direction: 'horizontal',
        });
    }
    render() {
        const {openCreating} = this.state;

        const contentClassNames = cn(styles.Layout__column__content, {
            [styles['Layout__column__content--creating']]: openCreating,
        })

        return (
            <div className={styles.Layout} ref={this.columnsWrapRef}>
                {store.columns && store.columns.map(column =>
                    <div className={styles.Layout__column} key={column.id}>
                        <div className={styles.Layout__column__content}>
                            <Column column={column}/>
                        </div>
                    </div>
                )}
                <div className={`${styles.Layout__column} ${styles['Layout__column--dragIgnore']}`} data-draggable={false}>
                    <div className={contentClassNames}>
                        {openCreating ?
                            <CreateForm
                                onSubmit={this.onCreateColumn}
                                onCloseForm={() => this.setIsOpenCreating(false)}
                                submitBtnText='Добавить колонку'
                                placeholder='Введите название колонки'
                            />
                        :
                            <Button
                                style={{padding: '12px'}}
                                icon={<IconPlus />}
                                size='big'
                                cover
                                text={'Добавить еще одну колонку'}
                                onClick={() => this.setIsOpenCreating(true)}
                            />
                        }   
                    </div>
                </div>
                <SvgSprite />
            </div>
        )
    }
}

export default Layout;