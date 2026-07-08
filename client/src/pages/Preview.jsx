import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import { ArrowLeftIcon, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../config/api'

const Preview = () => {
  const { resumeId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {

    try{
      const {data}= await api.get('/api/resumes/public/'+resumeId)
      setResumeData(data.resume)

    }catch(error){
      toast.error(error.message)

    }
    finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResume()
  }, [resumeId])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='animate-spin size-8 text-slate-500' />
      </div>
    )
  }

  return resumeData ? (
    <div className='bg-slate-100 min-h-screen'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes='py-4 bg-white'
        />
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <p className='text-center text-4xl text-slate-400 font-medium'>
        Resume Not Found
      </p>

      <Link
        to='/'
        className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'
      >
        <ArrowLeftIcon className='mr-2 size-4' />
        Go to Home Page
      </Link>
    </div>
  )
}

export default Preview
