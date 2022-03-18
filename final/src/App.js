import React, { useState } from 'react';


function CreateQuiz(props) {
	const questionsList = props.questions.map((ques, i) =>
		<div className='question' key={i}>
			<span>{i + 1 + ":"} {ques.questionText}</span>
		</div>
	);
	const [ques, setQuestion] = useState('')
	const [option1, updateOption1] = useState('')
	const [option1Correct, updateOption1Correct] = useState('')
	const [option2, updateOption2] = useState('')
	const [option2Correct, updateOption2Correct] = useState('')
	const [option3, updateOption3] = useState('')
	const [option3Correct, updateOption3Correct] = useState('')
	const [option4, updateOption4] = useState('')
	const [option4Correct, updateOption4Correct] = useState('')
	function handleSubmit(e) {
		e.preventDefault()
		props.setShowQuestions(prev => true)
	}

	function addQuestion(e) {
		e.preventDefault()
		props.updateQuestions(prev => prev.concat({
			questionText: ques,
			answerOptions: [
				{ answerText: option1, isCorrect: option1Correct === 'Yes' },
				{ answerText: option2, isCorrect: option2Correct === 'Yes' },
				{ answerText: option3, isCorrect: option3Correct === 'Yes' },
				{ answerText: option4, isCorrect: option4Correct === 'Yes' },
			],
		}))
		setQuestion('')
		updateOption1('')
		updateOption1Correct('No')
		updateOption2('')
		updateOption2Correct('No')
		updateOption3('')
		updateOption3Correct('No')
		updateOption4('')
		updateOption4Correct('No')
		console.log(props.questions)
	}
	return (
		<div className='create-questions'>
			{questionsList}
			< form >
				<fieldset className='question-input'>
					<input value={ques} onChange={e => setQuestion(e.target.value)} placeholder="Question" />
					<fieldset className='option-input'>
						<input value={option1} onChange={e => updateOption1(e.target.value)} placeholder="Option 1" required />
						<select vale={option1Correct} onChange={e => updateOption1Correct(e.target.value)} placeholder='Is this one of the answers ?'>
							<option>Yes</option>
							<option>No</option>
						</select>
					</fieldset>
					<fieldset className='option-input'>
						<input value={option2} onChange={e => updateOption2(e.target.value)} placeholder="Option 2" required />
						<select vale={option2Correct} onChange={e => updateOption2Correct(e.target.value)} placeholder='Is this one of the answers ?'>
							<option>Yes</option>
							<option>No</option>
						</select>
					</fieldset>
					<fieldset className='option-input'>
						<input value={option3} onChange={e => updateOption3(e.target.value)} placeholder="Option 3" required />
						<select vale={option3Correct} onChange={e => updateOption3Correct(e.target.value)} placeholder='Is this one of the answers ?'>
							<option>Yes</option>
							<option>No</option>
						</select>
					</fieldset>
					<fieldset className='option-input'>
						<input value={option4} onChange={e => updateOption4(e.target.value)} placeholder="Option 4" required />
						<select vale={option4Correct} onChange={e => updateOption4Correct(e.target.value)} placeholder='Is this one of the answers ?'>
							<option>Yes</option>
							<option>No</option>
						</select>
					</fieldset>
					<button onClick={addQuestion} className="question-button"> Add Question </button>
					<button onClick={handleSubmit}> Done </button>
				</fieldset>
			</form >
		</div>
	)

}
export default function App() {
	// const questions = [
	// 	{
	// 		questionText: 'What is the capital of France?',
	// 		answerOptions: [
	// 			{ answerText: 'New York', isCorrect: false },
	// 			{ answerText: 'London', isCorrect: false },
	// 			{ answerText: 'Paris', isCorrect: true },
	// 			{ answerText: 'Dublin', isCorrect: false },
	// 		],
	// 	}]

	const [questions, updateQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [showQuestions, setShowQuestions] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				showQuestions ? (
					<>
						<div className='question-section'>
							<div className='question-count'>
								<span>Question {currentQuestion + 1}</span>/{questions.length}
							</div>
							<div className='question-text'>{questions[currentQuestion].questionText}</div>
						</div>
						<div className='answer-section'>
							{questions[currentQuestion].answerOptions.map((answerOption) => (
								<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
							))}
						</div>
					</>
				) : (
					<CreateQuiz updateQuestions={updateQuestions} setShowQuestions={setShowQuestions} questions={questions} />
				)

			)}
		</div>
	);
}
