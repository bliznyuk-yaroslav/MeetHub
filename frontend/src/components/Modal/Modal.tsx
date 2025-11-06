import styles from './Modal.module.scss'
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
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && <div className={styles.header}>{title}</div>}
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          {footer}
        </div>
      </div>
    </div>
  )
}
