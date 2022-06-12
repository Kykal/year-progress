import React from 'react';

//Custom components
import {
	Header,
	Main
} from './components';


//Main component content
const App = () => {

	const date = new Date();

	//Component render
	return (
		<>
			<Header	date={date}	/>
			<Main		date={date}	/>
		</>
	);
};


export default App; //Export main component
