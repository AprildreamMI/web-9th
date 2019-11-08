
import styles from './index.css';

export default function(props) {
  return (
    <div className={styles.normal2}>
      <h1>Page layout</h1>
      { props.children }
    </div>
  );
}
