"use client";

import { useState, useCallback, useEffect } from "react";

// ==================== TYPES ====================
export interface AISection {
  layout: string;
  animation: string | null;
  order: number;
  customLayout?: string;
  customLayoutLabel?: string;
  customLayoutDescription?: string;
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
  isCustom?: boolean;
  customLayoutId?: string;
  designConcept?: string;
  targetAudience?: string;
  uniqueFeatures?: string[];
}

export interface AILayoutResponse {
  recommendations: AIRecommendation[];
  customRecommendations?: AIRecommendation[];
  userInput: string;
  meta?: {
    standardCount: number;
    customCount: number;
    totalCount: number;
  };
}

// History item with timestamp
interface HistoryItem {
  id: string;
  timestamp: number;
  userInput: string;
  recommendations: AIRecommendation[];
  customRecommendations?: AIRecommendation[];
  appliedRecommendation?: AIRecommendation;
}

// ==================== SESSION STORAGE HELPERS ====================
const STORAGE_KEY = "ai_layout_history";

function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryItem[]) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    console.warn("Failed to save history to sessionStorage");
  }
}

function addToHistory(item: HistoryItem) {
  const history = getHistory();
  // Keep only last 20 items
  const newHistory = [item, ...history].slice(0, 20);
  saveHistory(newHistory);
  return newHistory;
}

function clearHistory() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

// ==================== AI LAYOUT GENERATOR HOOK ====================
export function useAILayoutGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [customRecommendations, setCustomRecommendations] = useState<AIRecommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<AIRecommendation | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentHistoryId, setCurrentHistoryId] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const generateLayouts = useCallback(async (userInput: string) => {
    if (!userInput.trim()) {
      setError("กรุณากรอกคำอธิบายความต้องการ");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setCustomRecommendations([]);
    setSelectedRecommendation(null);

    try {
      const response = await fetch("/api/ai/layout-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) throw new Error("Failed to generate layouts");

      const data: AILayoutResponse = await response.json();
      setRecommendations(data.recommendations || []);
      setCustomRecommendations(data.customRecommendations || []);

      // Auto select first recommendation
      if (data.recommendations && data.recommendations.length > 0) {
        setSelectedRecommendation(data.recommendations[0]);
      }

      // Save to history
      const historyItem: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        timestamp: Date.now(),
        userInput,
        recommendations: data.recommendations || [],
        customRecommendations: data.customRecommendations || [],
      };
      const newHistory = addToHistory(historyItem);
      setHistory(newHistory);
      setCurrentHistoryId(historyItem.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการสร้าง Layout");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectRecommendation = useCallback((recommendation: AIRecommendation) => {
    setSelectedRecommendation(recommendation);
  }, []);

  const loadFromHistory = useCallback((item: HistoryItem) => {
    setRecommendations(item.recommendations);
    setCustomRecommendations(item.customRecommendations || []);
    console.log("loadFromHistory", item);
    setSelectedRecommendation(item.appliedRecommendation || item.recommendations[0] || null);
    setCurrentHistoryId(item.id);
    setError(null);
  }, []);

  const markAsApplied = useCallback((recommendation: AIRecommendation) => {
    if (!currentHistoryId) return;

    const updatedHistory = history.map(item =>
      item.id === currentHistoryId
        ? { ...item, appliedRecommendation: recommendation }
        : item
    );
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  }, [currentHistoryId, history]);

  const clearAllHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const removeHistoryItem = useCallback((itemId: string) => {
    const updatedHistory = history.filter(item => item.id !== itemId);
    setHistory(updatedHistory);
    saveHistory(updatedHistory);

    // If the removed item was the current one, clear recommendations
    if (currentHistoryId === itemId) {
      setRecommendations([]);
      setCustomRecommendations([]);
      setSelectedRecommendation(null);
      setCurrentHistoryId(null);
    }
  }, [history, currentHistoryId]);

  const clearRecommendations = useCallback(() => {
    setRecommendations([]);
    setCustomRecommendations([]);
    setSelectedRecommendation(null);
    setError(null);
    setCurrentHistoryId(null);
  }, []);

  return {
    isLoading,
    error,
    recommendations,
    customRecommendations,
    selectedRecommendation,
    history,
    currentHistoryId,
    generateLayouts,
    selectRecommendation,
    loadFromHistory,
    markAsApplied,
    clearAllHistory,
    removeHistoryItem,
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
  const [showHistory, setShowHistory] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const {
    isLoading,
    error,
    recommendations,
    customRecommendations,
    selectedRecommendation,
    history,
    generateLayouts,
    selectRecommendation,
    loadFromHistory,
    markAsApplied,
    clearAllHistory,
    removeHistoryItem,
    clearRecommendations,
  } = useAILayoutGenerator();

  const handleGenerate = async () => {
    setIsApplied(false); // Reset applied state when generating new recommendations
    await generateLayouts(inputValue);
    setIsExpanded(true);
  };

  const handleApply = () => {
    if (selectedRecommendation) {
      onApplyLayout(selectedRecommendation);
      markAsApplied(selectedRecommendation);
      setIsApplied(true); // Mark as applied

      // Scroll to Live Preview section after a short delay to ensure DOM is updated
      setTimeout(() => {
        const livePreviewElement = document.getElementById("live-preview");
        if (livePreviewElement) {
          livePreviewElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
      // UI stays open - user can close manually
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setIsApplied(false); // Reset applied state when closing
    clearRecommendations();
  };

  const handleLoadHistory = (item: HistoryItem) => {
    loadFromHistory(item);
    setInputValue(item.userInput);
    setIsExpanded(true);
    setShowHistory(false);
    setIsApplied(false); // Reset applied state when loading from history
  };

  // Reset applied state when a different recommendation is selected
  useEffect(() => {
    setIsApplied(false);
  }, [selectedRecommendation?.rank, selectedRecommendation?.isCustom]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
  };

  // Helper to get contrasting text color
  const getContrastColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000" : "#fff";
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {/* ==================== MAIN INPUT BAR ==================== */}
      <div className="relative">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div
            className="h-px flex-1 max-w-[60px]"
            style={{ background: `linear-gradient(to right, transparent, ${themeColor}40)` }}
          />
          <span className="text-sm font-medium tracking-wide text-[#a1a1aa]">
            AI Layout Generator
          </span>
          <div
            className="h-px flex-1 max-w-[60px]"
            style={{ background: `linear-gradient(to left, transparent, ${themeColor}40)` }}
          />
        </div>

        <div className="flex flex-col md:flex-row  items-center justify-between gap-2">
          <div
            className="w-full flex items-center gap-3 p-1 sm:p-2 rounded-2xl backdrop-blur-xl transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(30,30,30,0.9) 100%)",
              boxShadow: isExpanded
                ? `0 8px 32px ${themeColor}25, 0 0 0 1px ${themeColor}30, inset 0 1px 0 rgba(255,255,255,0.05)`
                : "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
              border: `1px solid ${isExpanded ? themeColor + "40" : "#333"}`,
            }}
          >
            {/* AI Robot Icon */}
            <div
              className="shrink-0 w-12 h-12 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${themeColor}30 0%, ${themeColor}10 100%)`,
                border: `1px solid ${themeColor}30`
              }}
              onClick={() => setShowHistory(!showHistory)}
              title="ดูประวัติ"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at center, ${themeColor}20 0%, transparent 70%)` }}
              />
              <svg className="w-6 h-6 relative z-10 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" fill={`${themeColor}40`} stroke={themeColor} strokeWidth="1.5" />
                <circle cx="9" cy="11" r="1.5" fill="#fff" />
                <circle cx="15" cy="11" r="1.5" fill="#fff" />
                <path d="M9 15c.8 1 2.2 1.5 3 1.5s2.2-.5 3-1.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <line x1="12" y1="4" x2="12" y2="1.5" stroke={themeColor} strokeWidth="1.5" />
                <circle cx="12" cy="1" r="1" fill={themeColor} />
              </svg>
              {/* History indicator badge */}
              {history.length > 0 && (
                <div
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{ backgroundColor: themeColor, color: getContrastColor(themeColor) }}
                >
                  {history.length > 9 ? "9+" : history.length}
                </div>
              )}
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="อธิบายเว็บไซต์ เช่น 'ร้านอาหาร' 'Portfolio' 'SaaS Landing'"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#52525b] text-sm min-w-0 h-[32px] pl-4 hover:bg-white/5 hover:rounded-md hover:text-white transition-all duration-300"
              disabled={isLoading}
            />

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isLoading || !inputValue.trim()}
                className="cursor-pointer px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}cc 100%)`,
                  boxShadow: `0 4px 15px ${themeColor}40`,
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)" }}
                />
                {isLoading ? (
                  <span className="flex items-center gap-2 relative z-10">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="hidden sm:inline">กำลังสร้าง...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2 relative z-10 text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="hidden sm:inline">สร้าง Layout</span>
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* History Toggle Button */}
          <div className={`cursor-pointer flex items-center w-[200px] rounded-xl ${showHistory ? "bg-white/10" : "hover:bg-white/5"}`}
            onClick={() => setShowHistory(!showHistory)}
          >
            <button
              className={`p-2 rounded-lg transition-all duration-200 `}
              title="ประวัติการใช้งาน"
            >
              <svg className="w-5 h-5" style={{ color: showHistory ? themeColor : "#71717a" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <span className="text-sm font-medium tracking-wide text-[#a1a1aa]"> ประวัติการใช้งาน AI</span>
          </div>

        </div>

        {/* Error Message */}
        {error && (
          <div
            className="mt-3 p-3 rounded-xl text-sm flex items-center gap-2"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#fca5a5"
            }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
      </div>

      {/* ==================== HISTORY PANEL (Slide Down) ==================== */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${showHistory ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
      >
        <div
          className="rounded-2xl p-4 backdrop-blur-xl"
          style={{
            background: "linear-gradient(135deg, rgba(15,15,15,0.95) 0%, rgba(25,25,25,0.9) 100%)",
            border: "1px solid #333",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" style={{ color: themeColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-white">ประวัติการใช้งาน</span>
              <span className="text-xs text-[#52525b]">({history.length} รายการ)</span>
            </div>
            {history.length > 0 && (
              <button
                onClick={clearAllHistory}
                className="text-xs text-red-400/70 hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                ล้างทั้งหมด
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-8 text-[#52525b] text-sm">
              <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              ยังไม่มีประวัติ - ลองสร้าง Layout ใหม่ดูสิ
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl text-left transition-all duration-200 group relative"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid #262626",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${themeColor}50`;
                    e.currentTarget.style.background = `${themeColor}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#262626";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeHistoryItem(item.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500/20"
                    title="ลบรายการนี้"
                    style={{ color: "#ef4444" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  {/* Content */}
                  <button
                    onClick={() => handleLoadHistory(item)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2 pr-6">
                      <span className="text-xs font-medium text-white truncate flex-1">
                        &quot;{item.userInput}&quot;
                      </span>
                      {item.appliedRecommendation && (
                        <span
                          className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-medium"
                          style={{ backgroundColor: `${themeColor}30`, color: themeColor }}
                        >
                          ใช้แล้ว
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-[#52525b]">
                      <span>{formatTime(item.timestamp)}</span>
                      <span>•</span>
                      <span>
                        {item.recommendations.length + (item.customRecommendations?.length || 0)} ผลลัพธ์
                        {item.customRecommendations && item.customRecommendations.length > 0 && (
                          <span className="ml-1" style={{ color: themeColor }}>
                            ({item.customRecommendations.length} custom)
                          </span>
                        )}
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ==================== RECOMMENDATIONS PANEL ==================== */}
      <div
        className={`transition-all duration-500 ease-out ${isExpanded && (recommendations.length > 0 || customRecommendations.length > 0) ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div
          className="rounded-2xl p-4 sm:p-5 backdrop-blur-xl"
          style={{
            background: "linear-gradient(135deg, rgba(12,12,12,0.98) 0%, rgba(20,20,20,0.95) 100%)",
            border: `1px solid ${themeColor}25`,
            boxShadow: `0 12px 40px ${themeColor}15, inset 0 1px 0 rgba(255,255,255,0.03)`,
          }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${themeColor}20` }}
              >
                <span className="text-base">✨</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  AI แนะนำ {recommendations.length + customRecommendations.length} รูปแบบ
                  {customRecommendations.length > 0 && (
                    <span className="ml-2 text-xs font-normal" style={{ color: themeColor }}>
                      ({recommendations.length} มาตรฐาน + {customRecommendations.length} แบบกำหนดเอง)
                    </span>
                  )}
                </h3>
                <p className="text-[10px] text-[#52525b]">เลือกรูปแบบที่เหมาะกับความต้องการของคุณ</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-white/5 transition-all duration-200 group"
              title="ปิด"
            >
              <svg className="w-5 h-5 text-[#52525b] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Standard Recommendations Section */}
          {recommendations.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-white">รูปแบบมาตรฐาน</span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${themeColor}40, transparent)` }} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {recommendations.map((rec, index) => (
                  <button
                    key={rec.rank}
                    onClick={() => selectRecommendation(rec)}
                    className="cursor-pointer p-3 rounded-xl text-left transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: selectedRecommendation?.rank === rec.rank && !selectedRecommendation?.isCustom
                        ? `linear-gradient(135deg, ${themeColor}15 0%, ${themeColor}08 100%)`
                        : "rgba(255,255,255,0.02)",
                      border: selectedRecommendation?.rank === rec.rank && !selectedRecommendation?.isCustom
                        ? `2px solid ${themeColor}`
                        : "1px solid #262626",
                      boxShadow: selectedRecommendation?.rank === rec.rank && !selectedRecommendation?.isCustom
                        ? `0 4px 20px ${themeColor}20`
                        : "none",
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Hover gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${themeColor}08 0%, transparent 60%)` }}
                    />

                    {/* Card content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{
                            background: selectedRecommendation?.rank === rec.rank && !selectedRecommendation?.isCustom
                              ? themeColor
                              : `${themeColor}40`,
                            color: selectedRecommendation?.rank === rec.rank && !selectedRecommendation?.isCustom
                              ? getContrastColor(themeColor)
                              : "#fff"
                          }}
                        >
                          {rec.rank}
                        </span>
                        <span className="text-xs font-medium text-white truncate">{rec.name}</span>
                      </div>
                      <p className="text-[10px] text-[#71717a] line-clamp-2 mb-2 leading-relaxed">{rec.description}</p>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${themeColor}15`, color: `${themeColor}` }}
                        >
                          {rec.sections.length} sections
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Recommendations Section */}
          {customRecommendations.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  <span style={{ color: themeColor }}>✨</span>
                  รูปแบบกำหนดเอง (Custom)
                </span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${themeColor}40, transparent)` }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {customRecommendations.map((rec, index) => (
                  <button
                    key={`custom-${rec.rank}`}
                    onClick={() => selectRecommendation(rec)}
                    className="cursor-pointer p-4 rounded-xl text-left transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: selectedRecommendation?.isCustom && selectedRecommendation?.rank === rec.rank
                        ? `linear-gradient(135deg, ${themeColor}20 0%, ${themeColor}10 100%)`
                        : "rgba(255,255,255,0.03)",
                      border: selectedRecommendation?.isCustom && selectedRecommendation?.rank === rec.rank
                        ? `2px solid ${themeColor}`
                        : `1px solid ${themeColor}30`,
                      boxShadow: selectedRecommendation?.isCustom && selectedRecommendation?.rank === rec.rank
                        ? `0 4px 20px ${themeColor}30`
                        : `0 2px 10px ${themeColor}10`,
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Hover gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${themeColor}15 0%, transparent 60%)` }}
                    />

                    {/* Custom badge */}
                    <div className="absolute top-2 right-2">
                      <span
                        className="text-[8px] px-2 py-1 rounded-full font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${themeColor}30`,
                          color: themeColor,
                          border: `1px solid ${themeColor}50`
                        }}
                      >
                        Custom
                      </span>
                    </div>

                    {/* Card content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-6 h-6 rounded-md text-[11px] font-bold flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{
                            background: selectedRecommendation?.isCustom && selectedRecommendation?.rank === rec.rank
                              ? themeColor
                              : `${themeColor}50`,
                            color: selectedRecommendation?.isCustom && selectedRecommendation?.rank === rec.rank
                              ? getContrastColor(themeColor)
                              : "#fff"
                          }}
                        >
                          C{rec.rank}
                        </span>
                        <span className="text-sm font-semibold text-white truncate flex-1">{rec.name}</span>
                      </div>
                      <p className="text-[11px] text-[#a1a1aa] line-clamp-2 mb-3 leading-relaxed">{rec.description}</p>

                      {/* Custom info */}
                      {rec.designConcept && (
                        <div className="mb-2 p-2 rounded-lg" style={{ background: "rgba(0,0,0,0.2)" }}>
                          <p className="text-[10px] text-[#71717a] mb-1">แนวคิด:</p>
                          <p className="text-[10px] text-white line-clamp-2">{rec.designConcept}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${themeColor}15`, color: `${themeColor}` }}
                        >
                          {rec.sections.length} sections
                        </span>
                        {rec.targetAudience && (
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${themeColor}10`, color: `${themeColor}cc` }}
                          >
                            👥 {rec.targetAudience}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Recommendation Details */}
          {selectedRecommendation && (
            <div
              className="rounded-xl p-4 sm:p-5 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${themeColor}08 0%, rgba(0,0,0,0.3) 100%)`,
                border: `1px solid ${themeColor}20`
              }}
            >
              {/* Background decoration */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl"
                style={{ background: themeColor }}
              />

              {/* Header with Apply Button */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: themeColor, color: getContrastColor(themeColor) }}
                    >
                      {selectedRecommendation.rank}
                    </span>
                    <h4 className="text-base font-semibold text-white">{selectedRecommendation.name}</h4>
                  </div>
                  <p className="text-xs text-[#a1a1aa]">{selectedRecommendation.description}</p>
                </div>
                <button
                  onClick={handleApply}
                  className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
                    boxShadow: `0 4px 20px ${themeColor}40`,
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)" }}
                  />
                  <span className="cursor-pointer relative z-10 flex items-center gap-2 text-white">
                    {isApplied ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {isApplied ? "อัปเดตแล้ว" : "ใช้รูปแบบนี้"}
                  </span>
                </button>
              </div>

              {/* Custom Recommendation Info */}
              {selectedRecommendation.isCustom && (
                <div className="mb-4 p-3 rounded-lg relative z-10" style={{ background: "rgba(0,0,0,0.2)", border: `1px solid ${themeColor}30` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ color: themeColor }} className="text-sm">✨</span>
                    <span className="text-xs font-semibold text-white">รูปแบบกำหนดเอง</span>
                  </div>
                  {selectedRecommendation.designConcept && (
                    <div className="mb-2 flex items-center gap-1">
                      <p className="text-[10px] text-[#a1a1aa] mb-1">แนวคิดการออกแบบ:</p>
                      <p className="text-xs text-white">{selectedRecommendation.designConcept}</p>
                    </div>
                  )}
                  {selectedRecommendation.targetAudience && (
                    <div className="mb-2 flex items-center gap-1">
                      <p className="text-[10px] text-[#a1a1aa] mb-1">กลุ่มเป้าหมาย:</p>
                      <p className="text-xs text-white">{selectedRecommendation.targetAudience}</p>
                    </div>
                  )}
                  {selectedRecommendation.uniqueFeatures && selectedRecommendation.uniqueFeatures.length > 0 && (
                    <div className="flex items-center gap-1">
                      <p className="text-[10px] text-[#a1a1aa] mb-1">จุดเด่น:</p>
                      <ul className="list-disc list-inside space-y-1 flex items-center gap-3">
                        {selectedRecommendation.uniqueFeatures.map((feature, idx) => (
                          <li key={idx} className="text-xs text-white">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Sections Grid */}
              <div className="flex  gap-2 mb-2 relative z-10">
                {selectedRecommendation.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: section.customLayout ? `1px solid ${themeColor}40` : "1px solid #333"
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="w-4 h-4 rounded text-[8px] font-bold flex items-center justify-center"
                        style={{ backgroundColor: `${themeColor}30`, color: themeColor }}
                      >
                        {section.order}
                      </span>
                      <span className="text-[10px] text-[#52525b]">
                        {section.customLayout ? "Custom" : "Section"}
                      </span>
                    </div>
                    {section.animation && (
                      <div className="flex items-center gap-1">
                        <span style={{ color: themeColor }} className="text-[10px]">✦</span>
                        <span className="text-[10px] text-[#71717a] truncate">{section.animation}</span>
                      </div>
                    )}
                    <div className="text-xs text-white font-medium truncate mb-1">
                      {section.customLayoutLabel || section.layout}
                    </div>
                    {section.customLayoutDescription && (
                      <p className="text-[9px] text-white line-clamp-4 mb-1">{section.customLayoutDescription}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Config Summary */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#333] relative z-10">
                <div className="text-center p-2 rounded-lg" style={{ background: "rgba(0,0,0,0.2)" }}>
                  <div className="text-[10px] text-[#52525b] mb-1 uppercase tracking-wider">Navbar</div>
                  <div className="text-xs text-white font-medium">{selectedRecommendation.navbar.animation}</div>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: "rgba(0,0,0,0.2)" }}>
                  <div className="text-[10px] text-[#52525b] mb-1 uppercase tracking-wider">Footer</div>
                  <div className="text-xs text-white font-medium">{selectedRecommendation.footer.animation}</div>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: "rgba(0,0,0,0.2)" }}>
                  <div className="text-[10px] text-[#52525b] mb-1 uppercase tracking-wider">Background</div>
                  <div className="text-xs text-white font-medium">{selectedRecommendation.background.type}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==================== LOADING STATE ==================== */}
      {isLoading && (
        <div
          className="mt-4 p-5 rounded-2xl backdrop-blur-xl"
          style={{
            background: "linear-gradient(135deg, rgba(12,12,12,0.98) 0%, rgba(20,20,20,0.95) 100%)",
            border: "1px solid #333",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-5 h-5 rounded-full animate-pulse"
              style={{ backgroundColor: themeColor }}
            />
            <div className="h-4 w-40 bg-[#262626] rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div
                key={i}
                className="p-3 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid #262626",
                  animationDelay: `${i * 100}ms`
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-md bg-[#262626] animate-pulse" />
                  <div className="h-3 flex-1 bg-[#262626] rounded animate-pulse" />
                </div>
                <div className="h-2 w-full bg-[#262626] rounded animate-pulse mb-1" />
                <div className="h-2 w-2/3 bg-[#262626] rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${themeColor}40;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${themeColor}60;
        }
      `}</style>
    </div>
  );
}
