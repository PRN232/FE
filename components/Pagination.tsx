import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
                        currentPage,
                        totalPages,
                        onPageChange
}: PaginationProps) => {
    const maxVisiblePages = 5;

    const getPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
                Trước
            </Button>

            {getPageNumbers().map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className={`${currentPage === page ? 'bg-red-600 text-white' : 'border-red-200 text-red-600 hover:bg-red-50'}`}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
                Sau
            </Button>
        </div>
    );
};

export default Pagination;