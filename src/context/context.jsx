import React, { createContext, useState } from 'react';
import run from '../config/Gemini'; // Ensure this import path is correct and `run` is the function you need

export const MyContext = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    // Function to append words with a delay
    const appendWordWithDelay = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData('');
        setInput('');
        setRecentPrompt('');
    };

    const onSent = async () => {
        try {
            setResultData(""); // Clear previous data
            setLoading(true); // Set loading state to true
            setShowResult(true); // Show the result section

            // Use recentPrompt or input based on the context state
            const prompt = recentPrompt || input;

            // Fetch data from API
            const response = await run(prompt);
            
            // Split response by "**" and format with <b> tags
            const responseArray = response.split("**");
            const formattedResult = responseArray.map((text, index) => 
                index % 2 === 0 ? text : `<b>${text}</b>`
            ).join('');

            // Replace "*" with line breaks and split into words
            const newResponse = formattedResult.replace(/\*/g, "<br/>");
            const finalResponseArray = newResponse.split(" ");
            
            // Append words with delay
            finalResponseArray.forEach((word, i) => appendWordWithDelay(i, word + " "));

            setPrevPrompt(prev => [...prev, prompt]); // Update prevPrompt
            setInput(""); // Clear input field
        } catch (error) {
            console.error('Error fetching result:', error);
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    const contextValue = {
        input,
        setInput,
        prevPrompt,
        setPrevPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        loading,
        setLoading,
        showResult,
        setShowResult,
        resultData,
        setResultData,
        newChat
    };

    return (
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    );
};

export default ContextProvider;
