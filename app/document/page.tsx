import SearchAndFilter from "@/components/Document/SearchAndFilter";
import DocumentCard from "@/components/Document/DocumentCard";
import QuickAccess from "@/components/Document/QuickAccess";

import {documents} from "@/lib/data/mock-data";

const DocumentsPage = () => {
    return (
        <div className="flex-1 space-y-8 p-6 md:p-10 pt-8 bg-gradient-to-br from-white to-blue-50 min-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-blue-900 drop-shadow-md">
                        Health Documents
                    </h2>
                    <p className="text-muted-foreground text-lg mt-1 drop-shadow-sm">
                        Access important health forms, guidelines, and documentation
                    </p>
                </div>
            </div>

            {/* Search and Filter */}
            <SearchAndFilter />

            {/* Documents Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {documents.map((doc) => (
                    <DocumentCard key={doc.id} {...doc} />
                ))}
            </div>

            {/* Quick Access Section */}
            <QuickAccess />
        </div>
    )
}

export default DocumentsPage