import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req,res){

  if (!configuration.apiKey) {
    res.status(500).json({
      error:  "Please enter your Open AI key",
    });
    return;
  }

  if(!req.body.question || req.body.question.length == 0){
    res.status(400).json({
      error:  "Please enter your question"
    })
  }

    try {
        const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.question,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
      });

      res.json({answer : response.data.choices[0].text})

    } catch (error) {
        res.json({error : error.message})
    }
    


}

