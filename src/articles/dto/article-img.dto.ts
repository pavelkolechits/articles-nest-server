import { BlockType } from "./article.dto";

export class ArticleImgDto {
    title?: string;
    src: string;
    articleId: number;
    blockId: string;
    type: string;
}