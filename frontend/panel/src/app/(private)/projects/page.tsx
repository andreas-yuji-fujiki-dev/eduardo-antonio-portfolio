"use client";

import { ProjectTypes } from "@/types/api/projects/ProjectTypes";

import { useState, useEffect } from "react";
import fetchAllProjects from "@/utils/api/routes/projects";

export default function ProjectsManagementPage(){
    const [projectsList, setProjectsList] = useState<ProjectTypes[] | 'No projects found...' | 'Loading Projects'>('Loading Projects');
    
    // fetching initial projects as soon that page loads
    useEffect(()=>{
        // function to execute the first projects fetch
        async function fetchInitialProjects() {
            const request = await fetchAllProjects();

            if (request.status === 200) {
                const projects = request.data?.data;

                if (Array.isArray(projects)) {
                    setProjectsList(projects);
                } else {
                    setProjectsList('No projects found...');
                }
            }
        }

        // executing the first fetch of projects
        fetchInitialProjects();
    }, []);
    
    return(
        <>
            {Array.isArray(projectsList)
                ? (
                    <div className="grid grid-cols-4 gap-5 p-5">
                        {projectsList.map( ( project ) => (
                            <div key={project.id} className="border-4 border-b-fuchsia-500">
                                <span>
                                    Id: {project.id}
                                </span>
                                <h2>
                                    Nome: {project.name}
                                </h2>

                                <p>
                                    Descrição: {project.description}
                                </p>

                                <p>
                                    Mais informações: {project.more_info}
                                </p>

                                <p>
                                    Link de deploy: <a href={project.deploy_link}> {project.deploy_link} </a> 
                                </p>

                                <p>
                                    Link do repositório: <a href={project.repository_link}> {project.repository_link} </a>
                                </p>
                            </div>
                        ) )}
                    </div>
                ) : (
                    <span>
                        {String(projectsList)}
                    </span>
                )
            }
        </>
    );
};