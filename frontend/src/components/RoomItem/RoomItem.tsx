import styles from './RoomItem.module.scss'
import { useNavigate } from 'react-router-dom'

type Props = {
  id: number
  name: string
  description?: string | null
  role?: 'Admin' | 'User'
  onDelete?: (id: number) => void
}

export default function RoomItem({ id, name, description, role, onDelete }: Props) {
  const navigate = useNavigate()

  const goToDetails = () => navigate(`/rooms/${id}`)
  
  return (
    <li
      className={styles.item}
      onClick={goToDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') goToDetails() }}
    >
      <div className={styles.row}>
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          {description && <div className={styles.desc}>{description}</div>}
          {role && <div className={styles.role}>Role: {role}</div>}
        </div>
        {role === 'Admin' && onDelete && (
          <div className={styles.actions}>
            <button
              className={styles.deleteBtn}
              onClick={(e) => { e.stopPropagation(); onDelete(id) }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
