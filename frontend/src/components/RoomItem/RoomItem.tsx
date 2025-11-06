import { Button } from '@mui/material'
import s from './RoomItem.module.scss'
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
      className={s.item}
      onClick={goToDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') goToDetails() }}
    >
      <div className={s.row}>
        <div className={s.info}>
          <div className={s.name}>{name}</div>
          {description && <div className={s.desc}>{description}</div>}
          {role && <div className={s.role}>Role: {role}</div>}
        </div>
        {role === 'Admin' && onDelete && (
          <div className={s.actions}>
            <Button
             className={s.deleteBtn}
             variant="outlined"
             color="error"
             aria-label="Delete room"
             onClick={(e) => { e.stopPropagation(); onDelete(id) }}>
                     Delete
            </Button>
          </div>
        )}
      </div>
    </li>
  )
}
