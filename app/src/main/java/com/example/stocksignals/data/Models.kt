package com.example.stocksignals.data

import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class YahooChartResponse(val chart: Chart?)

@JsonClass(generateAdapter = true)
data class Chart(val result: List<ChartResult>?, val error: Any?)

@JsonClass(generateAdapter = true)
data class ChartResult(
    val meta: Meta?,
    val timestamp: List<Long>?,
    val indicators: Indicators?
)

@JsonClass(generateAdapter = true)
data class Meta(
    val symbol: String?,
    val currency: String?,
    val exchangeName: String?,
    val longName: String?,
    val shortName: String?,
    val instrumentType: String?,
    val regularMarketPrice: Double?,
    val chartPreviousClose: Double?,
    val fiftyTwoWeekHigh: Double?,
    val fiftyTwoWeekLow: Double?
)

@JsonClass(generateAdapter = true)
data class Indicators(val quote: List<Quote>?)

@JsonClass(generateAdapter = true)
data class Quote(
    val open: List<Double?>?,
    val high: List<Double?>?,
    val low: List<Double?>?,
    val close: List<Double?>?,
    val volume: List<Long?>?
)
