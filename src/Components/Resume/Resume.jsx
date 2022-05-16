import React, { forwardRef } from 'react'
import { useState, useEffect } from 'react';
import styles from "./Resume.module.css"

const Resume= forwardRef((props,ref)=> {
    const information = props.information;
    const sections = props.sections;

    const [columns, setColumns] = useState([[], []]);


    const info = {
        skils: information[sections.skils],
        project: information[sections.project],
        education: information[sections.education],
        personalProfile: information[sections.personalProfile]
    }

    // console.log(info.personalProfile.detail);
    // console.log(info.skils);
    // console.log(info.education.details);
    // console.log(info.project);


    const sectionDiv = {
        [sections.skils]: (
            <div key={"skils"}  className={styles.section} >
                <div className={styles.sectionTitle}>{info.skils.sectionTitle}</div>
                <div className={styles.content}>
                    {info.skils?.details?.map((item) => (
                        <div className={styles.item} key={item.title}>
                            {item.title ? (
                                <p className={styles.title}>{item.title}</p>
                            ) : (
                                <span />
                            )}
                            {item.skilName ? (
                                <p className={styles.subTitle}>{item.skilName}</p>
                            ) : (
                                <span />
                            )}
                            {item.points?.length > 0 ? (
                                <ul className={styles.points}>
                                    {item.points?.map((elem, index) => (
                                        <li className={styles.point} key={elem + index}>
                                            {elem}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [sections.project]: (
            <div key={"project"}className={styles.section} >
                <div className={styles.sectionTitle}>{info.project.sectionTitle}</div>
                <div className={styles.content}>
                    {info.project?.details?.map((item) => (
                        <div className={styles.item}>
                            {item.title ? (
                                <p className={styles.title}>{item.title}</p>) : ( <span />)}
                            {item.techStack ? (
                                <p className={styles.techStac}>{item.techStack} </p> ) : ( <span />
 )}
                            {item.points?.length > 0 ? (
                                <ul className={styles.points}>
                                    {item.points?.map((elem, index) => (
                                        <li className={styles.point} key={elem + index}>
                                            {elem}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [sections.education]: (
            <div key={"education"} className={styles.section} >
                <div className={styles.sectionTitle}>
                    {info.education?.sectionTitle}
                </div>
                <div className={styles.content}>
                    {info.education?.details?.map((item) => (
                        <div className={styles.item}>
                            {item.title ? (
                                <p className={styles.title}>{item.title}</p>
                            ) : (
                                <span />
                            )}
                            {item.college ? (
                                <p className={styles.subTitle}>{item.college}</p>
                            ) : (
                                <span />
                            )}
                            {item.percentage ? (
                                <p className={styles.subTitle}>{item.percentage}</p>
                            ) : (
                                <span/>
                            )}
                            {item.startDate && item.endDate ? (
                                <div className={styles.date}>
                                    {item.startDate} -
                      {item.endDate}
                                </div>
                            ) : (
                            <span/>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
    };



    useEffect(() => {
        setColumns([
            [sections.education,sections.project ,sections.skils,],
        ]);
    }, []);


    return (
        <div ref={ref}>
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.heading}>{info.personalProfile?.detail?.name}</p>
                <p className={styles.subHeading}>{info.personalProfile?.detail?.title} </p>

                <div className={styles.links}>
                    <p className={styles.link}>Email:-{info.personalProfile?.detail?.email}</p>
                    <p className={styles.link}>Phone:-{info.personalProfile?.detail?.phone}</p>
                </div>
            </div>
            <div className=''>
                <div className={styles.col1}>
                    {columns[0].map((item) => sectionDiv[item])}
                </div>
                {/* <div className={styles.col2}>
                    {columns[1].map((item) => sectionDiv[item])}
                </div> */}
            </div>
        </div>
        </div>
    )
});

export default Resume