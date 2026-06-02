'use client';

import { useState, useRef } from 'react';

interface FormData {
  title: string;
  url: string;
  imageUrl: string;
  category: string;
  description: string;
}

export function AdminPanel() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    url: '',
    imageUrl: '',
    category: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [csvMessage, setCsvMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle single website form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Website added successfully!' });
        setFormData({
          title: '',
          url: '',
          imageUrl: '',
          category: '',
          description: '',
        });
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message || 'Failed to add website' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error adding website' });
    } finally {
      setLoading(false);
    }
  };

  // Handle CSV bulk import
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvMessage(null);
    setLoading(true);

    try {
      const text = await file.text();
      const lines = text.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

      const websites = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.trim());
          const obj: Record<string, string> = {};
          headers.forEach((header, index) => {
            obj[header] = values[index] || '';
          });
          return obj;
        });

      const response = await fetch('/api/admin/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ websites }),
      });

      if (response.ok) {
        const result = await response.json();
        setCsvMessage({
          type: 'success',
          text: `Imported ${result.success} websites successfully!`,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        const error = await response.json();
        setCsvMessage({ type: 'error', text: error.message || 'Failed to import websites' });
      }
    } catch {
      setCsvMessage({ type: 'error', text: 'Error processing CSV file' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg-primary py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Admin Panel</h1>
          <p className="text-text-secondary">Manage your website collection</p>
        </div>

        {/* Add Single Website Section */}
        <div className="bg-bg-secondary rounded-lg p-8 border border-bg-hover/20">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Add Website</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-bg-tertiary border border-bg-hover text-text-primary rounded-lg focus:outline-none focus:border-text-secondary transition-colors"
                placeholder="Website title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                URL *
              </label>
              <input
                type="url"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 bg-bg-tertiary border border-bg-hover text-text-primary rounded-lg focus:outline-none focus:border-text-secondary transition-colors"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Image URL *
              </label>
              <input
                type="url"
                required
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 bg-bg-tertiary border border-bg-hover text-text-primary rounded-lg focus:outline-none focus:border-text-secondary transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-bg-tertiary border border-bg-hover text-text-primary rounded-lg focus:outline-none focus:border-text-secondary transition-colors"
                placeholder="e.g., SaaS, E-commerce, Portfolio"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-bg-tertiary border border-bg-hover text-text-primary rounded-lg focus:outline-none focus:border-text-secondary transition-colors resize-none"
                placeholder="Website description"
                rows={4}
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg text-sm ${
                  message.type === 'success'
                    ? 'bg-green-900/20 text-green-400 border border-green-900/50'
                    : 'bg-red-900/20 text-red-400 border border-red-900/50'
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-bg-hover hover:bg-bg-hover/80 text-text-primary rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Website'}
            </button>
          </form>
        </div>

        {/* Bulk Import Section */}
        <div className="bg-bg-secondary rounded-lg p-8 border border-bg-hover/20">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Bulk Import (CSV)</h2>

          <div className="space-y-4">
            <p className="text-text-secondary text-sm">
              Upload a CSV file with columns: title, url, imageUrl, category, description
            </p>

            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={loading}
                className="flex-1"
              />
            </div>

            {csvMessage && (
              <div
                className={`p-4 rounded-lg text-sm ${
                  csvMessage.type === 'success'
                    ? 'bg-green-900/20 text-green-400 border border-green-900/50'
                    : 'bg-red-900/20 text-red-400 border border-red-900/50'
                }`}
              >
                {csvMessage.text}
              </div>
            )}

            <div className="text-xs text-text-tertiary bg-bg-tertiary p-4 rounded-lg">
              <p className="font-semibold mb-2">CSV Format Example:</p>
              <code>title,url,imageUrl,category,description</code>
              <br />
              <code>My Website,https://example.com,https://example.com/image.jpg,SaaS,A great website</code>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
