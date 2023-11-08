import openai from "@/app/utils/openai";

export async function GET(request:Request){

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: 'user', content: 'tell me a joke'}],
        max_tokens: 30,
    });

    console.log('hit!')
    console.log('sending',completion.choices[0].message.content)
    
    return new Response(JSON.stringify({message: completion.choices[0].message.content}))
    
}

export async function POST(req: Request){
    console.log('post')

    const body = await req.json();
    const topic = body.topic
    const numberOfVideos = body.numberOfVideos
    console.log(numberOfVideos)

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: 'user', content: `
        Create me ${numberOfVideos} sets of facts in the same style as the below examples, and format them in a array of objects that each have a topic, part1, and part2. part should be the begining of the sentence and part 2 should be the end of the sentence.Do not repeat any facts. These should be ${topic} facts. use specific locations if possible. Keep the facts engaging, polarizing, over the top and relatable to everyone or people in particular situations. The reading grade should be under grade 7 ideally. each part should only contain up to 6 words. only create ${numberOfVideos} sets of facts. Here's an example:

        Topic: ${topic}
        
        Part 1: 
        
        Part 2: 
        `}],
        max_tokens: 500,
    });
    
    console.log('sending',completion.choices[0].message.content)
    
    return new Response(JSON.stringify({message: completion.choices[0].message.content}))
    
}

