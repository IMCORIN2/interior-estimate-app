'use client';
import { useState } from 'react';
import { chatbotFlow } from './chatbotFlow';

export default function ChatBot() {
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string[] }>({});

    const currentStep = chatbotFlow[stepIndex];

    const handleSelect = (option: string) => {
        const currentAnswers = answers[currentStep.id] || [];
        const isMultiple = currentStep.multiple;

        const updated = isMultiple
            ? currentAnswers.includes(option)
                ? currentAnswers.filter((a) => a !== option)
                : [...currentAnswers, option]
            : [option];

        setAnswers({
            ...answers,
            [currentStep.id]: updated,
        });
    };

    const handleNext = () => {
        if (stepIndex < chatbotFlow.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            console.log('최종 답변:', answers);
        }
    };

    return (
        <div style={{ width: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <div style={{ background: '#f3f3f3', padding: '1rem', borderRadius: '8px' }}>
                <p>
                    <strong>챗봇:</strong> {currentStep.question}
                </p>
                <div>
                    {currentStep.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            style={{
                                margin: '0.25rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                background: answers[currentStep.id]?.includes(option) ? '#4caf50' : '#e0e0e0',
                                color: answers[currentStep.id]?.includes(option) ? 'white' : 'black',
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                    }}
                >
                    다음
                </button>
            </div>
        </div>
    );
}
