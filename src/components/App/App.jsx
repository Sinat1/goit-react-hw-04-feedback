import { useState } from 'react';
import css from './App.module.css';
import Section from 'components/Section';
import FeedbackOptions from 'components/Feedback';
import Statistics from 'components/Statistics';
import Notification from 'components/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackHandler = feedback => {
    switch (feedback) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const totalFeedback = good + neutral + bad;
    return totalFeedback;
  };

  const countPositiveFeedbackPercentage = () => {
    if (!good) {
      return 0;
    }
    return ((good / (good + bad + neutral)) * 100).toFixed(2);
  };

  const total = countTotalFeedback();
  return (
    <div className={css.app}>
      <div className={css.wrapper}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            title="Please leave feedback"
            onLeaveFeedback={feedbackHandler}
            options={['good', 'neutral', 'bad']}
          />
        </Section>
        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="There is no feedback 🥺" />
          ) : (
            <Statistics
              title="Statistics"
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback}
              positivePercentage={countPositiveFeedbackPercentage}
            />
          )}
        </Section>
      </div>
    </div>
  );
};
