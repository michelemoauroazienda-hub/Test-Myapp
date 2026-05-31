package com.example.stocksignals.domain

import kotlin.math.max
import kotlin.math.min

object Indicators {

    /** Simple Moving Average over the last [period] values. Returns NaN if not enough data. */
    fun sma(values: List<Double>, period: Int): Double {
        if (values.size < period || period <= 0) return Double.NaN
        val slice = values.subList(values.size - period, values.size)
        return slice.average()
    }

    /**
     * Wilder's RSI on closing prices. Returns value in [0,100], or NaN if not enough data.
     */
    fun rsi(closes: List<Double>, period: Int = 14): Double {
        if (closes.size <= period) return Double.NaN
        var gain = 0.0
        var loss = 0.0
        for (i in 1..period) {
            val diff = closes[i] - closes[i - 1]
            if (diff >= 0) gain += diff else loss -= diff
        }
        var avgGain = gain / period
        var avgLoss = loss / period
        for (i in period + 1 until closes.size) {
            val diff = closes[i] - closes[i - 1]
            val g = if (diff > 0) diff else 0.0
            val l = if (diff < 0) -diff else 0.0
            avgGain = (avgGain * (period - 1) + g) / period
            avgLoss = (avgLoss * (period - 1) + l) / period
        }
        if (avgLoss == 0.0) return 100.0
        val rs = avgGain / avgLoss
        return 100.0 - (100.0 / (1.0 + rs))
    }

    /** Highest high over the last [period] bars. */
    fun highestHigh(highs: List<Double>, period: Int): Double {
        if (highs.isEmpty()) return Double.NaN
        val p = min(period, highs.size)
        var h = Double.NEGATIVE_INFINITY
        for (i in highs.size - p until highs.size) h = max(h, highs[i])
        return h
    }

    /** Lowest low over the last [period] bars. */
    fun lowestLow(lows: List<Double>, period: Int): Double {
        if (lows.isEmpty()) return Double.NaN
        val p = min(period, lows.size)
        var l = Double.POSITIVE_INFINITY
        for (i in lows.size - p until lows.size) l = min(l, lows[i])
        return l
    }
}
