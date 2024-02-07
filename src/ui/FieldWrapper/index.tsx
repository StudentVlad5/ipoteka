import s from './index.module.scss';
import {ReactNode} from "react";
import classNames from "classnames";

export const FieldWrapper = ({
    children,
    classname
}: {
    children: ReactNode,
    classname?: string
}) => {
    return (
        <div className={classNames(s.fieldWrapper, classname && classname)}>
            {children}
        </div>
    );
};
