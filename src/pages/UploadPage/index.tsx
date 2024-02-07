import s from './index.module.scss';
import {useEffect, useMemo, useRef, useState} from "react";
import {FileImporter} from "sass";
import {baseUrl} from "../../common/config";
import classNames from "classnames";
import {Button} from "../../ui/Button";
import {useNavigate} from "react-router-dom";
import Skeleton from "../../ui/Skeleton";
import {FieldWrapper} from "../../ui/FieldWrapper";
import {useActions, useAppSelector, useThunks} from "../../helpers/reduxHook";
import {AnswerActions, AnswerState} from "../../store/reducers/answer.reducer";
import { FaAsterisk } from "react-icons/fa6";
import { transform } from 'typescript';

export const UploadPage = () => {
    const { answerList } = useAppSelector(AnswerState);
    const { setAnswerListAction, setAnswerIsLoadingAction} = useActions(AnswerActions);

    const navigate = useNavigate();
    const passportRef = useRef<any>(null);
    const snilsRef = useRef<any>(null);
    const ndflRef = useRef<any>(null);
    const employmentHistoryRef = useRef<any>(null);
    const ReferenceBankRef = useRef<any>(null);
    const extractRef = useRef<any>(null);
    const otherRef = useRef<any>(null);
    const anketRef = useRef<any>(null);

    const [passportName, setPassportName] = useState('');
    const [snilsName, setSnilsName] = useState('');
    const [ndflName, setNdflName] = useState('');
    const [employmentHistoryName, setEmploymentHistoryName] = useState('');
    const [ReferenceBankName, setReferenceBankName] = useState('');
    const [extractName, setExtractName] = useState('');
    const [otherName, setOtherName] = useState('');
    const [anketName, setAnketName] = useState('');

    const [success, setSuccess] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isLoadingDownloadAnket, setIsLoadingDownloadAnket ] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);

    const onClickUploadBtnHandler = async () => {
        setLoading(true)

        const refs = [
            passportRef,
            snilsRef,
            ndflRef,
            employmentHistoryRef,
            ReferenceBankRef,
            extractRef,
            otherRef,
            anketRef
        ]

        await Promise.all(refs.map(async ref => {
            /*const resp = await fetch(url);
            return resp.text();*/
            if (ref.current.files.length) {
                const formData: any = new FormData();
                formData.append("file", ref.current?.files[0])
                await fetch(`${baseUrl}/upload`, {
                    method: "POST",
                    headers: {
                        // "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: formData
                })
            }
        })).then(res => {
            setSuccess(true)
            setLoading(false)
        })

        // navigate('/success')
    }

    const onClickDownloadAnket = async () => {
        setIsLoadingDownloadAnket(true)
        const anketId = localStorage.getItem('id')
        await fetch(`${baseUrl}/getpdf?identifier=${anketId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/pdf',
            },
        }).then(data => {
            if (data.status === 200) return data.blob()
            else throw Error()
        }).then(blobData => {
            // Создаем ссылку, присваеваем ей URL и имитируем нажатие
            const urlCreator = window.URL || window.webkitURL;

            let link = document.createElement('a');
            link.href = urlCreator.createObjectURL(blobData)
            link.setAttribute(
                'download',
                `${anketId}.pdf`,
            );
            link.click();

            // Удаляем ссылку на объект, для очистки памяти
            URL.revokeObjectURL(link.href);
            setIsLoadingDownloadAnket(false)
        })
    }

    const onClickNextBtnHandler = () => {
        navigate('/success')
    }

    const onChangeHandler = async (e: any, setName: any, name: string) => {
        const params = {
            // identifier: localStorage.getItem('id')
        }
        // @ts-ignore
        const urlParams = new URLSearchParams(params).toString()
        if (e.target.files) {
            setName(e.target.files[0].name)

            const formData: any = new FormData();
            formData.append("file", e.target.files[0])
            formData.append("identifier", localStorage.getItem('id'))
            formData.append("type", name)
            const response = await fetch(`${baseUrl}/upload?${urlParams}`, {
                method: "POST",
                headers: {
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData
            })
            const data = await response.json()
            e.target.parentNode.parentNode.querySelector('#error').classList.remove(s.active)

            if (!data.error) {

            } else {
                e.target.parentNode.parentNode.querySelector('#error').classList.add(s.active)
            }
            setAnswerIsLoadingAction(true)
            await fetch(`${baseUrl}/read?identifier=${localStorage.getItem('id')}`, {
                method: "POST"
            }).then(res => res).then( async res => {
                const response = await res.json()
                if (!response.error) {
                    setAnswerListAction(response.normal)
                }
            }).finally(() => {
                setAnswerIsLoadingAction(false)
            })
        }
    }

    const onClickPrevBtnHandler = () => {
        navigate('/additional-information')
    }

    return (
        <div className={s.uploadPage}>
            { isLoading && <Skeleton/> }
            <div className={s.mainContent}>
                <h1 className={classNames(`${s.title} contentTitle`)}>Приложить файлы</h1>

                <div className={`${s.main} contentMain`}>
                    <FieldWrapper classname={s.downloadWrapper}>
                        {isLoadingDownloadAnket && <Skeleton/>}
                        <button className={s.downloadBtn} onClick={onClickDownloadAnket}>Скачать анкету</button>
                    </FieldWrapper>

                    <FieldWrapper classname={s.wrapper}>
                        <p className={s.fileTitle}>Паспорт
                        {(answerList.uploads.passport  !== "" && answerList.uploads.passport  !== undefined && answerList.uploads.passport !== null) ? <FaAsterisk style={{fill:'green', width: "15px", height:"15px", transform:"translateY(-10px)"}}/> : <FaAsterisk style={{fill:'grey', width: "15px", height:"15px", transform:"translateY(-10px)"}}/>}
                        </p>
                        <div className={classNames(s.fileUpload, passportName && s.active)}>
                            {((answerList && answerList.uploads.passport) || passportName) && <span className={s.successFile}>Файл загружен</span>}
                            <span>{passportName ? passportName : "ОБЗОР"}</span>
                            <input type="file"
                                   name="FileAttachment"
                                   id="FileAttachment"
                                   ref={passportRef}
                                   accept={'image/png, image/jpeg'}
                                   className={classNames(s.upload)} onChange={(e) => onChangeHandler(e, setPassportName, 'passport')}/>
                        </div>
                        <span id={"error"} className={s.errorMessage}>Не удалось загрузить файл</span>
                    </FieldWrapper>

                    <FieldWrapper classname={s.wrapper}>
                        <p className={s.fileTitle}>СНИЛС
                        {(answerList.uploads.snils  !== "" && answerList.uploads.snils  !== undefined && answerList.uploads.snils !== null) ? <FaAsterisk style={{fill:'green', width: "15px", height:"15px", transform:"translateY(-10px)"}}/> : <FaAsterisk style={{fill:'grey', width: "15px", height:"15px", transform:"translateY(-10px)"}}/>}
                        </p>
                        <div className={classNames(s.fileUpload, snilsName && s.active)}>
                            {((answerList && answerList.uploads.snils) || snilsName) && <span className={s.successFile}>Файл загружен</span>}
                            <span>{snilsName ? snilsName : "ОБЗОР"}</span>
                            <input type="file"
                                   name="FileAttachment"
                                   id="FileAttachment"
                                   ref={snilsRef}
                                   accept={'image/png, image/jpeg'}
                                   className={classNames(s.upload)} onChange={(e) => onChangeHandler(e, setSnilsName, 'snils')}/>
                        </div>
                        <span id={"error"} className={s.errorMessage}>Не удалось загрузить файл</span>
                    </FieldWrapper>

                    <FieldWrapper classname={s.wrapper}>
                        <p className={s.fileTitle}>2 НДФЛ</p>
                        <div className={classNames(s.fileUpload, ndflName && s.active)}>
                            {((answerList && answerList.uploads.ndfl) || ndflName) && <span className={s.successFile}>Файл загружен</span>}
                            <span>{ndflName ? ndflName : "ОБЗОР"}</span>
                            <input type="file"
                                   name="FileAttachment"
                                   id="FileAttachment"
                                   ref={ndflRef}
                                   accept={'image/png, image/jpeg'}
                                   className={classNames(s.upload)} onChange={(e) => onChangeHandler(e, setNdflName, 'ndfl')}/>
                        </div>
                        <span id={"error"} className={s.errorMessage}>Не удалось загрузить файл</span>
                    </FieldWrapper>

                    <FieldWrapper classname={s.wrapper}>
                        <p className={s.fileTitle}>Трудовая Книжка</p>
                        <div className={classNames(s.fileUpload, employmentHistoryName && s.active)}>
                            {((answerList && answerList.uploads.employmentHistory) || employmentHistoryName) && <span className={s.successFile}>Файл загружен</span>}
                            <span>{employmentHistoryName ? employmentHistoryName : "ОБЗОР"}</span>
                            <input type="file"
                                   name="FileAttachment"
                                   id="FileAttachment"
                                   ref={employmentHistoryRef}
                                   accept={'image/png, image/jpeg'}
                                   className={classNames(s.upload)} onChange={(e) => onChangeHandler(e, setEmploymentHistoryName, 'employmentHistory')}/>
                        </div>
                        <span id={"error"} className={s.errorMessage}>Не удалось загрузить файл</span>
                    </FieldWrapper>

                    <FieldWrapper classname={s.wrapper}>
                        <p className={s.fileTitle}>Справка по форме банка</p>
                        <div className={classNames(s.fileUpload, ReferenceBankName && s.active)}>
                            {((answerList && answerList.uploads.referenceBank) || ReferenceBankName) && <span className={s.successFile}>Файл загружен</span>}
                            <span>{ReferenceBankName ? ReferenceBankName : "ОБЗОР"}</span>
                            <input type="file"
                                   name="FileAttachment"
                                   id="FileAttachment"
                                   ref={ReferenceBankRef}
                                   accept={'image/png, image/jpeg'}
                                   className={classNames(s.upload)} onChange={(e) => onChangeHandler(e, setReferenceBankName, 'referenceBank')}/>
                        </div>
                        <span id={"error"} className={s.errorMessage}>Не удалось загрузить файл</span>
                    </FieldWrapper>

                    <FieldWrapper classname={s.wrapper}>
                        <p className={s.fileTitle}>Выписка по счету</p>
                        <div className={classNames(s.fileUpload, extractName && s.active)}>
                            {((answerList && answerList.uploads.extractName) || extractName) && <span className={s.successFile}>Файл загружен</span>}
                            <span>{extractName ? extractName : "ОБЗОР"}</span>
                            <input type="file"
                                   name="FileAttachment"
                                   id="FileAttachment"
                                   ref={extractRef}
                                   accept={'image/png, image/jpeg'}
                                   className={classNames(s.upload)} onChange={(e) => onChangeHandler(e, setExtractName, 'extractName')}/>
                        </div>
                        <span id={"error"} className={s.errorMessage}>Не удалось загрузить файл</span>
                    </FieldWrapper>

                    <FieldWrapper classname={s.wrapper}>
                        <p className={s.fileTitle}>Прочие документы</p>
                        <div className={classNames(s.fileUpload, otherName && s.active)}>
                            {((answerList && answerList.uploads.otherName) || otherName) && <span className={s.successFile}>Файл загружен</span>}
                            <span>{otherName ? otherName : "ОБЗОР"}</span>
                            <input type="file"
                                   name="FileAttachment"
                                   id="FileAttachment"
                                   ref={otherRef}
                                   accept={'image/png, image/jpeg'}
                                   className={classNames(s.upload)} onChange={(e) => onChangeHandler(e, setOtherName, 'otherName')}/>
                        </div>
                        <span id={"error"} className={s.errorMessage}>Не удалось загрузить файл</span>
                    </FieldWrapper>

                    <FieldWrapper classname={s.wrapper}>
                        <p className={s.fileTitle}>Подписанная анкета
                        {(answerList.uploads.anket  !== "" && answerList.uploads.anket  !== undefined && answerList.uploads.anket !== null) ? <FaAsterisk style={{fill:'green', width: "15px", height:"15px", transform:"translateY(-10px)"}}/> : <FaAsterisk style={{fill:'grey', width: "15px", height:"15px", transform:"translateY(-10px)"}}/>}
                        </p>
                        <div className={classNames(s.fileUpload, anketName && s.active)}>
                            {((answerList && answerList.uploads.anket) || anketName) && <span className={s.successFile}>Файл загружен</span>}
                            <span>{anketName ? anketName : "ОБЗОР"}</span>
                            <input type="file"
                                   name="FileAttachment"
                                   id="FileAttachment"
                                   ref={anketRef}
                                   accept={'application/pdf, image/png, image/jpeg'}
                                   className={classNames(s.upload)} onChange={(e) => onChangeHandler(e, setAnketName, 'anket')}/>
                        </div>
                        <span id={"error"} className={s.errorMessage}>Не удалось загрузить файл</span>
                    </FieldWrapper>
                </div>
            </div>
            <div className={s.btns}>
                {/*<Button onClick={onClickUploadBtnHandler} isLoading={isLoading}>Отправить файлы</Button>*/}
                <Button onClick={onClickPrevBtnHandler} isLoading={isLoading} mods={"grey"}>Назад</Button>
                <Button onClick={onClickNextBtnHandler}
                        isLoading={isLoading}
                        disabled={ answerList &&
                            (
                                !answerList['actual-address'] ||
                                !answerList['additional-conditions'] ||
                                !answerList['additional-information'] ||
                                !answerList['assets-Vehicle-1'] ||
                                !answerList['assets-immovables-1'] ||
                                !answerList['client-finance'] ||
                                !answerList['client-info'] ||
                                !answerList['credit-info'] ||
                                !answerList['credit-target'] ||
                                !answerList['employment-info'] ||
                                !answerList['employment-status'] ||
                                !answerList['income-proof'] ||
                                !answerList['organization'] ||
                                !answerList['other'] ||
                                !answerList['region'] ||
                                !answerList['role'] ||
                                !answerList['social-status'] ||
                                !answerList['source-initial-payment'] ||
                                !answerList['upload-files'] ||
                                !answerList['work-experience']
                            )}
                >Завершить</Button>
            </div>
        </div>
    );
};
