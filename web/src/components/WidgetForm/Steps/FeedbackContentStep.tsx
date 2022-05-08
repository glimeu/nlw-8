import { ArrowLeft } from 'phosphor-react';
import { useState } from 'react';

import { FeedbackType, feedbackTypes } from '..';
import { api } from '../../../lib/api';
import { CloseButton } from '../../CloseButton';
import { Loading } from '../../Loading';
import { ScreenshotButton } from '../ScreenshotButton';

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
};

export const FeedbackContentStep = ({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) => {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: React.FormEvent) {
    event.preventDefault();

    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);

    try {
      api.post('/feedbacks', {
        type: feedbackType,
        screenshot,
        comment,
      });
    } catch (error) {
      console.error(error);
    }

    // setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="flex items-center gap-2 text-xl leading-6">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="w-full my-4" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton screenshot={screenshot} onScreenshotTook={setScreenshot} />

          <button
            type="submit"
            disabled={!comment || isSendingFeedback}
            className="flex items-center justify-center flex-1 p-2 text-sm transition-colors border-transparent rounded bg-brand-500 hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  );
};
