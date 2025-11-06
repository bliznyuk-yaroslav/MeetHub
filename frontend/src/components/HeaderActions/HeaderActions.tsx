import s from './HeaderActions.module.scss'
import Button from '@mui/material/Button'

type Props = { onOpenMember: () => void; onOpenEditRoom: () => void; onOpenCreate: () => void }
export default function HeaderActions({ onOpenMember, onOpenEditRoom, onOpenCreate }: Props) {
  return (
    <div className={s.wrap}>
      <h2 className={s.title}>Room details</h2>
      <div className={s.buttons}>
        <Button variant="outlined" onClick={onOpenMember}>Add member</Button>
        <Button variant="outlined" onClick={onOpenEditRoom}>Edit room</Button>
        <Button variant="contained" onClick={onOpenCreate}>New booking</Button>
      </div>
    </div>
  )
}
