import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');

* {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;

	@keyframes up {
		from {
			top: -10px;
			opacity: 0;
		}
		to {
			top: -60px;
			opacity: 1;
		}
	}

	@keyframes right {
		from {
			width: 0px;
		}
		to {
			width: 100%;
		}
	}
}

* a {
	&:hover {
		color: #3E3A3A;
		text-decoration: none;
	}
}

* input {
	outline: none;
}

* button {
	background: none;
	border: 0;
	cursor: pointer;
	color: #3E3A3A;
}

* body {
	min-height: 100vh;
	background: #FFFFFF;
	font-family: 'Poppins', sans-serif;
	font-size: 14px;
	line-height: 21px;
	font-weight: 400;
	color: #3E3A3A;

	@media all and (max-width: 700px) {
		font-size: 12px;
		line-height: 18px;
	}
}
`;

export default GlobalStyle;
