'use client'
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img
                className='pt-[40px] pb-[20px]'
                src={'/not-found.webp'}
                alt={'Страница не найдена'}>
            </img>
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">Леееее, друг, видимо ты зашел не туда. Такой страницы не существует, проверь путь ещё раз.</p>
            <a
                href="/"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Вернуться на главную
            </a>
        </div>
    );
}