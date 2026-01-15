"use client";

import { useState, useCallback } from "react";

// ==================== TYPES ====================
export interface AISection {
  layout: string;
  animation: string | null;
  order: number;
}

export interface AIRecommendation {
  rank: number;
  name: string;
  description: string;
  sections: AISection[];
  navbar: {
    type: string;
    animation: string;
  };
  footer: {
    type: string;
    animation: string;
  };
  background: {
    type: string;
  };
}

export interface AILayoutResponse {
  recommendations: AIRecommendation[];
  userInput: string;
}

// ==================== AI LAYOUT GENERATOR HOOK ====================
export function useAILayoutGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<AIRecommendation | null>(null);

  const generateLayouts = useCallback(async (userInput: string) => {
    if (!userInput.trim()) {
      setError("กรุณากรอกคำอธิบายความต้องการ");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setSelectedRecommendation(null);

    try {
      const response = await fetch("/api/ai/layout-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate layouts");
      }

      const data: AILayoutResponse = await response.json();
      console.log("data AILayoutResponse", data);
      setRecommendations(data.recommendations);

      // Auto select first recommendation
      if (data.recommendations.length > 0) {
        setSelectedRecommendation(data.recommendations[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการสร้าง Layout");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectRecommendation = useCallback((recommendation: AIRecommendation) => {
    setSelectedRecommendation(recommendation);
  }, []);

  const clearRecommendations = useCallback(() => {
    setRecommendations([]);
    setSelectedRecommendation(null);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    recommendations,
    selectedRecommendation,
    generateLayouts,
    selectRecommendation,
    clearRecommendations,
  };
}

// ==================== AI INPUT COMPONENT ====================
interface AILayoutInputProps {
  onApplyLayout: (recommendation: AIRecommendation) => void;
  themeColor?: string;
}

export default function AILayoutInput({ onApplyLayout, themeColor = "#8b5cf6" }: AILayoutInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    isLoading,
    error,
    recommendations,
    selectedRecommendation,
    generateLayouts,
    selectRecommendation,
    clearRecommendations,
  } = useAILayoutGenerator();

  const handleGenerate = async () => {
    await generateLayouts(inputValue);
    setIsExpanded(true);
  };

  const handleApply = () => {
    if (selectedRecommendation) {
      onApplyLayout(selectedRecommendation);
      setIsExpanded(false);
      clearRecommendations();
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Input */}
      <div className="relative">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-lg">ใช้ AI แนะนำรูปแบบของเว็บไซต์ จากคำอธิบายของคุณ</span>
        </div>
        <div
          className="flex items-center gap-3 p-3 rounded-2xl bg-[#141414]/90 border border-[#262626] backdrop-blur-sm transition-all"
          style={{
            boxShadow: isExpanded ? `0 0 30px ${themeColor}20` : "none",
            borderColor: isExpanded ? `${themeColor}50` : "#262626"
          }}
        >
          {/* AI Icon */}
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${themeColor}20` }}
          >
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Head */}
              <circle cx="12" cy="12" r="8" fill="#23272F" stroke="#fff" strokeWidth="1.3" />
              {/* Eyes */}
              <circle cx="9" cy="13" r="1.2" fill="#fff" />
              <circle cx="15" cy="13" r="1.2" fill="#fff" />
              {/* Smile */}
              <path d="M10 16c.6.6 2.4.6 3 0" stroke="#fff" strokeWidth="1.1" fill="none" />
              {/* Antennae */}
              <line x1="12" y1="4" x2="12" y2="2.2" stroke="#fff" strokeWidth="1.2" />
              <circle cx="12" cy="2" r="0.6" fill="#fff" />
              <line x1="6.8" y1="7" x2="5.2" y2="5.6" stroke="#fff" strokeWidth="1.2" />
              <circle cx="5" cy="5.4" r="0.5" fill="#fff" />
              <line x1="17.2" y1="7" x2="18.8" y2="5.6" stroke="#fff" strokeWidth="1.2" />
              <circle cx="19" cy="5.4" r="0.5" fill="#fff" />
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="อธิบายเว็บไซต์ที่ต้องการ เช่น 'เว็บขายอาหาร' หรือ 'Portfolio นักออกแบบ'"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#52525b] text-sm"
            disabled={isLoading}
          />

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading || !inputValue.trim()}
            className="shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: themeColor,
              color: "#fff"
            }}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                กำลังวิเคราะห์...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI แนะนำ
              </span>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Recommendations Panel */}
      {isExpanded && recommendations.length > 0 && (
        <div
          className="mt-4 p-4 rounded-2xl bg-[#141414]/90 border backdrop-blur-sm"
          style={{ borderColor: `${themeColor}30` }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span style={{ color: themeColor }}>✨</span>
              <span className="text-sm font-medium text-white">AI แนะนำ {recommendations.length} รูปแบบ</span>
            </div>
            <button
              onClick={() => {
                setIsExpanded(false);
                clearRecommendations();
              }}
              className="p-1.5 rounded-lg hover:bg-[#262626] transition-colors"
            >
              <svg className="w-4 h-4 text-[#52525b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Recommendation Cards - 10 cards in 2 rows of 5 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
            {recommendations.map((rec) => (
              <button
                key={rec.rank}
                onClick={() => selectRecommendation(rec)}
                className={`p-3 rounded-xl border text-left transition-all ${selectedRecommendation?.rank === rec.rank
                  ? "border-2"
                  : "border-[#262626] hover:border-[#333]"
                  }`}
                style={{
                  backgroundColor: selectedRecommendation?.rank === rec.rank ? `${themeColor}10` : "#0d0d0d",
                  borderColor: selectedRecommendation?.rank === rec.rank ? themeColor : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{ backgroundColor: themeColor, color: "#fff" }}
                  >
                    {rec.rank}
                  </span>
                  <span className="text-xs font-medium text-white truncate">{rec.name}</span>
                </div>
                <p className="text-[10px] text-[#71717a] line-clamp-2">{rec.description}</p>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-[10px] text-[#52525b]">{rec.sections.length} sections</span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Recommendation Details */}
          {selectedRecommendation && (
            <div
              className="p-4 rounded-xl border"
              style={{ backgroundColor: `${themeColor}05`, borderColor: `${themeColor}20` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">
                    {selectedRecommendation.name}
                  </h4>
                  <p className="text-xs text-[#71717a]">{selectedRecommendation.description}</p>
                </div>
                <button
                  onClick={handleApply}
                  className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: themeColor }}
                >
                  ใช้รูปแบบนี้
                </button>
              </div>

              {/* Sections Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
                {selectedRecommendation.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-[#0d0d0d] border border-[#262626]"
                  >
                    <div className="text-[10px] text-[#52525b] mb-1">Section {section.order}</div>
                    <div className="text-xs text-white font-medium truncate">{section.layout}</div>
                    {section.animation && (
                      <div className="text-[10px] mt-1" style={{ color: themeColor }}>
                        ✦ {section.animation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Other Settings */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#262626]">
                <div className="text-center">
                  <div className="text-[10px] text-[#52525b] mb-1">Navbar</div>
                  <div className="text-xs text-white">{selectedRecommendation.navbar.animation}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[#52525b] mb-1">Footer</div>
                  <div className="text-xs text-white">{selectedRecommendation.footer.animation}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[#52525b] mb-1">Background</div>
                  <div className="text-xs text-white">{selectedRecommendation.background.type}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading Skeleton - 10 cards */}
      {isLoading && (
        <div className="mt-4 p-4 rounded-2xl bg-[#141414]/90 border border-[#262626]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
            <div className="h-4 w-32 bg-[#262626] rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="p-3 rounded-xl bg-[#0d0d0d] border border-[#262626]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-[#262626] animate-pulse" />
                  <div className="h-3 w-16 bg-[#262626] rounded animate-pulse" />
                </div>
                <div className="h-2 w-full bg-[#262626] rounded animate-pulse mb-1" />
                <div className="h-2 w-2/3 bg-[#262626] rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
