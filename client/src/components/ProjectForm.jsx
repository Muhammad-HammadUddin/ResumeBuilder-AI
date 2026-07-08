import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({data,onChange}) => {
        const addProject=()=>{
     const newProject = {
      name: "",
      type: "",
      description: "",
      
    };
    onChange([...data,newProject])
    }

    const removeProject=(index)=>{
    const updated=data?.filter((_,i)=>i!==index)
    onChange(updated)
    }
     const updateProject=(index,field,value)=>{
    const updated=[...data]
    updated[index]={...updated[index],[field]:value}
    onChange(updated)
    }
  return (
 <div >

        <div>
             <div className='flex items-center justify-between'>
            <div>
<h3 className='fle items-center gap-3 text-lg font-semibold tet-gray-900'>Projects</h3>
<p>Add your projects</p>
            </div>
            <button onClick={addProject} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-10 text-green-700 rounded-lg hover:bg-green-200 transition-colors '>
                <Plus className='size-4'/>
                Add Project
            </button>

        </div>
        </div>

     
                 
                
                    <div className='space-y-4'>
                        {data?.map((project,index)=>(
                             <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                                <div className='flex justify-between items-start'>
                                    <h4>Project #{index+1}</h4>
                                    <button className='text-red-500 hover:text-red-700 transition-colors' onClick={()=>removeProject(index )}>
                                        <Trash2 className='size-4'/>
                                    </button>

                                </div>
                                <div className='grid md:grid-cols-2 gap-3'>
                                    <input type="text" placeholder='Project Name' className='px-3 py-2 text-sm rounded-lg' value={project?.name||""} onChange={(e)=>updateProject(index,"name",e.target.value)}/>
                                    <input type="text" placeholder='Project Type' className='px-3 py-2 text-sm rounded-lg' value={project?.type||""} onChange={(e)=>updateProject(index,"type",e.target.value)}/>
                                    <textarea placeholder='Describe your project...' className='px-3 py-2 text-sm rounded-lg' value={project?.description||""} onChange={(e)=>updateProject(index,"description",e.target.value)} rows={4}/>
                                    

                                </div>
                                                               
                             </div>
                        ))}

                    </div>
          
        
    </div>
)
}

export default ProjectForm