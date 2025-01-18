import RepositoryInput from "@/components/analyzer/RepositoryInput";

export default function Analyze() {
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Analyze Your GitHub Repository
      </h1>
      <RepositoryInput />
    </div>
  );
}
