'use client'

import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-full max-w-[400px] h-[300px]">
                <Image
                    src={'/loading.webp'}
                    alt={'Страница не найдена'}
                    fill
                    className="object-contain"
                />
            </div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <h1 className="text-4xl font-bold mb-4 mt-6">Загрузка...</h1>
        </div>
    );
}