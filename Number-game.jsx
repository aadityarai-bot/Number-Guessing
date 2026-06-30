import React, { useState } from 'react';
import './src/tailwind.css';

const NumberGame = () => {
    const [difficulty, setDifficulty] = useState('');
    const [userChoice, setUserChoice] = useState(null);
    const [message, setMessage] = useState('');
    const [randomChoice, setRandomChoice] = useState(null);

    const startGame = (level) => {
        let max = 100;

        if (level === 'easy') {
            max = 20;
        } else if (level === 'medium') {
            max = 50;
        }

        setDifficulty(level);
        setUserChoice(null);
        setMessage('');
        setRandomChoice(Math.floor(Math.random() * max) + 1);
    };

    const resetGame = () => {
        setDifficulty('');
        setUserChoice(null);
        setMessage('');
        setRandomChoice(null);
    };

    const checkGuess = () => {
        if (randomChoice === null) {
            setMessage('Please choose a difficulty first.');
            return;
        }

        const parsedGuess = Number(userChoice);

        if (Number.isNaN(parsedGuess)) {
            setMessage('Please enter a valid number.');
            return;
        }

        if (parsedGuess === randomChoice) {
            setMessage('Congratulations! You guessed the correct number!');
            console.log('Random choice was:', randomChoice);
        } else if (parsedGuess < randomChoice) {
            setMessage('Too low! Try again.');
            console.log('Random choice was:', randomChoice);
        } else {
            setMessage('Too high! Try again.');
            console.log('Random choice was:', randomChoice);
        }
    };

    return (
        <div className='min-h-screen bg-slate-100 p-6 flex items-center justify-center'>
            <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-lg'>
                <h1 className='text-3xl font-bold text-slate-800 mb-3'>Number Game</h1>
                <p className='text-slate-600'>Guess a number between 1 and 100:</p>
                <p className='text-slate-600 mb-4'>Please choose a difficulty level:</p>

                <div className='flex gap-2 mb-4'>
                    <button className='flex-1 rounded-lg bg-emerald-500 px-3 py-2 text-white hover:bg-emerald-600' onClick={() => startGame('easy')}>Easy</button>
                    <button className='flex-1 rounded-lg bg-amber-500 px-3 py-2 text-white hover:bg-amber-600' onClick={() => startGame('medium')}>Medium</button>
                    <button className='flex-1 rounded-lg bg-rose-500 px-3 py-2 text-white hover:bg-rose-600' onClick={() => startGame('hard')}>Hard</button>
                </div>

                <div className='mb-4'>
                    <input
                        className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500'
                        type='number'
                        min='1'
                        max='100'
                        placeholder='Enter your guess'
                        value={userChoice ?? ''}
                        onChange={(event) => setUserChoice(event.target.value)}
                    />
                </div>

                <div className='flex gap-2'>
                    <button className='flex-1 rounded-lg bg-sky-600 px-3 py-2 text-white hover:bg-sky-700' onClick={checkGuess}>Submit</button>
                    <button className='flex-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100' onClick={resetGame}>Reset</button>
                </div>

                {difficulty && <p className='mt-4 text-sm text-slate-500'>Current difficulty: {difficulty}</p>}
                {message && <p className='mt-3 text-sm font-medium text-slate-700'>{message}</p>}
            </div>
        </div>
    );
};

export default NumberGame;