import { useEffect, useState } from 'react';
import { getTextPoll, getImagePoll, createPollVote } from './requests';
import { TextPoll, ImagePoll, PollOption, PollVote } from './types';
import './Polls.scss';

const Poll: React.FC<{ widgetPayload: TextPoll | ImagePoll }> = ({
  widgetPayload,
}) => {
  const [options, setOptions] = useState<PollOption[]>(widgetPayload.options);
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalVotes = options.reduce((a: any, b: any) => a + b.voteCount, 0);

  const updateOptions = (pollVote: PollVote) => {
    const updatedOptions = [...options];
    const votedOptionIdx = updatedOptions.findIndex(
      (option) => option.id === pollVote.optionId
    );
    updatedOptions[votedOptionIdx].voteCount++;
    setOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    if (!submitted) {
      setSubmitted(true);

      const pollVote = await createPollVote(widgetPayload, selectedOptionId);
      updateOptions(pollVote);
    }
  };

  const submittedClass = submitted ? ' submitted' : '';

  return (
    <div className="poll-body">
      <div className="poll-question">{widgetPayload.question}</div>
      <div className={'poll-options' + submittedClass}>
        {options.map((option: PollOption) => {
          const percentage =
            totalVotes > 0
              ? Math.round((option.voteCount / totalVotes) * 100)
              : 0;

          return (
            <div
              className={
                'poll-option' +
                (selectedOptionId === option.id ? ' selected' : '') +
                (option.imageUrl ? ' image' : '')
              }
              key={option.id}
              onClick={() => setSelectedOptionId(option.id)}
            >
              {option.imageUrl ? (
                <img
                  className="poll-image"
                  src={option.imageUrl}
                  alt="Option Image"
                />
              ) : null}
              <div className="option-details">
                <div className="text-container">
                  <div className="text">{option.description}</div>
                  <div className="percent">
                    {submitted ? percentage : null}%
                  </div>
                </div>
                <div className="progress-container">
                  <div
                    className="progress"
                    style={{ width: `${submitted ? percentage : 0}%` }}
                  ></div>
                </div>
                <div className="votes">{option.voteCount} Votes</div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className={'submit-button' + submittedClass}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default function App() {
  const [textPoll, setTextPoll] = useState<TextPoll | null>(null);
  const [imagePoll, setImagePoll] = useState<ImagePoll | null>(null);

  const getPoll = async () => {
    const textPoll = await getTextPoll();
    setTextPoll(textPoll);

    const imagePoll = await getImagePoll();
    setImagePoll(imagePoll);
  };

  useEffect(() => {
    getPoll();
  }, []);

  return (
    <>
      {textPoll ? <Poll widgetPayload={textPoll} /> : null}
      {imagePoll ? <Poll widgetPayload={imagePoll} /> : null}
    </>
  );
}
