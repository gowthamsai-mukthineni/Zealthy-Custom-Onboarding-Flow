export default function Birthdate({ value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">Birthdate</label>
      <input
        type="date"
        className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
