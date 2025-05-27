import { ArticleImg } from "../article-img/article-img.model";
import { ArticleCodeDto } from "./article-code.dto";
import { ArticleTextDto } from "./article-text.dto";


export type BlockType = 'TEXT' | 'IMAGE' | 'CODE'

export class ArticleDto {
    userId: number;
    title: string;
    subtitle: string;
    type: Array<string>;
    image: string;
    blocks: Array<ArticleCodeDto | ArticleImg | ArticleTextDto>
}