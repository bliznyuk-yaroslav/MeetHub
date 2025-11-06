export default function Spinner() {
  return (
    <div style={{display:'grid', placeItems:'center', minHeight:'40vh'}}>
      <div style={{
        width: 36,
        height: 36,
        border: '3px solid rgba(255,255,255,0.2)',
        borderTopColor: '#3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`@keyframes spin { from { transform: rotate(0) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
