import { Comment } from './comment'

export interface Post {
    id: string;
    title: string;
    img?: string;
    minImg?: string;
    medImg?: string;
    hdImg?: string;
    content?: {
        akapit1: string;
        akapit2: string;
        akapit3: string;
    };
    comments?: Array<Comment>;
}
