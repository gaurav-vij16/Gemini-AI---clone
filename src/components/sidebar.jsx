import React, { useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../assets/assets";
import { MyContext } from "../context/context";

export const Sidebar = () => {
    const [extended, setExtended] = useState(false); // State to manage sidebar extension
    const { prevPrompt, onSent, setRecentPrompt, newChat } = useContext(MyContext); // Accessing prevPrompt from context

    // Function to load a prompt
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt); // Update recent prompt in context
        await onSent(); // Trigger onSent with the input set from the context
    };

    return (
        <div className="sidebar">
            <div className="top">
                {/* Menu Icon */}
                <img
                    onClick={() => setExtended((prev) => !prev)} // Toggle sidebar extension
                    className="menu"
                    src={assets.menu_icon}
                    alt="Menu Icon"
                />

                {/* New Chat Section */}
                <div onClick={newChat} className="new-chat">
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    {extended && <p>New Chat</p>}
                </div>

                {/* Recent Chats Section */}
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {/* Mapping over prevPrompt to display recent entries */}
                        {prevPrompt.map((item, index) => (
                            <div
                                onClick={() => loadPrompt(item)} // Trigger the loadPrompt function on click
                                className="recent-entry"
                                key={index}
                            >
                                <img src={assets.message_icon} alt="Recent Chat Icon" />
                                <p>{item.slice(0, 18)}...</p> {/* Display truncated item */}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Section with Helper Options */}
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Help Icon" />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="Activity Icon" />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Setting Icon" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};
