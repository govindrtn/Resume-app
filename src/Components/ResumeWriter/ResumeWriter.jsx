import React, { useEffect } from 'react'
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import InputControl from '../InpurControl/InputControl';
import styles from "./ResumeWriter.module.css"

function ResumeWriter(props) {
    const sections = props.sections;
    const information = props.information;

    const [activeSectionKey, setActiveSectionKey] = useState(
        Object.keys(sections)[0]
    );
    const [activeInformation, setActiveInformation] = useState(
        information[sections[Object.keys(sections)[0]]]
    );
    console.log(activeInformation);
    const [activeDetailIndex, setActiveDetailIndex] = useState(0);
    const [sectionTitle, setSectionTitle] = useState(
        sections[Object.keys(sections)[0]]
    );
    const [values, setValues] = useState({
        name: activeInformation?.detail?.name || "",
        title: activeInformation?.detail?.title || "",
        phone: activeInformation?.detail?.phone || "",
        email: activeInformation?.detail?.email || "",
    });

    const handlePointUpdate = (value, index) => {
        const tempValues = { ...values };
        if (!Array.isArray(tempValues.points)) tempValues.points = [];
        tempValues.points[index] = value;
        setValues(tempValues);
    };



    const personalProfile = (
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl
                    label="Name"
                    placeholder="Enter your full name"
                    value={values.name}
                    onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value })) }
                />
                <InputControl
                    label="Title"
                    value={values.title}
                    placeholder="Enter your title eg. Frontend developer"
                    onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value })) }
                />
            </div>
            <div className={styles.row}>
                <InputControl
                    label="Email"
                    value={values.email}
                    placeholder="Enter your email"
                    onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
                />
                <InputControl
                    label="Enter phone"
                    value={values.phone}
                    placeholder="Enter your phone number"
                    onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
                />
            </div>
        </div>
    );
    const educationBody = (
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl
                    label="Title"
                    value={values.title}
                    placeholder="Enter title eg. B-tech"
                    onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
                />
            </div>
            <InputControl
                label="College/School Name"
                value={values.college}
                placeholder="Enter name of your college/school"
                onChange={(event) => setValues((prev) => ({ ...prev, college: event.target.value }))}
            />
            <div>
                <InputControl
                    label="Percentage"
                    value={values.percentage}
                    placeholder="Enter your percentage"
                    onChange={(event) => setValues((prev) => ({ ...prev, percentage: event.target.value }))}
                />
            </div>
            <div className={styles.row}>
                <InputControl
                    label="Start Date"
                    type="date"
                    placeholder="Enter start date of this education"
                    value={values.startDate}
                    onChange={(event) => setValues((prev) => ({ ...prev, startDate: event.target.value }))}
                />
                <InputControl
                    label="End Date"
                    type="date"
                    placeholder="Enter end date of this education"
                    value={values.endDate}
                     onChange={(event) => setValues((prev) => ({ ...prev, endDate: event.target.value }))}
                />
            </div>
        </div>
    );


    const skilBody = (
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl
                    label="Title"
                    placeholder="Enter title"
                    value={values.title}
                    onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
                />
                <InputControl
                    label="Skil Name"
                    placeholder="Enter skil name"
                    value={values.skilName}
                    onChange={(event) => setValues((prev) => ({ ...prev, skilName: event.target.value }))}
                />
            </div>
            <div className={styles.column}>
                <label>Add skils</label>
                <InputControl
                    placeholder="Add skil 1"
                    value={values.points ? values.points[0] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 0)
                    }
                />
            </div>
        </div>
    );
    const projectBody = (
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl
                    label="Title"
                    value={values.title}
                    placeholder=" Enter Project title"
                    onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
                />
            </div>
            <InputControl
                label="Tech-Stack"
                value={values.techStack}
                placeholder="Enter tech Stack "
                onChange={(event) => setValues((prev) => ({ ...prev, techStack: event.target.value }))
                }
            />
            <div className={styles.column}>
                <label>Enter project description</label>
                <InputControl
                    placeholder="Project description"
                    value={values.points ? values.points[0] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 0)
                    }
                />
            </div>
        </div>
    );

    const generateBody = () => {
        switch (sections[activeSectionKey]) {
            case sections.personalProfile: return personalProfile;
            case sections.skils: return skilBody;
            case sections.project: return projectBody;
            case sections.education: return educationBody;
            default: return null;
        }
    };

    const handleSubmission = () => {
        switch (sections[activeSectionKey]) {
            case sections.personalProfile: {
                const tempDetail = {
                    name: values.name,
                    title: values.title,
                    email: values.email,
                    phone: values.phone,
                };
                props.setInformation((prev) => ({
                    ...prev,
                    [sections.personalProfile]: {
                        ...prev[sections.personalProfile],
                        detail: tempDetail,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.skils: {
                const tempDetail = {
                    title: values.title,
                    skilName: values.skilName,
                    points: values.points,
                };
                const tempDetails = [...information[sections.skils]?.details];
                tempDetails[activeDetailIndex] = tempDetail;
                props.setInformation((prev) => ({
                    ...prev,
                    [sections.skils]: {
                        ...prev[sections.skils],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.project: {
                const tempDetail = {
                    title: values.title,
                    techStack: values.techStack,
                    points: values.points,
                };
                const tempDetails = [...information[sections.project]?.details];
                tempDetails[activeDetailIndex] = tempDetail;
                props.setInformation((prev) => ({
                    ...prev,
                    [sections.project]: {
                        ...prev[sections.project],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.education: {
                const tempDetail = {
                    title: values.title,
                    college: values.college,
                    percentage: values.percentage,
                    startDate: values.startDate,
                    endDate: values.endDate,
                };
                const tempDetails = [...information[sections.education]?.details];
                tempDetails[activeDetailIndex] = tempDetail;

                props.setInformation((prev) => ({
                    ...prev,
                    [sections.education]: {
                        ...prev[sections.education],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
        }
    };

    const handleAddNew = () => {
        const details = activeInformation?.details;
        if (!details) return;
        const lastDetail = details.slice(-1)[0];
        if (!Object.keys(lastDetail).length) return;
        details?.push({});

        props.setInformation((prev) => ({
            ...prev,
            [sections[activeSectionKey]]: {
                ...information[sections[activeSectionKey]],
                details: details,
            },
        }));
        setActiveDetailIndex(details?.length - 1);
    };

    const handleDeleteDetail = (index) => {
        const details = activeInformation?.details
            ? [...activeInformation?.details]
            : "";
        if (!details) return;
        details.splice(index, 1);
        props.setInformation((prev) => ({
            ...prev,
            [sections[activeSectionKey]]: {
                ...information[sections[activeSectionKey]],
                details: details,
            },
        }));

        setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
    };

    useEffect(() => {
        const activeInfo = information[sections[activeSectionKey]];
        setActiveInformation(activeInfo);
        setSectionTitle(sections[activeSectionKey]);
        setActiveDetailIndex(0);
        setValues({
            name: activeInfo?.detail?.name || "",
            phone: activeInfo?.detail?.phone || "",
            email: activeInfo?.detail?.email || "",
            techStack: activeInfo?.details ? activeInfo.details[0]?.techStack || "" : "",
            percentage: activeInfo?.details ? activeInfo.details[0]?.percentage || "" : "",
            skilName: activeInfo?.details ? activeInfo.details[0]?.skilName || "" : "",
            college: activeInfo?.details ? activeInfo.details[0]?.college || "" : "",
            startDate: activeInfo?.details ? activeInfo.details[0]?.startDate || "" : "",
            endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || "" : "",
            points: activeInfo?.details ? activeInfo.details[0]?.points ? [...activeInfo.details[0]?.points] : "" : activeInfo?.points ? [...activeInfo.points] : "",
            title: activeInfo?.details ? activeInfo.details[0]?.title || "" : activeInfo?.detail?.title || "",
        });
    }, [activeSectionKey]);

    useEffect(() => {
        setActiveInformation(information[sections[activeSectionKey]]);
    }, [information]);

    useEffect(() => {
        const details = activeInformation?.details;
        if (!details) return;

        const activeInfo = information[sections[activeSectionKey]];
        setValues({
            techStack: activeInfo.details[activeDetailIndex]?.techStack || "",
            percentage: activeInfo.details[activeDetailIndex]?.percentage || "",
            startDate: activeInfo.details[activeDetailIndex]?.startDate || "",
            endDate: activeInfo.details[activeDetailIndex]?.endDate || "",
            points: activeInfo.details[activeDetailIndex]?.points || "",
            title: activeInfo.details[activeDetailIndex]?.title || "",
            college: activeInfo.details[activeDetailIndex]?.college || "",
        });
    }, [activeDetailIndex]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {Object.keys(sections)?.map((key) => (
                    <div
                        className={`${styles.section} ${activeSectionKey === key ? styles.active : ""
                            }`}
                        key={key}
                        onClick={() => setActiveSectionKey(key)}
                    >
                        {sections[key]}
                    </div>
                ))}
            </div>
            <div className={styles.body}>
                <InputControl
                    label="Title"
                    placeholder="Enter section title"
                    value={sectionTitle}
                    onChange={(event) => setSectionTitle(event.target.value)}
                />
                <div className={styles.chips}>
                    {activeInformation?.details
                        ? activeInformation?.details?.map((item, index) => (
                            <div
                                className={`${styles.chip} ${activeDetailIndex === index ? styles.active : ""
                                    }`}
                                key={item.title + index}
                                onClick={() => setActiveDetailIndex(index)}
                            >
                                <p>
                                    {sections[activeSectionKey]} {index + 1}
                                </p>
                                <CloseIcon
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleDeleteDetail(index);
                                    }}
                                />
                            </div>
                        ))
                        : ""}
                    {activeInformation?.details &&
                        activeInformation?.details?.length > 0 ? (
                        <div className={styles.new} onClick={handleAddNew}>
                            +New
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                {generateBody()}
                <button onClick={handleSubmission}>Save</button>
            </div>
        </div>
    );
}

export default ResumeWriter;