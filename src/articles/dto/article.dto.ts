import { ArticleCodeDto } from "./article-code.dto";
import { ArticleImgDto } from "./article-img.dto";
import { ArticleTextDto } from "./article-text.dto";




export class ArticleDto {
    userId: number;
    title: string;
    subtitle: string;
    type: Array<string>;
    image: string;
    views: number;
    blocks: Array<ArticleCodeDto | ArticleImgDto | ArticleTextDto>;
}