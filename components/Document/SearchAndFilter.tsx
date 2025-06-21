'use client'

import { useState } from 'react'
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = ["Tất cả", "Đơn", "Tiêm chủng", "Thuốc men", "Khẩn cấp", "Hướng dẫn", "Dị ứng"]

const SearchAndFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <div className="flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Search Input - Wider and with focus effects */}
            <div className={`relative flex-[0.8] group transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-all duration-300 
                    ${isSearchFocused ? 'text-blue-600 scale-110' : 'text-blue-400'}`} />
                <Input
                    placeholder="Tìm kiếm tài liệu..."
                    className="pl-12 pr-4 py-4 h-12 text-base rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                />
                <div className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-50 to-white opacity-0 transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : ''}`}></div>
            </div>

            {/* Categories Filter - Better scrolling and button styling */}
            <div className="flex-[1.2] flex gap-3 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-200 scrollbar-track-transparent">
                {categories.map((category, index) => {
                    const isSelected = category === selectedCategory;
                    return (
                        <Button
                            key={category}
                            variant={isSelected ? "default" : "outline"}
                            size="default"
                            onClick={() => setSelectedCategory(category)}
                            className={`min-w-max px-4 h-10 transition-all duration-200 ease-out
                                ${isSelected ?
                                'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-600 scale-105' :
                                'bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'}
                                active:scale-95 transform-gpu
                                ${index === 0 ? 'ml-2' : ''}`}
                        >
                            {category}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchAndFilter