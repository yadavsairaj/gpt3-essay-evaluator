import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Grade and evaluate my essays on criteria such as content, organization, grammar and mechanics, and style. Depending on the professor, grading may also take into account the student’s creativity, originality, personality, interests and critical thinking skills. Also facors like  spelling, syntax, content, and research. Grade it and tell on what basis it was graded also provide how to enhance the essay given below. Also let me know in which sentences i went wrong 
Evaluation:`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 1250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;