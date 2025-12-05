import { useState } from "react";

interface TagInputProps {
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[]; // optional suggestion for placeholder
}

export default function TagInput({
  label,
  value,
  onChange,
  suggestions = [],
}: TagInputProps) {
  const [input, setInput] = useState("");

  const placeholder =
    suggestions.length > 0
      ? `e.g., ${suggestions.join(", ")}`
      : "Type and press Enter";

  const addTag = () => {
    const tag = input.trim();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-mediqr-dark mb-1">
        {label}
      </label>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-mediqr/10 rounded-full text-sm flex items-center gap-2 border border-mediqr/30"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-mediqr-dark hover:text-red-600"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* Input with static placeholder */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-mediqr-accent/50 
          bg-white/70 shadow-sm placeholder-mediqr-text/40
          focus:outline-none focus:ring-2 focus:ring-mediqr transition-all"
      />
    </div>
  );
}
