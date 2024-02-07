import s from './index.module.scss';
import {ReactNode} from "react";
import classNames from "classnames";
import Skeleton from "../Skeleton";

export const Button = ({
    children,
    onClick,
    disabled,
    isLoading,
    mods
} : {
    children: ReactNode
    onClick: () => void
    disabled?: boolean
    isLoading?: boolean
    mods?: "grey"
}) => {
    const onClickHandler = (e: any) => {
        e.preventDefault()
        onClick()
    }

    return (
        <div className={classNames(s.wrapper, mods ? s[mods] : "")}>
            {isLoading && <Skeleton/>}
            <button disabled={disabled} className={classNames(s.button)} onClick={onClickHandler}>{children}</button>
        </div>
    );
};
