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
	},
	hasOptions?: boolean,
	category?: string,
	changeCategory?
};

const ContentCard: React.FC<ContentCardProps> = ({ content, hasOptions = false, category = "", changeCategory = (...args: any) => {} }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [showOverlay, setShowOverlay] = useState(false);

	return (
		<div
			className={styles.outerContainer}
			onMouseEnter={() => setIsHovered(true)} 
			onMouseLeave={() => {setIsHovered(false); setShowOverlay(false)}} 
		>
			{isHovered && hasOptions && (
				<div data-cy="options_button" className={styles.optionsButton} onClick={() => setShowOverlay(true)}>
					<div className={styles.dotButton}>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className={`${styles.overlay} ${(showOverlay ? styles.active : '')}`}>
						<button data-cy="assistidos_option" className={(category == "assistidos") ? styles.selectedButton : ''} onClick={() => changeCategory(content, "assistidos")}>Assistidos</button>
						<button data-cy="quero_assistir_option" className={(category == "quero_assistir") ? styles.selectedButton : ''} onClick={() => changeCategory(content, "quero_assistir")}>Quero Assistir</button>
						<button data-cy="abandonados_option" className={(category == "abandonados") ? styles.selectedButton : ''} onClick={() => changeCategory(content, "abandonados")}>Abandonados</button>
					</div>
				</div>
			)}
			<Link
				to={`/contents/${content.content_type}/${content.title}`}
				key={content.id}
				className={styles.link}
			>
				<Card
					data-cy={content.id}
					className={styles.card}
				>
					<Card.Img
						data-cy={`${content.title}`}
						variant="top"
						src={content.banner}
						className={styles.cardImg}
					/>

					{isHovered && (
						<div className={styles.titlePopup}>{content.title}</div>
					)}
				</Card>
			</Link>
		</div>
	);
};

export default ContentCard;
