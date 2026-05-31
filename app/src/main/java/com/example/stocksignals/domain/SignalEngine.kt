package com.example.stocksignals.domain

enum class Signal { BUY, SELL, HOLD }

data class SignalResult(
    val signal: Signal,
    /** Price at which the action is suggested (current market price for BUY/SELL). NaN for HOLD. */
    val actionPrice: Double,
    /** Suggested target price (resistance for BUY, support for SELL). NaN if not applicable. */
    val targetPrice: Double,
    val reason: String
)

/**
 * Classic rule-based engine combining trend (SMA50 vs SMA200) and momentum (RSI14).
 *
 *  BUY  : price > SMA50 > SMA200  AND RSI < 70  (uptrend, not overbought)
 *         OR RSI < 30 (oversold rebound candidate)
 *  SELL : price < SMA50 < SMA200  AND RSI > 30  (downtrend, not oversold)
 *         OR RSI > 70 (overbought)
 *  HOLD : everything else.
 *
 * Target price:
 *  BUY  -> highest high of last 20 sessions (next resistance to take profit / set stop above entry)
 *  SELL -> lowest  low  of last 20 sessions
 */
object SignalEngine {

    fun evaluate(
        closes: List<Double>,
        highs: List<Double>,
        lows: List<Double>,
        currentPrice: Double
    ): SignalResult {
        if (closes.size < 50) {
            return SignalResult(Signal.HOLD, Double.NaN, Double.NaN, "Dati insufficienti")
        }
        val sma50 = Indicators.sma(closes, 50)
        val sma200 = if (closes.size >= 200) Indicators.sma(closes, 200) else Double.NaN
        val rsi = Indicators.rsi(closes, 14)
        val resistance = Indicators.highestHigh(highs, 20)
        val support = Indicators.lowestLow(lows, 20)

        val uptrend = !sma200.isNaN() && currentPrice > sma50 && sma50 > sma200
        val downtrend = !sma200.isNaN() && currentPrice < sma50 && sma50 < sma200

        return when {
            rsi.isFinite() && rsi < 30 ->
                SignalResult(Signal.BUY, currentPrice, resistance, "RSI ipervenduto (${"%.1f".format(rsi)})")
            rsi.isFinite() && rsi > 70 ->
                SignalResult(Signal.SELL, currentPrice, support, "RSI ipercomprato (${"%.1f".format(rsi)})")
            uptrend && rsi < 70 ->
                SignalResult(Signal.BUY, currentPrice, resistance, "Trend rialzista, RSI ${"%.1f".format(rsi)}")
            downtrend && rsi > 30 ->
                SignalResult(Signal.SELL, currentPrice, support, "Trend ribassista, RSI ${"%.1f".format(rsi)}")
            else ->
                SignalResult(Signal.HOLD, Double.NaN, Double.NaN, "Nessun segnale chiaro")
        }
    }
}
