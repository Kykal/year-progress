import React, { useState, useEffect } from 'react';


//Styled components
import style from 'styled-components';


//Styled components
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
	
	const [ counter, setCounter ] = useState(0);

	const [ percentage, setPercentage] = useState({
		full: 0,
		fixed: 0,
		integer: 0,
	});

	const [ currentDate, setCurrentDate ] = useState({
		monthNumber: date.getMonth(),
		monthName : date.toLocaleDateString('en', { month: 'long' }),
		year: date.getFullYear(),
		daysInYear: 0,
		totalDaysPassed: 0
	});

	//Once website loads...
	useEffect( () => {		

		//Knows if this year is leap-year
		const tempDaysInYear = currentDate.year % 4 === 0 ? 366 : 365;
		let tempTotalDaysPassed = 0;
		
		//Iterates each month to add up total month days
		for( let i=0; i<currentDate.monthNumber; i++ ){
			//Declares a new date in day 0 to know its total days
			const tempDate = new Date( currentDate.year , i+1, 0);
			const totalDaysInMonth = tempDate.getDate();
			tempTotalDaysPassed += totalDaysInMonth;
		}

		//Add up the days of actual month
		tempTotalDaysPassed += (date.getDate() - 1);

		
		//Know its percentages
		const fullPercentage = (tempTotalDaysPassed * 100 ) / tempDaysInYear ;

		console.log( fullPercentage );

		//Update state
		setCurrentDate({
			...currentDate,
			daysInYear: tempDaysInYear,
			totalDaysPassed: tempTotalDaysPassed
		});
		setPercentage({
			...percentage,
			full: fullPercentage,
			fixed: fullPercentage.toFixed(2),
			integer: parseInt(fullPercentage)
		});
	}, []);

	
	//Change how percentage string is displayed
	const changePercentageDisplay = () => {
		if( counter === 2 ){
			setCounter(0);
			return;
		}

		setCounter( prevState => prevState + 1 );
	};

	//Component render
	return (
		<StyledMain>
			<Content>
				<Progress value={currentDate.totalDaysPassed} max={currentDate.daysInYear} />
				<h5>We are at <PercentageText title={`Current day of the year is ${currentDate.totalDaysPassed} of ${currentDate.daysInYear}`} onClick={changePercentageDisplay}  >
					{counter === 0 && percentage.integer}
					{counter === 1 && percentage.fixed}
					{counter === 2 && percentage.full}
					%
				</PercentageText> of the year! </h5>
			</Content>
		</StyledMain>
	);
};


export default Main; //Export main component
