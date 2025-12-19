
export interface CreateprojectFormData {
    name: string;
    description: string;
    more_info: string;
    deploy_link: string;
    repository_link: string;
    categoryId: number;
    stackIds: number[];
    imageIds?: number[];

}