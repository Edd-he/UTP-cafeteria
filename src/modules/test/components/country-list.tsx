import { getCountries } from '../actions/action'

export default async function CountryList() {
  const { countries, error } = await getCountries()

  return (
    <>
      <ul className="list-disc pl-6 max-h-80 overflow-y-scroll">
        {countries.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
      {error && <div className="text-red-600">{error}</div>}
    </>
  )
}
