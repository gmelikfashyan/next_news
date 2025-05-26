import Image from 'next/image';
import {newsData} from "../../data/news"
import Link from "next/link";




export const dynamic = 'force-dynamic'
export default function NewsPage ()  {



  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Новости ИИТ МИРЭА
            </h1>


          </div>
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <Link href={'/ErrorTrigger'}>Это ошибка</Link>
          </button>
          <div className="space-y-6">
            {newsData.map((item) => (
                <article
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    {/* Category and Date */}
                    <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.type)}`}>
                    {item.type}
                  </span>
                      <time className="text-sm text-gray-500">
                        {formatDate(item.date)}
                      </time>
                    </div>

                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                        {item.text.length <= 70 ? item.text : item.text.slice(0, 70) + "..."}
                      </p>
                    </div>

                    {item.attachments && item.attachments.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {item.attachments[0].type === 'PHOTO' && item.attachments[0].image && (
                              <div className="relative rounded-lg overflow-hidden">
                                <Image
                                    src={item.attachments[0].image.src}
                                    alt="Изображение к новости"
                                    width={item.attachments[0].image.width}
                                    height={item.attachments[0].image.height}
                                    className="w-full h-auto object-cover max-h-96"
                                    loading="lazy"
                                />
                              </div>
                          )}
                          {item.attachments[0].type === 'LINK' && (
                              <a
                                  href={item.attachments[0].link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-start space-x-4">
                                  {item.attachments[0].image && (
                                      <div className="flex-shrink-0">
                                        <Image
                                            src={item.attachments[0].image.src}
                                            alt="Превью ссылки"
                                            width={80}
                                            height={60}
                                            className="rounded object-cover"
                                            loading="lazy"
                                        />
                                      </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    {item.attachments[0].titleLink && (
                                        <h4 className="text-lg font-medium text-gray-900 mb-1">
                                          {item.attachments[0].titleLink}
                                        </h4>
                                    )}
                                    {item.attachments[0].description && (
                                        <p className="text-gray-600 text-sm mb-2">
                                          {item.attachments[0].description}
                                        </p>
                                    )}
                                    {item.attachments[0].caption && (
                                        <p className="text-blue-600 text-sm font-medium">
                                          {item.attachments[0].caption}
                                        </p>
                                    )}
                                  </div>
                                </div>
                              </a>
                          )}
                        </div>
                    )}
                  </div>
                  <button type="button" className="px-3 py-2 m-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <Link href={`/news/${item.id}`} className="block">
                        Читать полностью
                    </Link>
                  </button>
                </article>
            ))}
          </div>
        </div>
      </div>
  );
};
