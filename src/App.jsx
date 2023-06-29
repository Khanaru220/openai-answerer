import { useCallback, useMemo, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');

	const fetchOpenAPI = async () => {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'gpt-4',
				messages: [
					{
						role: 'user',
						content: question,
					},
				],
			}),
		});

		const data = await response.json();
		setAnswer(data.choices[0].message.content);
		return data;
	};

	return (
		<>
			<label htmlFor="userinput">Type your question here</label>
			<input
				type="text"
				id="userinput"
				onChange={(e) => setQuestion(e.currentTarget.value)}
			/>
			<button onClick={fetchOpenAPI}>Request</button>
			<br />
			<label htmlFor="answer">Answer:</label>
			<textarea type="text" id="answer" disabled value={answer} />
		</>
	);
}

export default App;
