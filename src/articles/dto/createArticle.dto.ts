import { IsArray, IsNotEmpty, IsString } from "class-validator";


export class CreateArticleDto {
    @IsNotEmpty({message:'Title is required'})
    title: string;

     @IsNotEmpty({message:'Body is required'})
    body: string;

     @IsNotEmpty({message:'Slug is required'})
    description: string;

    @IsArray({message:'Tags is required'})
    @IsString({each:true})
    tagsList?: string[];
}