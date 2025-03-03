import Layout from "@/components/reuse/layout";
import React from "react";
import { removeHtmlTags, sliceString } from "@/utils";
import ProverbCard from "@/components/reuse/proverb_card";

const Trending = () => {
	const proverbs = [
		{
			id: "1f516e63-7d1a-44d0-b1b8-21c3d1ab6c77",
			content: "Ọja lọja ki a to sanwo òrùn.",
			slug: "oja-loja-ki-a-1f516e63-7",
			ethnic: "Yoruba",
			categories: "Guiding,",
			dateCreated: "2023-08-24T21:02:36.723",
		},
		{
			id: "2d07d4f1-977c-42bf-8594-886d0d0a49f5",
			content: "A kì í tó ara ẹni lára.",
			slug: "a-ki-i-to-2d07d4f1-9",
			ethnic: "Yoruba",
			categories: "Encouragement,",
			dateCreated: "2023-08-24T21:02:34.215",
		},
		{
			id: "3b09ef13-8940-40aa-8eeb-77ff453ac1e2",
			content: "Kọ̀ sí ewé ká fi ń sọ igi ná.",
			slug: "kosi-ewe-ka-fi-3b09ef13-8",
			ethnic: "Yoruba",
			categories: "Observation,",
			dateCreated: "2022-03-07T14:14:24.009",
		},
		{
			id: "4c6a3d77-3dbd-4967-8147-c0a0d8bb33f2",
			content: "Àjànàkú kò lè pa ìkẹ̀kọ̀.",
			slug: "ajanaku-ko-le-pa-4c6a3d77-3",
			ethnic: "Yoruba",
			categories: "Warning,",
			dateCreated: "2022-03-07T14:13:56.383",
		},
		{
			id: "5df6a21e-336d-40b5-a6a3-2ff5f972384f",
			content: "Ọja lọja ki a to sanwo òrùn.",
			slug: "oja-loja-ki-a-5df6a21e-3",
			ethnic: "Yoruba",
			categories: "Guiding,",
			dateCreated: "2023-08-24T21:02:36.723",
		},
		{
			id: "6e7d75b7-7aef-4b1b-a020-62d944791191",
			content: "A kì í tó ara ẹni lára.",
			slug: "a-ki-i-to-6e7d75b7-7",
			ethnic: "Yoruba",
			categories: "Encouragement,",
			dateCreated: "2023-08-24T21:02:34.215",
		},
		{
			id: "7b34e5f8-1d41-431a-a7da-4d57a0a8d5f6",
			content: "Kọ̀ sí ewé ká fi ń sọ igi ná.",
			slug: "kosi-ewe-ka-fi-7b34e5f8-1",
			ethnic: "Yoruba",
			categories: "Observation,",
			dateCreated: "2022-03-07T14:14:24.009",
		},
		{
			id: "8a5bb608-6fb6-4d45-9df5-8c41e1a9c482",
			content: "Àjànàkú kò lè pa ìkẹ̀kọ̀.",
			slug: "ajanaku-ko-le-pa-8a5bb608-6",
			ethnic: "Yoruba",
			categories: "Warning,",
			dateCreated: "2022-03-07T14:13:56.383",
		},
		{
			id: "9c6c1db9-453b-49cc-8ef3-d9b4502cc8d7",
			content: "Ọja lọja ki a to sanwo òrùn.",
			slug: "oja-loja-ki-a-9c6c1db9-4",
			ethnic: "Yoruba",
			categories: "Guiding,",
			dateCreated: "2023-08-24T21:02:36.723",
		},
		{
			id: "10f6b4ca-3c24-472e-9e52-aa4c98207859",
			content: "A kì í tó ara ẹni lára.",
			slug: "a-ki-i-to-10f6b4ca-3",
			ethnic: "Yoruba",
			categories: "Encouragement,",
			dateCreated: "2023-08-24T21:02:34.215",
		},
		{
			id: "11e4aebd-8b0e-48db-b6a5-9f660d5f3f60",
			content: "Kọ̀ sí ewé ká fi ń sọ igi ná.",
			slug: "kosi-ewe-ka-fi-11e4aebd-8",
			ethnic: "Yoruba",
			categories: "Observation,",
			dateCreated: "2022-03-07T14:14:24.009",
		},
		{
			id: "12d7eacd-2732-4f88-8a0e-36b09c4875c8",
			content: "Àjànàkú kò lè pa ìkẹ̀kọ̀.",
			slug: "ajanaku-ko-le-pa-12d7eacd-2",
			ethnic: "Yoruba",
			categories: "Warning,",
			dateCreated: "2022-03-07T14:13:56.383",
		},
		{
			id: "13b2e3de-6922-41c3-91a2-f4b5d48ef82c",
			content: "Ọja lọja ki a to sanwo òrùn.",
			slug: "oja-loja-ki-a-13b2e3de-6",
			ethnic: "Yoruba",
			categories: "Guiding,",
			dateCreated: "2023-08-24T21:02:36.723",
		},
		{
			id: "14e1a3ef-d10e-4b88-98f9-8e5aa3bd481d",
			content: "A kì í tó ara ẹni lára.",
			slug: "a-ki-i-to-14e1a3ef-d",
			ethnic: "Yoruba",
			categories: "Encouragement,",
			dateCreated: "2023-08-24T21:02:34.215",
		},
		{
			id: "15c0a4ff-996a-43d7-9aa7-bf6fa4caaa0e",
			content: "Kọ̀ sí ewé ká fi ń sọ igi ná.",
			slug: "kosi-ewe-ka-fi-15c0a4ff-9",
			ethnic: "Yoruba",
			categories: "Observation,",
			dateCreated: "2022-03-07T14:14:24.009",
		},
		{
			id: "16a8a5ff-23bb-44e9-bf35-8d99a5c8899f",
			content: "Àjànàkú kò lè pa ìkẹ̀kọ̀.",
			slug: "ajanaku-ko-le-pa-16a8a5ff-2",
			ethnic: "Yoruba",
			categories: "Warning,",
			dateCreated: "2022-03-07T14:13:56.383",
		},
		{
			id: "17b6a6ff-ef1d-4e7a-8ba0-2b12a6c88d0c",
			content: "Ọja lọja ki a to sanwo òrùn.",
			slug: "oja-loja-ki-a-17b6a6ff-e",
			ethnic: "Yoruba",
			categories: "Guiding,",
			dateCreated: "2023-08-24T21:02:36.723",
		},
		{
			id: "18c7a7ff-7115-4a5c-ba8f-367a7c88a1c9",
			content: "A kì í tó ara ẹni lára.",
			slug: "a-ki-i-to-18c7a7ff-7",
			ethnic: "Yoruba",
			categories: "Encouragement,",
			dateCreated: "2023-08-24T21:02:34.215",
		},
		{
			id: "19d8a8ff-c2a1-48e8-85f0-48b1a8c88b2a",
			content: "Kọ̀ sí ewé ká fi ń sọ igi ná.",
			slug: "kosi-ewe-ka-fi-19d8a8ff-c",
			ethnic: "Yoruba",
			categories: "Observation,",
			dateCreated: "2022-03-07T14:14:24.009",
		},
		{
			id: "20e9a9ff-1e90-4d4b-875f-5d35a9c88c3b",
			content: "Àjànàkú kò lè pa ìkẹ̀kọ̀.",
			slug: "ajanaku-ko-le-pa-20e9a9ff-1",
			ethnic: "Yoruba",
			categories: "Warning,",
			dateCreated: "2022-03-07T14:13:56.383",
		},
	];

	const MAIN_CONTAINER_STYLE = {
		display: "flex",
		flexDirection: "column",
		marginBottom: "2rem",
		width: "100%",
		maxWidth: "1500px",
		margin: "0 auto",
		// alignItems: "center"
	};

	const CONTAINER_STYLE = {
		display: "flex",
		marginBottom: "2rem",
		width: "100%",
		justifyContent: "center",
		padding: "2rem",
	};

	const CONTENT_STYLE = {
		display: "flex",
		justifyContent: "center",
		gap: "2rem",
		// overflowX: "scroll",
		// overflow: "hidden",
		margin: "0 auto",
		flexWrap: "wrap",
	};
	return (
		<div style={MAIN_CONTAINER_STYLE}>
			<Layout pageTitle='Today Proverbs' pageLink='today_proverb'>
				<div style={CONTAINER_STYLE}>
					<div style={CONTENT_STYLE}>
						{proverbs.map((item) => {
							const withoutTags = removeHtmlTags(item.content);
							const slicedString = sliceString(withoutTags);
							if (proverbs && item.categories.length !== 0) {
								return (
									<>
										<ProverbCard
											proverb={slicedString}
											category={item.categories}
											ethnic={item.ethnic}
											key={item.id}
											slug={item.slug}
										/>
									</>
								);
							} else {
								return null; // or a fallback value
							}
						})}
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default Trending;
