import { Link } from "react-router-dom";
import ContentListView from "../../components/ContentListView/ContentCardList";
import styles from "./index.module.css";
import MainButton from "../../components/MainButton/MainButton";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const ContentsPage = ({ content_type }) => {
	const { user, saveUser } = useContext(UserContext);
	return (
		<section>
			<div></div>
			<Link
				className={styles.linkCont}
				to={{ pathname: `/contents/${content_type}/create_content` }}
				state={{ content_type: content_type }}
				style={{ textDecoration: "none" }}
			>
				{(user?.username === "admin") && (
					<MainButton
						data-cy="Adicionar Conteúdo"
						text={"Adicionar conteúdo"}
					/>
				)}
			</Link>
			<ContentListView content_type={content_type} button_above={(user?.username === "admin")} />
		</section>
	);
};

export default ContentsPage;
