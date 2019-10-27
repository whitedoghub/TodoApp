import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Heading from './Heading';
import Input from './TextInput';
import Button from './Button';
import TodoList from './TodoList';
import TabBar from './TabBar';

let todoIndex = 0;

class App extends Component {
	constructor() {
		super();
		this.state = {
			inputValue: '',
			todos: [],
			type: 'All',
		};

		// class에서 method는 자동으로 class에 바인딩 되지 않음
		this.submitTodo = this.submitTodo.bind(this);
		this.toggleComplete = this.toggleComplete.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.setType = this.setType.bind(this);
	}

	setType(type) {
		this.setState({
			type,
		});
	}

	inputChange(inputValue) {
		// binding을 하지 않았는데, 정상 작동함 -> 확인 필요
		console.log('InputValue: ', inputValue);
		this.setState({
			inputValue,
		});
	}

	submitTodo() {
		const { inputValue } = this.state;

		if (inputValue.match(/^\s*$/)) {
			// 비어 있거나 공백이 있는 경우
			return;
		}

		const todo = {
			title: inputValue,
			todoIndex,
			complete: false,
		};

		todoIndex++;

		const todos = [...this.state.todos, todo];

		this.setState({
			todos,
			inputValue: '',
		});
	}

	deleteTodo(todoIndex) {
		let { todos } = this.state;
		todos = todos.filter(todo => todo.todoIndex !== todoIndex);
		this.setState({
			todos,
		});
	}

	toggleComplete(todoIndex) {
		let { todos } = this.state;
		todo.forEach(todo => {
			if (todo.todoIndex === !todo.complete) {
				todo.complete = !todo.complete;
			}
		});
		this.setState({
			todos,
		});
	}

	render() {
		const { inputValue, todos, type } = this.state;

		console.log('App.js -> render() -> state: ', this.state);

		return (
			<View style={StyleSheet.container}>
				<ScrollView
					keyboardShouldPersistTaps="always"
					style={StyleSheet.content}>
					<Heading />
					<Input
						inputValue={inputValue}
						inputChange={text => this.inputChange(text)}></Input>
					<TodoList
						todos={todos}
						toggleComplete={this.toggleComplete}
						deleteTodo={this.deleteTodo}
					/>
					<Button submitTodo={this.submitTodo} />
				</ScrollView>
				<TabBar type={type} setType={this.setType} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'red',
	},
	content: {
		flex: 1,
		paddingTop: 60,
	},
});

export default App;
