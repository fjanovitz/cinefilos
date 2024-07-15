import { Link } from "react-router-dom";
import ContentCard from "../../components/ContentListView/ContentCard";
import ContentListView from "../../components/ContentListView/ContentCardList";
import styles from "./index.module.css";


const ContentsPage = ({content_type}) => {
  return (
    <section>
      <Link to = {{pathname: `/contents/${content_type}/create_content`}} 
                  state = {{ content_type: content_type }} style={{ textDecoration: 'none' }}>
              <div className={styles.buttonCreateContentContainer}>
                  <button type="submit" className={styles.buttonCreateContent}>Adicione um conteúdo</button>
              </div>
      </Link>
      <ContentListView content_type = {content_type} />
    </section>
  );
};

export default ContentsPage;