import data from "./news.json"

interface Attachment {
    type: string;
    image?: {
        src: string;
        width: number;
        height: number;
    };
    link?: string;
    caption?: string;
    titleLink?: string;
    description?: string;
}

interface NewsItem {
    id: number;
    text: string;
    date: number;
    type: string;
    attachments: Attachment[];
}

export const newsData: NewsItem[] = data;

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
    return newsData.find(item => item.id === Number(id));
}