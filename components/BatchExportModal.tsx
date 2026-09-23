"use client";

import React, { useState } from "react";
import {
  ShortPrompt,
  getYouTubeTitle,
  getYouTubeDescription,
  getYouTubeTags,
  getFullVideoGeneratorPrompt
} from "@/lib/shorts-data";
import { X, Download, Copy, Check, FileJson, FileSpreadsheet, FileText } from "lucide-react";

interface BatchExportModalProps {
  shorts: ShortPrompt[];
  onClose: () => void;
}

export function BatchExportModal({ shorts, onClose }: BatchExportModalProps) {
  const [exportFormat, setExportFormat] = useState<"json" | "csv" | "markdown">("json");
  const [copied, setCopied] = useState(false);

  // Generate enriched JSON
  const getJsonString = () => {
    const enriched = shorts.map((s) => ({
      ...s,
      youtubeTitle: getYouTubeTitle(s),
      youtubeDescription: getYouTubeDescription(s),
      youtubeTags: getYouTubeTags(s),
      fullVideoGeneratorPrompt: getFullVideoGeneratorPrompt(s)
    }));
    return JSON.stringify(enriched, null, 2);
  };

  // Generate enriched CSV
  const getCsvString = () => {
    const headers = [
      "ID",
      "Title",
      "Category",
      "YouTube Title",
      "YouTube Tags",
      "YouTube Description",
      "Video Generator Prompt",
      "Joke Setup",
      "Joke Punchline",
      "Visual Metaphor",
      "Camera Angle",
      "Lighting",
      "Duration",
      "Aspect Ratio"
    ];

    const rows = shorts.map((s) => [
      s.id,
      `"${s.title.replace(/"/g, '""')}"`,
      `"${s.category}"`,
      `"${getYouTubeTitle(s).replace(/"/g, '""')}"`,
      `"${getYouTubeTags(s).replace(/"/g, '""')}"`,
      `"${getYouTubeDescription(s).replace(/"/g, '""')}"`,
      `"${getFullVideoGeneratorPrompt(s).replace(/"/g, '""')}"`,
      `"${s.cleanJokeCore.setup.replace(/"/g, '""')}"`,
      `"${s.cleanJokeCore.punchline.replace(/"/g, '""')}"`,
      `"${s.visualMetaphor.replace(/"/g, '""')}"`,
      `"${s.cameraAngle.replace(/"/g, '""')}"`,
      `"${s.lighting.replace(/"/g, '""')}"`,
      `"${s.targetDuration}"`,
      `"${s.aspectRatio}"`
    ]);

    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  };

  // Generate enriched Markdown
  const getMarkdownString = () => {
    let md = `# 50 Hollywood 10-Second YouTube Shorts Clean Joke Prompts Bible\n\n`;
    md += `Aspect Ratio: 9:16 Vertical (1080x1920) | Narration: British Young Female Voice\n\n`;
    md += `Total Content: ${shorts.length} Production Ready Shorts with YouTube Publishing Metadata\n\n---\n\n`;

    shorts.forEach((s) => {
      md += `## Prompt #${s.id}: ${s.title} (${s.category})\n\n`;
      md += `### 🎬 Video Generation Prompt\n\`\`\`\n${getFullVideoGeneratorPrompt(s)}\n\`\`\`\n\n`;
      md += `### 🏷️ YouTube Title\n\`${getYouTubeTitle(s)}\`\n\n`;
      md += `### 📝 YouTube Description\n\`\`\`\n${getYouTubeDescription(s)}\n\`\`\`\n\n`;
      md += `### 🔖 YouTube Tags\n\`${getYouTubeTags(s)}\`\n\n`;
      md += `- **Clean Joke Setup**: "${s.cleanJokeCore.setup}"\n`;
      md += `- **Clean Joke Punchline**: "${s.cleanJokeCore.punchline}"\n`;
      md += `- **Visual Metaphor**: ${s.visualMetaphor}\n`;
      md += `- **Camera Angle**: ${s.cameraAngle}\n`;
      md += `- **Lighting**: ${s.lighting}\n\n---\n\n`;
    });

    return md;
  };

  const getExportContent = () => {
    if (exportFormat === "csv") return getCsvString();
    if (exportFormat === "markdown") return getMarkdownString();
    return getJsonString();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getExportContent();
    const mimeTypes = {
      json: "application/json",
      csv: "text/csv;charset=utf-8;",
      markdown: "text/markdown;charset=utf-8;"
    };
    const extensions = { json: "json", csv: "csv", markdown: "md" };

    const blob = new Blob([content], { type: mimeTypes[exportFormat] });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `50_hollywood_shorts_prompts.${extensions[exportFormat]}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-red-500" />
              Batch Export 50 Prompts & YouTube Metadata
            </h3>
            <p className="text-xs text-neutral-400">
              Includes Video Generator Prompts, YouTube Titles, Descriptions & Tags
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto">
          
          {/* Format Selector */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setExportFormat("json")}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                exportFormat === "json"
                  ? "bg-red-600/10 border-red-500 text-white"
                  : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <FileJson className="w-5 h-5 text-red-400" />
              <span className="text-xs font-bold">JSON Data</span>
              <span className="text-[10px] text-neutral-500">Programmatic API format</span>
            </button>

            <button
              onClick={() => setExportFormat("csv")}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                exportFormat === "csv"
                  ? "bg-amber-600/10 border-amber-500 text-white"
                  : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <FileSpreadsheet className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold">CSV Spreadsheet</span>
              <span className="text-[10px] text-neutral-500">Excel / Google Sheets queue</span>
            </button>

            <button
              onClick={() => setExportFormat("markdown")}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                exportFormat === "markdown"
                  ? "bg-purple-600/10 border-purple-500 text-white"
                  : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <FileText className="w-5 h-5 text-purple-400" />
              <span className="text-xs font-bold">Markdown Bible</span>
              <span className="text-[10px] text-neutral-500">Notion / Obsidian doc</span>
            </button>
          </div>

          {/* Preview Window */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-neutral-400 px-1 font-mono">
              <span>Preview ({exportFormat.toUpperCase()}):</span>
              <span>{shorts.length} Items</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black border border-neutral-800 font-mono text-xs text-neutral-300 max-h-56 overflow-y-auto whitespace-pre">
              {getExportContent().slice(0, 1500)}
              {getExportContent().length > 1500 ? "\n\n... [remaining content truncated for preview]" : ""}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between gap-3">
          <span className="text-xs text-neutral-400 font-mono">
            Format: {exportFormat.toUpperCase()}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied All!" : "Copy to Clipboard"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download .{exportFormat}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
