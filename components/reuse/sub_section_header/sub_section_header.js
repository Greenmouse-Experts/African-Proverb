import React from "react";
import SectionHeaderStyles from "./Sectionheader.module.scss";
import Link from "next/link";

const SubSectionHeader = ({ header, link}) => {

	return (
		<div className={SectionHeaderStyles["container"]}>
			<div className={SectionHeaderStyles["header"]}>
				<h1>{header}</h1>
				<div className={SectionHeaderStyles["header-line"]}></div>
			</div>
			{link ? <Link href={link}>View all</Link> : null}
		</div>
	);
};

export default SubSectionHeader;
