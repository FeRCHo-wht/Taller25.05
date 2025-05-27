// Header Component
import React from 'react';

        export function Header({ activeTab, setActiveTab }) {
            const tabs = [
                { id: 'libros', name: 'Libros', icon: '📚' },
                { id: 'autores', name: 'Autores', icon: '✍️' },
                { id: 'generos', name: 'Géneros', icon: '🏷️' },
                { id: 'prestamos', name: 'Préstamos', icon: '📋' }
            ];

            return (
                <header className="bg-white shadow-lg border-b-4 border-blue-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    🏛️ Sistema de Biblioteca Académica
                                </h1>
                            </div>
                            <nav className="flex space-x-8">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="mr-2">{tab.icon}</span>
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </header>
            );
        }