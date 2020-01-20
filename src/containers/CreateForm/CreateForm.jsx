import React from 'react';
import autoSize from 'autosize';
import cn from 'classnames';
import Button from '../../components/Button/Button';
import {IconClose} from '../../icons';
import styles from './CreateForm.module.scss';

class CreateForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue || '',
        }
    }

    inputRef = React.createRef();
    formRef = React.createRef();

    onSubmit = e => {
        if (e) e.preventDefault();
        const {value} = this.state; 
        if (!value) { // не реагируем на сабмит, если пустое поле, и ставим фокус обратно
            const inputHtml = this.inputRef.current;
            inputHtml.focus();
            return;
        } else {
            this.setState({
                value: '',
            });
            this.props.onSubmit(value);
        }
    }
    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    } 
    onFocus = () => {
        document.addEventListener('keypress', this.handleKeypress);
    }
    onBlur = () => {
        document.removeEventListener('keypress', this.handleKeypress);
        if (this.props.submitOnBlur) {
            this.props.onSubmit(this.state.value);
        }
    }
    checkOutsideClick = e => {
        if (!this.formRef.current.contains(e.target)) {
            document.removeEventListener('click', this.checkOutsideClick);
        }
    }
    handleKeypress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.onSubmit();
        }
    }
    focusByInput = () => {
        const inputHtml = this.inputRef.current;
        autoSize(inputHtml);
        inputHtml.focus();
        inputHtml.setSelectionRange(inputHtml.value.length, inputHtml.value.length);
    }
    closeForm = () => {
        if (this.props.onCloseForm) {
            this.props.onCloseForm();
        }
    }
    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeypress);
    }
    componentDidMount() {
        this.focusByInput();
    }
    render() {
        const {value} = this.state;
        const {
            inputTag,
            submitBtnText = 'Добавить',
            placeholder,
            disableActions,
            headindStyle,
        } = this.props;
        const inputClassNames = cn(styles.Input, {
            [styles['Input--headingStyle']]: headindStyle,
        });
        return (
            <form onSubmit={this.onSubmit} className={styles.CreateForm} ref={this.formRef}>
                {React.createElement(
                    inputTag || 'input', 
                    {
                        ref: this.inputRef,
                        className: inputClassNames,
                        placeholder: placeholder,
                        value: value,
                        onChange: this.onChange,
                        onBlur: this.onBlur,
                        onFocus: this.onFocus,
                    }
                )}
                {!disableActions &&
                    <div className={styles.CreateForm__actions}>
                        <Button
                            type="submit"
                            text={submitBtnText}
                            level='success'
                        />
                        <Button
                            icon={<IconClose />}
                            onClick={this.closeForm}
                        />
                    </div>
                }
            </form>
        )
    }
}

export default CreateForm;