package com.example.stocksignals.data

import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface YahooApi {
    /**
     * Public Yahoo Finance chart endpoint. No API key required.
     * Example: /v8/finance/chart/AAPL?interval=1d&range=1y
     */
    @GET("v8/finance/chart/{symbol}")
    suspend fun chart(
        @Path("symbol") symbol: String,
        @Query("interval") interval: String = "1d",
        @Query("range") range: String = "1y"
    ): YahooChartResponse
}
