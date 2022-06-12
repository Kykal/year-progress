import React from 'react';

//Styled components
import style from 'styled-components';


const StyledHeader = style.header`
	position: static;

	text-align: center;
	padding: 1em;
`;



//Main component content
const Header = ({date}) => {

	date = date.toLocaleDateString( 'en', { weekday: "long", day: "2-digit", month: "long", year:"numeric" } );

	//Component render
	return (
		<StyledHeader>
			<h3>Today is</h3>
			<h1>{date}</h1>
		</StyledHeader>
	);
};


export default Header; //Export main component
