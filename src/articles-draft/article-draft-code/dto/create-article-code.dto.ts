export class CreateArticleCodeDto {
    readonly id?: number; 
    readonly code: string;
    readonly articleId: number;
    readonly blockId: string;
    readonly type: string;
}