import React, { useState, useEffect } from 'react';


//Styled components
import style from 'styled-components';


const StyledMain = style.main`
	position: absolute;

	top: 0;

	height: 100vh;
	width: 100vw;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = style.div`
	display: block;

	text-align: center;

`;

const Progress = style.progress`
	width: 20em;
	height: 1em;

	border: none;
`;

const PercentageText = style.abbr`
	color: var(--blue);
	cursor: pointer;
`;


//Main component content
const Main = ({date}) => {
	
	const [ percentageCounter, setPercentageCounter ] = useState(0);

	//Once website loads, change title to actual percentage
	useEffect( () => {
		document.title = `Year progress - (${percentageInteger}%)`;
	}, []);


	const year = date.getYear(); //Get current year
	const yearDays = year % 4 === 0 ? 366 : 365 ; //Find out if this year is leap-year;
	const currentDay = date.getDate(); //Get current day of the month
	let totalDaysPassed = 0; //Totals days counter
	let percentage;

	//Adds up total days from previous months (except the current one)
	for( let i=0; i<date.getMonth(); i++ ) {
											//Year,  Month, Day
		const tempDate = new Date(`${year}, ${i+2}, 0`); //Defines a temporal date to get total days of the month. i = month position => 2 => January
		const daysInMonth = tempDate.getDate(); //Due temporal date day is 0, it takes the last day (28/29, 30 or 31).

		totalDaysPassed += daysInMonth; //Add up the total days of the month
	}

	//Add up the current day of the month 
	totalDaysPassed += currentDay;

	//Percentage of total days passed and totals days of year.
	percentage = (totalDaysPassed * 100) / yearDays;
	const percentageShort = percentage.toFixed(2);
	const percentageInteger = parseInt(percentage);

	//Change visual status of percentage
	const percentageDataHandler = () => {
		if( percentageCounter === 2 ){
			setPercentageCounter(0);
			return;
		}
		setPercentageCounter( prevState => prevState+1 ); //Add up 1 to previous state value
	};

	//Component render
	return (
		<StyledMain>
			<Content>
				<Progress value={totalDaysPassed} max={yearDays} />
				<h5>We are at <PercentageText title={`Current day of the year is ${totalDaysPassed} of ${yearDays}`} onClick={percentageDataHandler}  >
					{percentageCounter === 0 && percentageInteger}
					{percentageCounter === 1 && percentageShort}
					{percentageCounter === 2 && percentage}
					%
				</PercentageText> of the year! </h5>
			</Content>
		</StyledMain>
	);
};


export default Main; //Export main component
