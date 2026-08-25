import { getAdminCategories } from "../_actions/adminActions";
import CategoryManagement from "../_components/CategoryManagement";

const CategoriesPage = async () => {
  const result = await getAdminCategories();

  const categories = result.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Category Management
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create and manage service categories.
        </p>
      </div>

      {/* Error */}
      {!result.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {result.message ||
            "Failed to load categories"}
        </div>
      )}

      <CategoryManagement categories={categories} />
    </div>
  );
};

export default CategoriesPage;