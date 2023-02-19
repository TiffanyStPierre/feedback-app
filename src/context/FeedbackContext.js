import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    //Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`);
        const data = await response.json();

        setFeedback(data);
        setIsLoading(false);
    }

    //Delete feedback item
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
          await fetch(`http://localhost:5000/feedback/${id}`, { method: 'DELETE' })
    
          setFeedback(feedback.filter((item) => item.id !== id))
        }
      }

    //Set item to be updated in form
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    //Update feedback item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updItem),
        })
    
        const data = await response.json()
    
        // NOTE: no need to spread data and item
        setFeedback(feedback.map((item) => (item.id === id ? data : item)))
    
        // FIX: this fixes being able to add a feedback after editing
        setFeedbackEdit({
          item: {},
          edit: false,
        })
      }

    //Add feedback item
    const addFeedback = async (newFeedback) => {
        const response = await fetch('http://localhost:5000/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;