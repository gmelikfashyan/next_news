'use client'
import Image from 'next/image'

export default function ErrorPage({error}: {error: Error}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="relative w-full max-w-[400px] h-[300px]">
                <Image
                    src={'/error.png'}
                    alt={'Страница не найдена'}
                    fill
                    className="object-contain"
                />
            </div>
            <h1 className="text-4xl font-bold mb-4 mt-6">Ошибка</h1>
            <h2 className="text-xl text-center">
                Мы очень извиняемся, но что-то пошло не так: {error.message}
            </h2>
        </div>
    )
}