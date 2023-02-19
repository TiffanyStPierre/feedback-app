import {useContext} from 'react';
import FeedbackContext from '../context/FeedbackContext';

export default function FeedbackStats() {
    const {feedback} = useContext(FeedbackContext);

    // Calculate ratings average
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.rating
    }, 0) / feedback.length;

    /* Show the average to one decimal place but if it's zero then don't show the decimal place (used a regex)*/
    average = average.toFixed(1).replace(/[.,]0$/,'');

    // If the average returns as NaN then we want to show 0, if it's not NaN then we want to show the average
    return (
        <div className="feedback-stats">
            <h4>{feedback.length} Reviews</h4>
            <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    )
}