import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./queries/getCountries";
import Loading from "./components/Loading";

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const countries = data.countries;

  return (
    <div>
      <ul>
        {countries.map((country: any) => (
          <li key={country.code}>
            {country.name} + {country.code}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
