import { BlockType } from "./article.dto";

export class ArticleTextDto {
    title?: string;
    text: string;
    articleId: number;
    blockId: string;
    type: string
}