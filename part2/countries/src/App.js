import React, {useState, useEffect} from "react";
import axios from "axios";

const Weather = ({capital}) => {
	const temperature = Math.round(Math.random() * 80 - 40);
	const wind_speed = Math.round(Math.random() * 40 * 1.61);
	const state = "sn";
	return (
		<div>
			<h4>Weather in {capital}</h4>
			<p><b>Temperature:</b> {temperature}°C</p>
			<p><b>Wind:</b> {wind_speed} km/h</p>
			<img
				height="35"
				src={`https://www.metaweather.com/static/img/weather/${state}.svg`}
				alt={`Weather state is Snow.`}
			/>
		</div>
	);
};

const ShowCountry = ({country}) => (
	<div>
		<h3>{country.name}</h3>
		<p>Capital: {country.capital}</p>
		<p>Population: {country.population}</p>
		<p>Languages:</p>
		<ul>
			{country.languages.map(lang =>
				<li key={lang.iso639_1}>{lang.name}</li>
			)}
		</ul>
		<img
			height="125"
			src={country.flag}
			alt={`Flag of ${country.name}`}
		/>
		<Weather capital={country.capital} />
	</div>
);

const ListCountries = ({countries, setSearch}) => {
	if (!countries) // empty
		return (
			<div>
				<p>Nothing found</p>
			</div>
		);
	else if (countries.length > 100)
		return (
			<div>
			</div>
		);
	else if (countries.length > 10)
		return (
			<div>
				<p>Too many results, please keep typing</p>
			</div>
		);
	else if (countries.length === 1) {
		return (
			<div>
				<ShowCountry country={countries[0]} />
			</div>
		);
	}
	else
		return (
			<div>
				<ul>
					{countries.map(country => (
						<li key={country.alpha2Code}>
							{country.name}
							<button
								key={country.alpha2Code}
								type="button"
								onClick={() => setSearch(country.name)}
							>
								Show
							</button>
						</li>
					))}
				</ul>
			</div>
		);
};

const Main = ({data}) => {
	const [search, setSearch] = useState('');
	const [shownCountries, setShownCountries] = useState(null);
	
	const performSearchByName = subName => {
		if (!subName)
			return data;
		let countries = []
		const lcSubName = subName.toLowerCase();
		for (let country of data) {
			if (country.name.toLowerCase().includes(lcSubName))
				countries.push(country);
		}
		return countries;
	}
	
	const applySearchChange = text => {
		setSearch(text);
		setShownCountries(performSearchByName(text));
	}
	
	const handleSearchChange = event =>
		applySearchChange(event.target.value);
	
	useEffect(() => {
		applySearchChange(search);
	}, [search])
	
	return (
		<div>
			<input
				value={search}
				placeholder="Find countries"
				onChange={handleSearchChange}
			/>
			<ListCountries
				countries={shownCountries}
				setSearch={setSearch}
			/>
		</div>
	);
}

const Loading = () => (
	<div>
		<p>Loading the app, please wait...</p>
	</div>
);

const App = () => {
	const [data, setData] = useState(null);
	
	useEffect(() => {
		axios
			.get("https://restcountries.eu/rest/v2/all")
			.then(({data}) => {
				setData(data)
			});
	}, []);
	
	if (data === null) // still loading
		return (<div><Loading /></div>)
	else return ( // loaded
		<div>
			<Main data={data} />
		</div>
	);
};

export default App;
