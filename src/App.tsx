import { useState, useEffect } from "react"

import { Container, Header, HeaderText, Body } from "./styles";
import GlobalStyles from "./styles/GlobalStyles"

import { Item } from "./types/Item";
import { Category } from "./types/Category";
import { items } from "./data/items";
import { categories } from "./data/categories";
import { getCurrentMonth, filterListByMonth } from "./helpers/dateFilter";

import InfoArea from "./components/InfoArea";
import InputArea from "./components/InputArea";
import TableArea from "./components/TableArea";

const App = () => {
	const [list, setList] = useState(items);
	const [filteredList, setFilteredList] = useState<Item[]>([]);
	const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
	const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);

	useEffect(() => {
		setFilteredList(filterListByMonth(list, currentMonth));
	}, [list, currentMonth]);

	useEffect(() => {
		let incomeCount = 0;
		let expenseCount = 0;

		for (let i in filteredList) {
			if (categories[filteredList[i].category].expense) {
				expenseCount += filteredList[i].value;
			} else {
				incomeCount += filteredList[i].value;
			};
		};

		setIncome(incomeCount);
		setExpense(expenseCount);
	}, [filteredList])

	const handleMonthChance = (newMonth: string) => {
		setCurrentMonth(newMonth);
	};

	const handleAddItem = (item: Item) => {
		setList([...list, item]);
	};

	return (
		<>
			<Container>
				<Header>
					<HeaderText>Sistema Financeiro</HeaderText>
				</Header>
				<Body>
					<InfoArea onMonthChange={handleMonthChance} currentMonth={currentMonth} income={income} expense={expense}/>
					<InputArea onAdd={handleAddItem} />
					<TableArea list={filteredList} />
				</Body>
			</Container>
			<GlobalStyles />
		</>
	);
};

export default App;