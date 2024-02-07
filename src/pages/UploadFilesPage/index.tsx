import s from './index.module.scss';
import {useEffect, useMemo, useRef, useState} from "react";
import {FileImporter} from "sass";
import {baseUrl} from "../../common/config";
import classNames from "classnames";
import {Button} from "../../ui/Button";
import {useNavigate} from "react-router-dom";
import Skeleton from "../../ui/Skeleton";

export const UploadFilesPage = () => {
    const navigate = useNavigate();
    const ref = useRef<any>(null);
    const [dragActive, setDragActive] = useState(false);;
    const [fileName, setFileName] = useState<null | string>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const formData: any = new FormData();

    useMemo(() => {
        if (ref.current?.files.length) {
            // formData.append("file", ref.current?.files[0])
        }
    }, [ref])

    const handleDrag = function(e:any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function(e:any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    const handleChange = function(e:any) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    function handleFile(files:any) {
        setSuccess(false)
        setFileName(files[0].name)
    }

    const onButtonClick = () => {
        ref.current.click();
    };

    const onClickNextButtonHandler = () => {
        navigate('/success');
    }
    const onClickUploadImageBtnHandler = async (e: any) => {
        setLoading(true)
        if (ref.current?.files.length) {
            formData.delete('file')
        }
        formData.append("file", ref.current?.files[0])

        const response = await fetch(`${baseUrl}/upload`, {
            method: "POST",
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData
        }).then((res) => {
            return res
        }).then((data) => {
            if (data.ok) {
                setSuccess(true)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className={s.uploadPage}>
            { isLoading && <Skeleton/> }
            <h1 className={classNames(s.title)}>Приложить файлы</h1>

            <div className={s.main}>
                { success && <span className={s.successMessage}>Файлы успешно загружены!</span> }
                <form className={s.formFileUpload} id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                    <input className={s.inputFileUpload} ref={ref} type="file" id="input-file-upload" onChange={handleChange} accept={"image/png, image/jpeg, .txt, .gif, .pdf, .xlsx"}/>
                    <label className={classNames(s.labelFileUpload, dragActive && s.active)} id="label-file-upload" htmlFor="input-file-upload">
                        <div>
                            <p>Drag and drop your file here or</p>
                            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
                            <p>{fileName}</p>
                        </div>
                    </label>
                    { dragActive && <div className={s.dragFileELement} id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
                </form>
                <button className={s.uploadButton} onClick={onClickUploadImageBtnHandler}>Загрузить файл</button>
            </div>
            <div>
                <Button onClick={onClickNextButtonHandler}>Далее</Button>
            </div>
        </div>
    );
};
