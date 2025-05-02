export class CreateArticleTextDto {
    readonly id?: number; 
    readonly title?: string;
    readonly text: string;
    readonly articleId: number;
    readonly blockId: number;
}