import React from 'react'
import s from './index.module.scss'
import classNames from "classnames";

export default function Skeleton ({style}: any) {

    return (
        <div className={classNames(s.Skeleton)} style={style} onClick={e=>e.stopPropagation()}/>
    )
}
