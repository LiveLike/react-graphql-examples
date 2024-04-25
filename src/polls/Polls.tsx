import { useEffect, useState } from 'react';
import { getTextPoll, getImagePoll, createPollVote, updatePollVote, getWidgetInteractions } from './requests';
import { TextPoll, ImagePoll, PollOption, CreatePollVote, WidgetInteraction } from './types';
import './Polls.scss';

const Poll: React.FC<{ widgetPayload: TextPoll | ImagePoll, interaction: WidgetInteraction | null }> = ({
  widgetPayload, interaction
}) => {
  const interactedOptionId = interaction && interaction.optionId;
  const [options, setOptions] = useState<PollOption[]>(widgetPayload.options);
  const [selectedOptionId, setSelectedOptionId] = useState(interactedOptionId || '');
  const [submitted, setSubmitted] = useState(!!interactedOptionId || false);
  const [vote, setVote] = useState(interaction || null);

  const totalVotes = options.reduce((a: any, b: any) => a + b.voteCount, 0);

  const updateOptions = (pollVote: CreatePollVote) => {
    const updatedOptions = [...options];
    const votedOptionIdx = updatedOptions.findIndex(
      (option) => option.id === pollVote.optionId
    );
    updatedOptions[votedOptionIdx].voteCount++;
    setOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    if (!submitted && !vote) {
      setSubmitted(true);
      const pollVote = await createPollVote(widgetPayload, selectedOptionId);
      setVote(pollVote);
      updateOptions(pollVote);
    } else {
      // const updatedPollVote = await updatePollVote(widgetPayload, selectedOptionId, vote!.id);
      // setVote(updatedPollVote);
      // updateOptions(updatedPollVote);
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
  const [textPollInteraction, setTextPollInteraction] = useState<WidgetInteraction | null>(null);
  const [imagePollInteraction, setImagePollInteraction] = useState<WidgetInteraction | null>(null);

  const getPoll = async () => {
    const textPoll = await getTextPoll();
    const textPollWidgetInteractions = await getWidgetInteractions(textPoll);
    setTextPoll(textPoll);
    setTextPollInteraction(textPollWidgetInteractions[0].interactions[0])

    const imagePoll = await getImagePoll();
    const imagePollWidgetInteractions = await getWidgetInteractions(imagePoll);
    setImagePoll(imagePoll);
    setImagePollInteraction(imagePollWidgetInteractions[0].interactions[0])

  };

  useEffect(() => {
    
    getPoll();
  }, []);

  return (
    <>
      {textPoll ? <Poll widgetPayload={textPoll} interaction={textPollInteraction} /> : null}
      {imagePoll ? <Poll widgetPayload={imagePoll} interaction={imagePollInteraction} /> : null}
    </>
  );
}
