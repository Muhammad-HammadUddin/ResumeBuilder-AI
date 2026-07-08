import Resume from "../model/Resume.js"
import openai from "../config/ai.js"



// api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async(req, res) => {
    try {

        const { userContent } = req.body

        if (!userContent) {
            return res.status(400).json({ message: "Missing Required fields" })
        }

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [{
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it ATS-friendly and only return text."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        })

        const enhancedContent = response.choices[0].message.content

        return res.status(200).json({ enhancedContent })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



// /api/ai/enhance-job-desc

export const enhanceJobDescription = async(req, res) => {
    try {

        const { userContent } = req.body

        if (!userContent) {
            return res.status(400).json({ message: "Missing Required fields" })
        }

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [{
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentences highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly and only return text."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        })

        const enhancedContent = response.choices[0].message.content

        return res.status(200).json({ enhancedContent })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



// /api/ai/upload-resume

export const uploadResume = async(req, res) => {
    try {

        const { resumeText, title } = req.body
        const userId = req.userId
        console.log(resumeText, title)

        if (!resumeText) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        const systemPrompt = "You are an expert AI Agent to extract data from resume."
        console.log(process.env.OPENAI_API_KEY)
        console.log(process.env.OPENAI_MODEL)
        const userPrompt = `extract data from this resume : ${resumeText}
        
        
Provide data in VALID JSON format with no additional text before or after:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [],
  "project": [],
  "education": []
}

`
        console.log("hello")

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [{
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            response_format: { type: 'json_object' }
        })
        console.log(response.choices[0].message.content)

        const extractedData = response.choices[0].message.content

        let parsedData
        try {
            parsedData = JSON.parse(extractedData)
        } catch {
            return res.status(500).json({ message: "Invalid AI JSON response" })
        }

        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        })

        return res.status(200).json({ resumeId: newResume._id })

    } catch (error) {

        return res.status(500).json({ message: error.message })
    }
}