import React from 'react'
import SectionHeaderStyles from '../../styles/Sectionheader.module.scss'

const SectionHeader = ({header}) => {
  return (
    <div className={SectionHeaderStyles["header"]}>
        <h1>{header}</h1>
        <div className={SectionHeaderStyles["header-line"]}></div>
      </div>
  )
}

export default SectionHeader