export default function HomePage() {
  return (
    <div className="container" style={{paddingBlock: 24}}>
      <h1 style={{marginBottom: 8}}>MeetHub</h1>
      <p style={{opacity:.9, maxWidth: 720}}>
        Simple meeting rooms booking app. Create rooms, invite colleagues with roles, and manage bookings with conflict checks.
      </p>
      <ul style={{marginTop: 16, opacity:.9}}>
        <li>• Create, edit, and delete rooms</li>
        <li>• Add members by email with Admin/User roles</li>
        <li>• Create, edit, and cancel bookings with time conflict validation</li>
      </ul>
      <div style={{display:'flex', gap:12, marginTop:16}}>
        <a href="/login" className="btn btn--primary">Get started</a>
        <a href="/rooms" className="btn">View my rooms</a>
      </div>
    </div>
  )
}
