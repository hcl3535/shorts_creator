const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY,
})

export default openai;