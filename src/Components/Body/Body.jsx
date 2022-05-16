import React from 'react'
import { useState , useRef } from 'react';
import ResumeWriter from '../ResumeWriter/ResumeWriter'
import styles from './Body.module.css'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Resume from '../Resume/Resume';
import ReactToPrint from 'react-to-print';


function Body() {
  const sections = {
    personalProfile: "Personal Profile",
    education: "Education",
    skils: "Skils",
    project: " Mini Project",
  };
   const ResumeRef = useRef()

  const [resumeInformation, setResumeInformation] = useState({
    [sections.personalProfile]: {
      id: sections.personalProfile,
      sectionTitle: sections.personalProfile,
      detail: {},
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.skils]: {
      id: sections.skils,
      sectionTitle: sections.skils,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
  });

  return (

    <div className={styles.container}>
      <p className={styles.heading}>Resume builder</p>
      <div className={styles.btn}>
        <ReactToPrint 
        trigger={() => {
          return  <button>Download <ArrowDownwardIcon /> </button>
        }}
        content={() => ResumeRef.current}
      />
        {/* <button>Download <ArrowDownwardIcon /> </button> */}
      </div>
      <div className={styles.main}>
        <ResumeWriter sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />
        <Resume
        ref={ResumeRef} 
        sections ={sections}
        information = {resumeInformation}
        />
      </div>
    </div>
  )
}

export default Body