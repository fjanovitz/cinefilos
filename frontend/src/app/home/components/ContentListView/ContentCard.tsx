import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./ContentCard.module.css";

type ContentCardProps = {
	content: {
		id: string;
		title: string;
		banner: string;
		content_type: string;
		synopsis: string;
		gender: string;
		release_year: number;
		rating: number;
		duration: number;
		director: string;
	};
};

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className={styles.outerContainer}>
			<Link
				to={`/contents/${content.content_type}/${content.title}`}
				key={content.id}
				className={styles.link}
			>
				<Card
					className={styles.card}
					onMouseEnter={() => setIsHovered(true)} 
					onMouseLeave={() => setIsHovered(false)} 
				>
					<Card.Img
						variant="top"
						src={content.banner}
						className={styles.cardImg}
					/>

					{isHovered && (
						<div className={styles.titlePopup}>{content.title}</div>
					)}
				</Card>
			</Link>
			{isHovered && (
				<div className={styles.optionsButton} onClick={(event) => {
					console.log('testando isso aqui');
				}}></div>
			)}
		</div>
	);
};

export default ContentCard;
