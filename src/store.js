import { observable, action } from "mobx"
import arrayMove from 'array-move';
import {randomInteger} from './utils';

let id = 0;

class Root {

    draggingColumn = null;

    @observable newCartTitle = ''; // глобавльный заголовок новой карточки, чтоб синхронизировать между колонками в формах
    @observable columns = ['План', 'Оценка', 'Деплой'].map(title => new Column(title, this, 20)); //колонки для примера

    @action
    setNewCartTitle = (title) => {
        this.newCartTitle = title;
    }

    @action
    moveColumns = (column, newIndex) => {
        this.columns = arrayMove(this.columns, this.columns.findIndex(el => el === column), newIndex);
    };

    @action
    addColumn = title => {
        this.columns.push(new Column(title, this));
    };
    @action
    addCartToColumn = (title, columnId) => {
        if (title) { // не добавляем пустые ячейки
            const targetColumn = this.columns.find(({id}) => id === columnId);
            targetColumn.items.push(new Cart(title));
            this.newCartTitle = '';
            // стучим в апи
        }
    };

    @action
    closeAllCreatingCartForms = () => {
        this.columns.forEach(column => column.setIsOpenCreatingCart(false));
    }
}

class AbstractItem {
    id = id++;
    @observable title;

    constructor(title) {
        this.title = title.trim();
    }

    @action
    saveTitle = title => {
        const t = title.trim();
        if (t && t !== this.title) { // чекаем что новый заголовок не пустой и другой
            this.title = t;
            // стучим в апи
        }
    }
}

class Column extends AbstractItem {

    @observable isOpenCreatingCart = false;
    @observable items = [];
    constructor(title, rootStore, lorems = 0) {
        super(title);
        this.rootStore = rootStore;
        if (lorems) { // добавляем фальшивые таски для примера
            const count = randomInteger(2, lorems);
            fetch(`https://fish-text.ru/get?type=title&number=${count}`) // тут просто для примера данных грузу рыба-заголовки
                .then(resp => resp.json())
                .then(({text}) => {
                    const titles = text.split('\\n\\n');
                    titles.pop();
                    this.items = titles.map(title => new Cart(title));
                })
        } 
    };

    @action 
    setIsOpenCreatingCart = state => {
        if (state) {
            this.rootStore.closeAllCreatingCartForms();
        }
        this.isOpenCreatingCart = state;
    }

    @action
    moveCart = (cart, newIndex) => {
        this.items = arrayMove(this.items, this.items.findIndex(el => el === cart), newIndex);
    };

    @action
    addCart = (index, cart) => {
        this.items.splice(index, 0, cart);
    }

    @action
    removeCart = index => {
        this.items.splice(index, 1);
    }
}

class Cart extends AbstractItem {
    @observable selected = false;
}

export const store = new Root();
