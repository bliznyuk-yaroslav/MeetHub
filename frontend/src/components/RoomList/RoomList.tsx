import RoomItem from '../RoomItem/RoomItem'
import styles from './RoomList.module.scss'
type Item = {
  id: number
  name: string
  description?: string | null
  role?: 'Admin' | 'User'
}

type Props = {
  items: Item[]
  onDelete: (id: number) => void
}

export default function RoomList({ items, onDelete }: Props) {
  return (
    <ul className={styles.list}>
      {items.map((r) => (
        <RoomItem key={r.id} id={r.id} name={r.name} description={r.description} role={r.role} onDelete={onDelete} />
      ))}
      {items.length === 0 && <li>No rooms yet.</li>}
    </ul>
  )
}
