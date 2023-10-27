import moment from 'moment';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';

function GetCommits() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messagesAndDates, setMessagesAndDates] = useState([]);

    const { date } = useParams();
    let initialMonth = moment();
    if (date){
        const dateParts = date.split('-');
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];

        if (year) {
            initialMonth.year(year);
            if (month) {
                initialMonth.month(month - 1);
                if (day) {
                    initialMonth.date(day);
                }
            }else {
                initialMonth.month(0);
            }
        }
    }
    const [currentMonth, setCurrentMonth] = useState(initialMonth);

    
    const goToPreviousMonth = () => {
        setCurrentMonth(currentMonth.clone().subtract(1, "month"));
        };
        
        const goToNextMonth = () => {
            setCurrentMonth(currentMonth.clone().add(1, "month"));
        };
        useEffect(() => {
            const fetchData = async () => {
            const firstDay = currentMonth.clone().startOf('month').startOf('week');
            const lastDay = currentMonth.clone().endOf('month');

            try {
                const apiUrl = `https://api.github.com/repos/${process.env.REACT_APP_REPO_OWNER}/${process.env.REACT_APP_REPO_NAME}/commits?since=${firstDay.toISOString()}&until=${lastDay.toISOString()}`;
                const response = await fetch(apiUrl,{
                    method: 'GET',
                    headers: {
                        Authorization: `token ${process.env.REACT_APP_API_KEY}`,
                    },
                });
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
            };
            fetchData();
        }, [currentMonth]);

    useEffect(() => {
        if (data) {
        if (Array.isArray(data)) {
            const extractedData = data.map((commit) => ({
            message: commit.commit.message,
            date: commit.commit.author.date,
            authorName: commit.commit.author.name,
            commitUrl: commit.commit.url,
            }));
            setMessagesAndDates(extractedData);
        } else if (typeof data === 'object') {
            const extractedData = [
            {
                message: data.commit.message,
                date: data.commit.author.date,
                authorName:data.commit.author.name,
                commitUrl: data.commit.url,
            }
            ];
            setMessagesAndDates(extractedData);
            return extractedData;
        }
        }
    }, [data]);

    return (
        <div className="loading-error-messages">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="navigation-buttons">
        <h2>{currentMonth.format("MMMM YYYY")}</h2>
            <button onClick={goToPreviousMonth}>Previous Month</button>
            <button onClick={goToNextMonth}>Next Month</button>
            <hr className="decorative-hr" />
            <Calendar currentMonth={currentMonth} data={messagesAndDates} />
        </div>
    </div>
    );
}

export default GetCommits;
