import s from './Modal.module.scss'
import type { PropsWithChildren, ReactNode } from 'react'

type Props = PropsWithChildren<{
  open: boolean
  title?: ReactNode
  onClose: () => void
  footer?: ReactNode
}>

export default function Modal({ open, title, onClose, footer, children }: Props) {
  if (!open) return null
  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        {title && <div className={s.header}>{title}</div>}
        <div className={s.body}>{children}</div>
        <div className={s.footer}>
          {footer}
        </div>
      </div>
    </div>
  )
}
