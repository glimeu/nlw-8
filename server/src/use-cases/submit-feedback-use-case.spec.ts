import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'I have a bug',
        screenshot: 'data:image/png;base64,dwqjiudqwiduhqwiudhqui',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledTimes(1);
    expect(sendMailSpy).toHaveBeenCalledTimes(1);
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'I have a bug',
        screenshot: 'data:image/png;base64,dwqjiudqwiduhqwiudhqui',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,dwqjiudqwiduhqwiudhqui',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'I have a bug',
        screenshot: 'test',
      })
    ).rejects.toThrow();
  });
});
