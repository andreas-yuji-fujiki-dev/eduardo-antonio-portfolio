'use client'

// importando types
import { ProjectTypes } from '../../types/api/projects/ProjectTypes';
import { CreateprojectFormData } from '../../types/api/projects/CreateProjectFormdata';
import { ProjectStackCategoryTypes } from '../../types/api/projects/ProjectStackCategoryTypes'
import { ProjectCategoryTypes } from '@/types/api/projects/ProjectCategoryTypes';

// Importando useState
import { useState } from 'react';


interface ModalCreateProjectProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated?: (newProject: ProjectTypes) => void;
  authToken?: string;
};

export default function ModalCreateProject( { isOpen, onClose, onProjectCreated }:  ModalCreateProjectProps) {

    const [formData, setFormData] = useState<CreateprojectFormData>({
    name: '',
    description: '',
    more_info: '',
    deploy_link: '',
    repository_link: '',
    categoryId: 0,
    stackIds: [],
    imageIds: []
  });

    const [categories, setCategories] = useState<ProjectCategoryTypes[]>([]);
    const [stacks, setStacks] = useState<ProjectStackCategoryTypes[]>([]);
    const [submitting, setSubmitting] = useState(false);

    return(
        <>
        </>
    );
};