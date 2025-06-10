'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
    TrendingUp,
} from 'lucide-react';
import { CarWorthSection } from './sections';



export function WhatsYourCarWorthPage() {
    const [activeTab, setActiveTab] = useState('worth');

    const tabs = [
        { id: 'worth', label: "What's your car worth?", icon: TrendingUp, badge: null }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Tab Navigation */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <tab.icon className="h-5 w-5" />
                                <span className="font-medium">{tab.label}</span>
                                {tab.badge && (
                                    <Badge className="bg-orange-500 text-white text-xs">
                                        {tab.badge}
                                    </Badge>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <main className="container mx-auto px-4 py-8">
                {activeTab === 'worth' && <CarWorthSection />}
            </main>
        </div>
    );
}

