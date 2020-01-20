import React from 'react';

export const SvgSprite = () => { // по хорошему генерировать их на ходу, а не вставлять скопом
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" style={{position: 'absolute', width: 0, height: 0}} id="__SVG_SPRITE_NODE__">
            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" id="plus">
                <path fillRule="evenodd" d="M14.1412 6.64122H8.35878V0.858779C8.35878 0.400763 7.95802 0 7.5 0C7.04198 0 6.64122 0.400763 6.64122 0.858779V6.64122H0.858779C0.400763 6.64122 0 7.04198 0 7.5C0 7.95801 0.400763 8.35878 0.858779 8.35878H6.64122V14.1412C6.64122 14.5992 7.04198 15 7.5 15C7.95802 15 8.35878 14.5992 8.35878 14.1412V8.35878H14.1412C14.5992 8.35878 15 7.95801 15 7.5C15 7.04198 14.5992 6.64122 14.1412 6.64122Z" fill="currentColor"/>
            </symbol>
            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" id="close">
                <path fillRule="evenodd" d="M7.5 6.71875L14.2188 0L15 0.78125L8.28125 7.5L15 14.2188L14.2188 15L7.5 8.28125L0.78125 15L0 14.2188L6.71875 7.5L0 0.78125L0.78125 0L7.5 6.71875Z" fill="currentColor"/>
            </symbol>
        </svg>
    )
}

const genIcon = (id, {width = 15, height = 15}) => {
    return <svg viewBox="0 0 15 15" width={width} height={height} style={{display: 'block'}}><use xlinkHref={`#${id}`} style={{fill: 'currentcolor'}}></use></svg>;
}

export const IconPlus = props => genIcon('plus', props);
export const IconClose = props => genIcon('close', props);