import { Link, router} from 'umi'
import styles from './index.css';

export default function(props) {
  const users = [
    {
      id: 1,
      name: 'tom'
    },
    {
      id: 2,
      name: 'Jerry'
    }
  ]
  return (
    <div className={styles.normal}>
      <h1>Page user</h1>
      <ul>
        {
          users.map(u => (
            <li key={u.id}>
              <Link to={`/user/${u.id}`}>{u.name}</Link>
            </li>
            // <li key={ u.id } onClick={ _ => router.push(`/user/${u.id}`) }>
            //   { u.name }
            // </li>
          ))
        }
      </ul>
      { props.children }
    </div>
  );
}
