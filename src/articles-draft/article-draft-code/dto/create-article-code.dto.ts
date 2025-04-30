export class CreateArticleCodeDto {
    readonly id?: number; 
    readonly code: string;
    readonly articleId: number;
    readonly blockId: number;
    readonly type: string;
}