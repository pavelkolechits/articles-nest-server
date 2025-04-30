export class CreateArticleImgDto {
    readonly id?: number; 
    readonly title?: string;
    readonly articleId: number;
    readonly blockId: number;
    readonly type: string;
}