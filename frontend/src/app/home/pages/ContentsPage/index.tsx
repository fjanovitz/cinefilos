import { Link } from "react-router-dom";
import ContentListView from "../../components/ContentListView/ContentCardList";
import styles from "./index.module.css";
import MainButton from "../../components/MainButton/MainButton";

const ContentsPage = ({ content_type }) => {
	return (
		<section>
			<div></div>
			<Link
				to={{ pathname: `/contents/${content_type}/create_content` }}
				state={{ content_type: content_type }}
				style={{ textDecoration: "none" }}
			>
				<MainButton	data-cy="Adicionar Conteúdo" text={"Adicionar conteúdo"}/>
						
			</Link>
			<ContentListView content_type={content_type} />
		</section>
	);
};

export default ContentsPage;
