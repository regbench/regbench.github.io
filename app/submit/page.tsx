import Link from 'next/link';

export default function Submit() {
  return (
    <main className="max-w-5xl mx-auto p-8 font-sans text-gray-900">
      <header className="mb-12 border-b pb-6">
        <h1 className="text-4xl font-bold mb-4">RegBench: Submission Portal</h1>
        <nav className="flex gap-4">
          <Link href="/" className="text-blue-600 hover:underline font-medium">← Back to Leaderboard</Link>
        </nav>
      </header>

      <section className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold mb-3">Double-Blind Submission Instructions</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Ensure your generated prediction files (JSON/JSONL) contain no identifying metadata.</li>
          <li>Provide an anonymous team name and a brief description of your prompting methodology or fine-tuning setup.</li>
          <li>If providing a Google Drive link to your predictions, ensure the sharing permissions are set to "Anyone with the link" and the host account is anonymous.</li>
        </ul>
      </section>

      <section className="flex justify-center w-full">
        {/* [PLACEHOLDER: REPLACE THE iframe BELOW WITH YOUR GOOGLE FORM EMBED CODE] */}
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg text-gray-500">
           [PLACEHOLDER: Google Form Iframe Will Render Here]
        </div>
      </section>
    </main>
  );
}