export default function Address({ value, onChange }) {
  const set = (k,v)=>onChange({ ...value, [k]: v })
  return (
    <div>
      <div className="mb-2 text-sm font-medium">Address</div>
      <div className="space-y-3">
        <input
          className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="Street" value={value.street} onChange={e=>set('street', e.target.value)}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="City" value={value.city} onChange={e=>set('city', e.target.value)}
          />
          <input
            className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="State" value={value.state} onChange={e=>set('state', e.target.value)}
          />
        </div>
        <input
          className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="Zip" value={value.zip} onChange={e=>set('zip', e.target.value)}
        />
      </div>
    </div>
  )
}
