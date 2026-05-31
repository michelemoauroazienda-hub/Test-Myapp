package com.example.stocksignals.data

import com.example.stocksignals.domain.Signal
import com.example.stocksignals.domain.SignalEngine
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.withContext

/**
 * UI-ready row for a single stock.
 */
data class StockRow(
    val symbol: String,
    val name: String,
    val exchange: String,
    val currency: String,
    val price: Double,
    val previousClose: Double,
    val changePct: Double,
    val rsi: Double,
    val signal: Signal,
    val actionPrice: Double,
    val targetPrice: Double,
    val reason: String
)

class StockRepository(private val api: YahooApi = NetworkModule.yahoo) {

    /** Fetch in parallel and return rows in the same order as [symbols]. */
    suspend fun loadAll(symbols: List<String>): List<Result<StockRow>> = coroutineScope {
        symbols.map { sym ->
            async(Dispatchers.IO) { runCatching { loadOne(sym) } }
        }.map { it.await() }
    }

    private suspend fun loadOne(symbol: String): StockRow = withContext(Dispatchers.IO) {
        val resp = api.chart(symbol)
        val result = resp.chart?.result?.firstOrNull()
            ?: error("Nessun dato per $symbol")
        val meta = result.meta ?: error("Meta mancante per $symbol")
        val quote = result.indicators?.quote?.firstOrNull()
            ?: error("Quote mancante per $symbol")

        val closes = quote.close.orEmpty().filterNotNull()
        val highs = quote.high.orEmpty().filterNotNull()
        val lows = quote.low.orEmpty().filterNotNull()
        if (closes.isEmpty()) error("Serie chiusure vuota per $symbol")

        val price = meta.regularMarketPrice ?: closes.last()
        val prev = meta.chartPreviousClose ?: closes.dropLast(1).lastOrNull() ?: price
        val changePct = if (prev != 0.0) (price - prev) / prev * 100.0 else 0.0
        val rsi = com.example.stocksignals.domain.Indicators.rsi(closes, 14)
        val sig = SignalEngine.evaluate(closes, highs, lows, price)

        StockRow(
            symbol = meta.symbol ?: symbol,
            name = meta.longName ?: meta.shortName ?: symbol,
            exchange = meta.exchangeName.orEmpty(),
            currency = meta.currency.orEmpty(),
            price = price,
            previousClose = prev,
            changePct = changePct,
            rsi = rsi,
            signal = sig.signal,
            actionPrice = sig.actionPrice,
            targetPrice = sig.targetPrice,
            reason = sig.reason
        )
    }
}
