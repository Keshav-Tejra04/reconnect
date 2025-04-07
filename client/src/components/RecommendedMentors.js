import React from 'react';

const RecommendedMentors = () => {
    const mentors = [
        {
            name: "Sundar Pichai",
            position: "Senior Product Manager @ Google",
            skills: "Product Tech Leadership"
        },
        {
            name: "Margi Patel",
            position: "Data Scientist @ Amazon",
            skills: "NLP Python AWS"
        },
        {
            name: "Duggal the Fuggal",
            position: "Software Engineer @ Microsoft",
            skills: "JNET Azure"
        }
    ];

    return (
        <div className="card">
            <h2>Recommended Mentors</h2>
            <div className="mentors-list">
                {mentors.map((mentor, index) => (
                    <div key={index} className="mentor-card">
                        <h3>{mentor.name}</h3>
                        <p>{mentor.position}</p>
                        <p>{mentor.skills}</p>
                        <button className="btn">Contact</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedMentors;