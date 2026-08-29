export interface NewsAffectedCoin {
  symbol: string;
  name: string;
  coin_id: string;
  estimated_impact_pct: string;
  direction: "BULLISH" | "BEARISH" | "NEUTRAL";
  timeframe: string;
  key_catalyst: string;
}

export interface NewsImpactBreakdown {
  affected_coins: NewsAffectedCoin[];
  causal_transmission_chain: string[];
  short_term_outlook: string;
  medium_term_outlook: string;
  long_term_outlook: string;
  institutional_playbook: string;
}

export interface CryptoBERTResult {
  sentence: string;
  label: "Bullish" | "Bearish" | "Neutral" | "BULLISH" | "BEARISH" | "NEUTRAL";
  score: number; // confidence 0.000 to 1.000
  probabilities: {
    bullish: number;
    bearish: number;
    neutral: number;
  };
  sentiment_tag: "BULLISH" | "BEARISH" | "NEUTRAL";
  polarity: number; // -1.0 to +1.0
  model: string; // "ElKulako/cryptobert"
  provider: "hf-inference" | "crypto-nlp-engine";
  plain_english_takeaway: string;
}

export interface SimpleEnglishNewsAudit {
  headline: string;
  source: string;
  published_at: string;
  cryptobert: CryptoBERTResult;
  what_happened_simple_words: string;
  why_it_matters_for_price: string;
  actionable_tip_for_user: string;
}

export interface SimpleEnglishCoinAnalysis {
  coin_id: string;
  coin_name: string;
  symbol: string;
  current_price_usd: number;
  price_change_24h: number;
  verdict: "STRONG_BUY" | "ACCUMULATE_DCA" | "HOLD_WATCH" | "HIGH_RISK_CAUTION" | "AVOID_DUMP_TRAP";
  verdict_badge: string;
  verdict_simple_summary: string;
  is_real_utility_or_hype: "REAL_UTILITY" | "MODERATE_UTILITY" | "HIGH_RISK_MEME" | "POTENTIAL_EXIT_TRAP";
  
  what_this_coin_does_for_beginners: string;
  what_is_happening_right_now: string;
  news_impact_breakdown_simple: SimpleEnglishNewsAudit[];
  overall_cryptobert_sentiment_score: number; // 0 to 100
  overall_sentiment_label: "STRONGLY_BULLISH" | "BULLISH" | "NEUTRAL" | "BEARISH" | "HIGHLY_BEARISH";
  
  whale_and_smart_money_activity_simple: string;
  developer_and_team_reality_check: string;
  danger_signals_to_watch: string[];
  growth_catalysts_to_watch: string[];
  
  step_by_step_user_playbook: {
    for_beginners: string;
    for_long_term_investors: string;
    for_short_term_traders: string;
    strict_rule: string;
  };
  
  model_pipeline: string;
  generated_at: string;
  sentiment_evolution?: SentimentEvolution;
  old_vs_new_news_reference?: OldVsNewNewsReference;
  realtime_price_delta?: RealtimePriceDelta;
}

export interface ModernFinBERTResult {
  sentence: string;
  label: "positive" | "negative" | "neutral" | "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  score: number; // 0.000 to 1.000
  probabilities: {
    positive: number;
    negative: number;
    neutral: number;
  };
  sentiment_tag: "BULLISH" | "BEARISH" | "NEUTRAL";
  polarity: number; // -1.0 to +1.0
  key_entities?: string[];
  explanation?: string;
  model: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  timestamp: string;
  category: string;
  sentiment: "BULLISH" | "BEARISH" | "NEUTRAL";
  importance: "HIGH" | "MEDIUM" | "LOW";
  image_url?: string;
  impact_breakdown?: NewsImpactBreakdown;
  finbert?: ModernFinBERTResult;
  cryptobert?: CryptoBERTResult;
}

export interface NewsImpactAnalysis {
  coin_id: string;
  coin_name: string;
  assessed_headline: string;
  overall_impact_direction: "BULLISH" | "BEARISH" | "NEUTRAL";
  confidence_score: number;
  macro_narrative_context: string;
  transmission_channel: string;
  short_term_30d: {
    outlook: string;
    expected_price_delta_pct: number;
    target_price_projection: string;
    volatility_shift: string;
    probability_score: number;
  };
  medium_term_6m: {
    outlook: string;
    expected_price_delta_pct: number;
    target_price_projection: string;
    volatility_shift: string;
    probability_score: number;
  };
  long_term_3y: {
    outlook: string;
    expected_price_delta_pct: number;
    target_price_projection: string;
    volatility_shift: string;
    probability_score: number;
  };
  scenario_tree: {
    bull_breakout: { trigger: string; price_target: string };
    base_case: { trigger: string; price_target: string };
    bear_black_swan: { trigger: string; price_target: string };
  };
  adoption_tailwinds: string[];
  regulatory_headwinds: string[];
  institutional_playbook: string;
}

export interface CoinData {
  coin_id: string;
  name: string;
  symbol: string;
  price_usd: number;
  price_change_24h: number;
  price_change_7d?: number;
  price_change_30d?: number;
  all_time_high?: number;
  all_time_high_date?: string;
  market_cap?: number;
  volume_24h?: number;
  market_cap_rank?: number;
  image_url?: string;
  blockchain_network?: string;
  official_website?: string;
  source_repo?: string;
  contract_address?: string;
  description?: string;
}

export interface RiskScore {
  coin_id: string;
  score: number;
  risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  recommendation?: "BUY" | "HOLD" | "SELL";
  fraud_probability?: number;
}

export interface DexScreenerTokenProfile {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon?: string;
  header?: string;
  openGraph?: string;
  description?: string;
  links?: {
    type?: string;
    label?: string;
    url: string;
  }[];
  cto?: boolean;
}

export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns?: {
    m5?: { buys: number; sells: number };
    h1?: { buys: number; sells: number };
    h6?: { buys: number; sells: number };
    h24?: { buys: number; sells: number };
  };
  volume?: {
    m5?: number;
    h1?: number;
    h6?: number;
    h24?: number;
  };
  priceChange?: {
    m5?: number;
    h1?: number;
    h6?: number;
    h24?: number;
  };
  liquidity?: {
    usd?: number;
    base?: number;
    quote?: number;
  };
  fdv?: number;
  marketCap?: number;
  pairCreatedAt?: number;
  info?: {
    imageUrl?: string;
    header?: string;
    openGraph?: string;
    websites?: { label?: string; url: string }[];
    socials?: { type: string; url: string }[];
  };
}

export interface DexTrendingCoin {
  id: string;
  tokenAddress: string;
  chainId: string;
  dexId: string;
  name: string;
  symbol: string;
  priceUsd: number;
  priceNative?: string;
  priceChange24h: number;
  priceChange1h: number;
  priceChange5m: number;
  volume24h: number;
  liquidityUsd: number;
  marketCap: number;
  fdv: number;
  icon?: string;
  header?: string;
  description?: string;
  dexScreenerUrl: string;
  pairAddress?: string;
  txns24h?: { buys: number; sells: number };
  txns1h?: { buys: number; sells: number };
  txns5m?: { buys: number; sells: number };
  links?: { type?: string; label?: string; url: string }[];
  cto?: boolean;
  boostAmount?: number;
  riskScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  finbertSentiment?: {
    label: string;
    score: number;
    polarity: number;
  };
}

// ── DeFi Intelligence Data Types ─────────────────────────────────────────
export interface DefiProtocol {
  id: string;
  name: string;
  symbol: string;
  category: string;
  tvl: number;
  change_1d: number;
  change_7d: number;
  change_1m?: number;
  chains: string[];
  mcap?: number;
  mcapTvlRatio?: number;
  logo?: string;
  url?: string;
  audits?: string;
  audit_note?: string;
  forkedFrom?: string[];
  gecko_id?: string;
  slug?: string;
}

export interface DefiChain {
  gecko_id?: string;
  tvl: number;
  tokenSymbol?: string;
  name: string;
  change_1d: number;
  change_7d: number;
  change_1m?: number;
  protocolsCount?: number;
  dominance?: number;
  icon?: string;
}

export interface DefiYieldPool {
  pool: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apy: number;
  apyBase?: number;
  apyReward?: number;
  chain: string;
  stablecoin: boolean;
  ilRisk: "no" | "yes" | "low";
  exposure?: string;
  predictedClass?: string;
  predictedProbability?: number;
}

export interface DefiDexVolume {
  name: string;
  displayName: string;
  dailyVolume: number;
  totalVolume24h?: number;
  change_1d: number;
  change_7d: number;
  chains: string[];
  marketShare: number;
  logo?: string;
  category?: string;
}

export interface DefiFeeRevenue {
  name: string;
  displayName: string;
  category: string;
  dailyFees: number;
  dailyRevenue: number;
  change_1d: number;
  change_7d: number;
  chains: string[];
  logo?: string;
}

export interface DefiStablecoin {
  id: string;
  name: string;
  symbol: string;
  pegType: string;
  pegMechanism: string;
  price: number;
  circulating: number;
  circulatingPrevDay?: number;
  change_1d: number;
  change_7d: number;
  chains: string[];
  depegRisk: "LOW" | "MODERATE" | "HIGH";
  depegDistancePct: number;
  logo?: string;
}

export interface DefiOverviewData {
  totalTvl: number;
  tvlChange24h: number;
  totalDexVolume24h: number;
  dexVolumeChange24h: number;
  totalFees24h: number;
  totalRevenue24h: number;
  totalStablecoinMcap: number;
  stablecoinChange24h: number;
  topChains: DefiChain[];
  topProtocols: DefiProtocol[];
  topYields: DefiYieldPool[];
  topDexes: DefiDexVolume[];
  topFees: DefiFeeRevenue[];
  stablecoins: DefiStablecoin[];
  lastUpdated: string;
}

// ── 1. Early Trend Detector Types ────────────────────────────────────────
export type EarlySignalStage =
  | "DORMANT_ACCUMULATION"
  | "ANOMALY_VOLUME_SURGE"
  | "DEV_COMMIT_SPRINT"
  | "DEX_LIQUIDITY_INFUSION"
  | "SMART_MONEY_PROBE"
  | "SOCIAL_SPARK_PRE_TREND";

export interface EarlyTrendBreakdownPrediction {
  has_breakdown_risk: boolean;
  breakdown_risk_level: "LOW" | "MODERATE" | "ELEVATED" | "HIGH";
  breakdown_warning: string;
  critical_support: string;
  overhead_resistance: string;
  key_trigger: string;
}

export interface EarlySignalItem {
  id: string;
  coin_id: string;
  name: string;
  symbol: string;
  price_usd: number;
  price_change_24h: number;
  market_cap: number;
  signal_stage: EarlySignalStage;
  stage_label: string;
  breakout_probability_pct: number; // 0-100
  trend_direction: "UPWARD" | "DOWNWARD" | "NEUTRAL";
  predicted_trend: string;
  simple_trend_summary: string;
  detailed_reasons: string[];
  breakdown_prediction: EarlyTrendBreakdownPrediction;
  volume_surge_ratio: number; // e.g. 3.8 = 380% vs 14d avg
  dormant_wallets_reactivated: number;
  github_velocity_30d_pct: number;
  dex_liquidity_growth_pct: number;
  social_spark_index: number; // 0-100
  early_catalyst: string;
  why_pre_trend: string;
  entry_zone: string;
  risk_level: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  detected_at: string;
  tags: string[];
}

// ── 2. Smart Money Interest Tracker Types ─────────────────────────────────────
export type AccumulationStatus =
  | "AGGRESSIVE_ACCUMULATION"
  | "STEADY_ACCUMULATION"
  | "NEUTRAL_CHOP"
  | "DISTRIBUTION_PROBE"
  | "HEAVY_DISTRIBUTION";

export type SmartMoneyInterestCategory =
  | "GAINING_INTEREST"
  | "LOSING_INTEREST"
  | "NEUTRAL_INTEREST";

export interface SmartMoneyTransaction {
  id: string;
  timestamp: string;
  type: "BUY" | "SELL" | "TRANSFER_IN" | "TRANSFER_OUT";
  amount_usd: number;
  amount_tokens: number;
  price_usd: number;
  wallet_label: string;
  address_hint: string;
  entity_type: "Smart Whale" | "VC Fund" | "DEX MM" | "Tier 1 Exchange" | "Insider Cluster" | "MEV Arbitrageur";
  impact: "BULLISH" | "BEARISH" | "NEUTRAL";
}

export interface SmartMoneyFlowItem {
  coin_id: string;
  name: string;
  symbol: string;
  price_usd: number;
  price_change_24h: number;
  interest_category: SmartMoneyInterestCategory;
  interest_status_label: string;
  accumulation_status: AccumulationStatus;
  smart_money_score: number; // 0-100 (100 = massive smart money inflow)
  net_smart_inflow_24h_usd: number;
  exchange_net_flow_24h_usd: number; // negative = outflow (accumulation/holding), positive = inflow to exchanges (sell risk)
  top_100_whale_delta_pct: number;
  cluster_buy_count_24h: number;
  cluster_sell_count_24h: number;
  smart_money_holding_ratio_pct: number;
  reason_for_interest: string;
  past_buying_history: string;
  has_unexplained_spike?: boolean;
  retail_warning_note?: string;
  recent_major_transactions: SmartMoneyTransaction[];
  summary_verdict: string;
  primary_driver: string;
}

// ── 3. Signal Conflict Detector Types ──────────────────────────────────────
export type ConflictSeverity = "CRITICAL_DIVERGENCE" | "HIGH_DIVERGENCE" | "MODERATE_DIVERGENCE" | "ALIGNED";
export type ConflictType =
  | "BULL_TRAP"
  | "BEAR_TRAP"
  | "FAKEOUT_BREAKOUT"
  | "LIQUIDITY_MIRAGE"
  | "SENTIMENT_PRICE_DISCONNECT"
  | "HEALTHY_CONVERGENCE";

export interface SignalVectorBreakdown {
  price_trend: string;
  onchain_whales: string;
  social_sentiment: string;
  spot_cvd_orderbook: string;
  dev_and_tvl: string;
}

export interface SignalConflictItem {
  coin_id: string;
  name: string;
  symbol: string;
  price_usd: number;
  price_change_24h: number;
  conflict_severity: ConflictSeverity;
  conflict_type: ConflictType;
  simple_name_label?: string;
  what_price_looks_like?: string;
  what_is_really_happening?: string;
  detailed_analysis_points?: string[];
  plain_english_advice?: string;
  trap_probability_pct: number; // 0-100
  signal_vectors: SignalVectorBreakdown;
  divergence_explanation: string;
  actionable_playbook: string;
  key_warning: string;
  recommended_action: "STRICT_AVOID_TRAP" | "PREPARE_CONTRARIAN_BUY" | "TIGHTEN_STOP_LOSS" | "PROCEED_WITH_CAUTION" | "CONFIRMED_TREND";
  detected_at: string;
}

// ── 4. Devil's Advocate Agent Types ────────────────────────────────────────
export interface StructuralVulnerability {
  vector: string;
  risk_rating: "CRITICAL" | "HIGH" | "MEDIUM";
  description: string;
  failure_mechanism: string;
}

export interface DevilsAdvocateAnalysis {
  coin_id: string;
  name: string;
  symbol: string;
  primary_bull_bias: string;
  adversarial_verdict: string;
  counter_thesis_summary: string;
  simple_verdict?: string;
  plain_risks_summary?: string;
  real_world_stress_points?: string[];
  honest_advice?: string;
  structural_vulnerabilities: StructuralVulnerability[];
  bearish_catalysts: string[];
  dilution_and_unlock_traps: string;
  what_bulls_are_ignoring: string[];
  worst_case_drawdown_target: string;
  stress_test_score: number; // 0-100 (100 = impregnable, <40 = fragile)
  generated_at: string;
  model_source: string;
}

// ── 5. Thesis + Invalidation Engine Types ──────────────────────────────────
export interface InvalidationTrigger {
  id: string;
  trigger_type: "PRICE_FLOOR" | "ONCHAIN_WHALE" | "FUNDAMENTAL_TVL" | "TIME_EXPIRY" | "REGULATORY_COMPLIANCE";
  condition: string;
  invalidation_action: string;
  severity: "HARD_STOP" | "THESIS_REVISION" | "SCALE_DOWN_EXPOSURE";
  threshold_metric: string;
}

export interface ThesisAndInvalidation {
  coin_id: string;
  name: string;
  symbol: string;
  current_price_usd: number;
  simple_opportunity_summary?: string;
  why_opportunity_exists_now: string;
  core_opportunity_thesis: string;
  target_summary?: string;
  plain_exit_rules?: string[];
  asymmetric_upside_multiple: string; // e.g. "3.5x - 7.0x"
  target_price_horizon: {
    conservative: string;
    target: string;
    moonshot: string;
  };
  catalyst_milestones: {
    timeframe: string;
    event: string;
    expected_impact: string;
  }[];
  deterministic_invalidation_rules: InvalidationTrigger[];
  risk_to_reward_ratio: string;
  execution_guide: string;
  generated_at: string;
}

// ── Master Signals Suite Package ───────────────────────────────────────────
export interface AdvancedSignalsOverview {
  earlySignals: EarlySignalItem[];
  smartMoney: SmartMoneyFlowItem[];
  signalConflicts: SignalConflictItem[];
  topDevilsAdvocate: DevilsAdvocateAnalysis[];
  topTheses: ThesisAndInvalidation[];
  stats: {
    totalEarlyDetected: number;
    activeWhaleAccumulationCount: number;
    activeBullTrapsDetected: number;
    activeBearTrapsDetected: number;
    highRiskDivergencesCount: number;
    lastUpdated: string;
  };
}

// ── Real-Time Dynamic Sentiment Shift & Delta Evolution Types ───────────────
export type SentimentShiftType =
  | "BULLISH_INFLECTION"
  | "BEARISH_PIVOT"
  | "BULLISH_EXPANSION"
  | "BEARISH_ACCELERATION"
  | "NEUTRAL_CONSOLIDATION"
  | "VOLATILITY_ALERT";

export interface SentimentEvolution {
  prior_sentiment_label: string;
  prior_sentiment_score: number; // 0-100
  current_sentiment_label: string;
  current_sentiment_score: number; // 0-100
  sentiment_shift_pts: number; // e.g. +28 or -15
  sentiment_shift_type: SentimentShiftType;
  shift_trigger_summary: string;
  recorded_at: string;
  prior_snapshot_time?: string;
  confidence_delta_pct?: number;
}

export interface OldVsNewNewsReference {
  historical_baseline_context: string;
  fresh_incoming_catalysts: string[];
  historical_reference_catalysts: string[];
  what_changed_since_last_update: string;
  how_old_assumptions_modified: string;
  narrative_continuity_score: number; // 0-100
  invalidated_prior_theses?: string[];
  confirmed_prior_theses?: string[];
}

export interface RealtimePriceDelta {
  baseline_price_usd: number;
  current_live_price_usd: number;
  price_delta_pct: number;
  volatility_regime: "HIGH_EXPANSION" | "NORMAL_CHOP" | "COMPRESSION";
  last_synced_at: string;
}

export interface AIReport {
  id: string;
  user_id?: string;
  coin_id: string;
  title: string;
  status: "pending" | "generating" | "completed" | "failed";
  executive_summary?: string;
  market_analysis?: string;
  risk_analysis?: string;
  onchain_analysis?: string;
  sentiment_analysis?: string;
  viability_breakdown?: string;
  recommendation?: "BUY" | "SELL" | "HOLD";
  recommendation_confidence?: number;
  risk_score_at_generation?: number;
  model_used?: string;
  generation_time_seconds?: number;
  created_at: string;
  sentiment_evolution?: SentimentEvolution;
  old_vs_new_news_reference?: OldVsNewNewsReference;
  realtime_price_delta?: RealtimePriceDelta;
  is_realtime_synced?: boolean;
  live_news_applied?: NewsItem[];
}

export interface CoinHistoryProfile {
  founding_year: string;
  founders: string;
  origins_and_background: string;
  core_purpose_plain_english: string;
  underlying_technology: string;
  ecosystem_and_adoption: string;
  consensus_type: string;
}

export interface PastPerformanceProfile {
  ath_price_usd: number;
  ath_date: string;
  ath_drawdown_pct: number;
  atl_price_usd: number;
  atl_date: string;
  atl_gain_multiple: string;
  cycle_analysis: string;
  recovery_track_record: string;
  volatility_profile: string;
  benchmarks: {
    roi_7d: string;
    roi_30d: string;
    roi_90d: string;
    roi_1y: string;
    roi_all_time: string;
  };
}

export interface NewsPointByPointItem {
  id: string;
  headline: string;
  source: string;
  time_ago: string;
  sentiment: "BULLISH" | "BEARISH" | "NEUTRAL" | "WARNING";
  what_happened_simple: string;
  why_it_matters_for_your_money: string;
  future_price_impact: {
    short_term_outlook: string;
    medium_term_outlook: string;
    sentiment_tag: "BULLISH" | "BEARISH" | "NEUTRAL";
  };
}

export interface InvestmentStrategyGuide {
  short_term_trading: {
    suitable_for: string;
    entry_tactics: string;
    recommended_stop_loss: string;
    risk_reward_ratio: string;
    position_sizing_rule: string;
    take_profit_strategy: string;
    warning: string;
  };
  long_term_investing: {
    suitable_for: string;
    dca_strategy: string;
    fundamental_holding_thesis: string;
    exit_triggers: string;
    staking_and_yield: string;
    safe_storage_recommendation?: string;
    time_horizon?: string;
  };
}

export interface RiskMatrixAndDownsideScenarios {
  popularity_audit: {
    popularity_level: string;
    is_popular: boolean;
    popularity_summary: string;
    community_health: string;
    liquidity_depth: string;
  };
  downside_failure_conditions: Array<{
    title: string;
    severity: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
    trigger_condition: string;
    drawdown_impact: string;
    how_it_affects_your_money: string;
  }>;
  detailed_pros: Array<{ title: string; explanation: string }>;
  detailed_cons: Array<{ title: string; explanation: string }>;
  bottom_line_risk_verdict: string;
  overall_safety_rating: "SAFE_FOR_LONG_TERM" | "MODERATE_RISK" | "HIGH_SPECULATION" | "EXTREME_DANGER_AVOID";
}

export interface DetailedSixSectionAuditReport {
  history: CoinHistoryProfile;
  pastPerformance: PastPerformanceProfile;
  pointByPointNews: NewsPointByPointItem[];
  investmentStrategy: InvestmentStrategyGuide;
  riskMatrix: RiskMatrixAndDownsideScenarios;
  sentiment_evolution?: SentimentEvolution;
  old_vs_new_news_reference?: OldVsNewNewsReference;
  realtime_price_delta?: RealtimePriceDelta;
  live_sync_status?: {
    is_live: boolean;
    last_updated: string;
    live_news_count?: number;
    sentiment_drift?: string;
    sentiment_shift_detected?: boolean;
    baseline_reference_date?: string;
  };
}



