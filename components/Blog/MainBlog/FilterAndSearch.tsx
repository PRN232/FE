import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const categories = [
    "Tất cả",
    "Khám sức khỏe",
    "Dị ứng",
    "Tiêm chủng",
    "Dinh dưỡng",
    "Sức khỏe tinh thần",
    "Sơ cứu khẩn cấp",
]

const FilterAndSearch = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Tìm bài viết..." className="pl-10" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={category === "Tất cả" ? "default" : "outline"}
                        size="sm"
                        className="whitespace-nowrap transition-all duration-200 hover:scale-105"
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>
    )
}
export default FilterAndSearch
