import { getNewsById, newsData } from "../../../../data/news";
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
    return newsData.map((item) => ({
        id: item.id.toString(),
    }));
}

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({ params }: PageProps) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const { id } = params;

    const newsItem = await getNewsById(id);

    if (!newsItem) {
        notFound();
    }


    const getCategoryColor = (type: string): string => {
        const colors: { [key: string]: string } = {
            'Вика_Соревнования': 'bg-blue-100 text-blue-800',
            'Вика_Вакансии': 'bg-green-100 text-green-800',
            'Вика_Пересдачи': 'bg-red-100 text-red-800',
            'Вика_sumirea': 'bg-purple-100 text-purple-800',
            'Вика_Дополнительное_образование': 'bg-yellow-100 text-yellow-800',
            'Вика_Общее': 'bg-gray-100 text-gray-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Вернуться к новостям
                    </Link>
                </div>

                <article className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(newsItem.type)}`}>
                {newsItem.type}
              </span>

                        </div>

                        <div className="prose prose-lg prose-gray max-w-none mb-8">
                            <div className="text-gray-800 whitespace-pre-line leading-relaxed text-lg">
                                {newsItem.text}
                            </div>
                        </div>

                        {newsItem.attachments && newsItem.attachments.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Приложения
                                </h3>

                                {newsItem.attachments.map((attachment, index) => (
                                    <div key={index}>
                                        {attachment.type === 'PHOTO' && attachment.image && (
                                            <div className="relative rounded-lg overflow-hidden shadow-lg">
                                                <Image
                                                    src={attachment.image.src}
                                                    alt="Изображение к новости"
                                                    width={attachment.image.width}
                                                    height={attachment.image.height}
                                                    className="w-full h-auto object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}

                                        {attachment.type === 'LINK' && (
                                            <a
                                                href={attachment.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block border border-gray-200 rounded-lg p-6 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                                            >
                                                <div className="flex items-start space-x-6">
                                                    {attachment.image && (
                                                        <div className="flex-shrink-0">
                                                            <Image
                                                                src={attachment.image.src}
                                                                alt="Превью ссылки"
                                                                width={120}
                                                                height={90}
                                                                className="rounded-lg object-cover shadow-sm"
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        {attachment.titleLink && (
                                                            <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                                                {attachment.titleLink}
                                                            </h4>
                                                        )}
                                                        {attachment.description && (
                                                            <p className="text-gray-600 mb-3 leading-relaxed">
                                                                {attachment.description}
                                                            </p>
                                                        )}
                                                        {attachment.caption && (
                                                            <p className="text-blue-600 font-medium">
                                                                {attachment.caption}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </article>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Другие новости
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {newsData
                            .filter(item => item.id !== newsItem.id)
                            .slice(0, 4)
                            .map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/news/${item.id}`}
                                    className="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-gray-300"
                                >
                                    <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(item.type)}`}>
                      {item.type}
                    </span>

                                    </div>
                                    <p className="text-sm text-gray-800 line-clamp-3">
                                        {item.text}
                                    </p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


