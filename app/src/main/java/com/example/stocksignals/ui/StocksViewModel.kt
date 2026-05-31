package com.example.stocksignals.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.stocksignals.data.StockRepository
import com.example.stocksignals.data.StockRow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class UiState(
    val loading: Boolean = false,
    val rows: List<StockRow> = emptyList(),
    val errors: List<String> = emptyList(),
    val lastUpdate: Long? = null
)

class StocksViewModel(
    private val repo: StockRepository = StockRepository()
) : ViewModel() {

    /** Edit this list (or add a settings screen) to track different tickers. */
    private val watchlist: List<String> = listOf(
        "AAPL", "MSFT", "GOOGL", "AMZN", "META",
        "NVDA", "TSLA", "NFLX",
        "ENI.MI", "ISP.MI", "STLAM.MI",
        "ASML.AS", "SAP.DE",
        "BTC-USD", "ETH-USD"
    )

    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state.asStateFlow()

    init { refresh() }

    fun refresh() {
        if (_state.value.loading) return
        _state.value = _state.value.copy(loading = true, errors = emptyList())
        viewModelScope.launch {
            val results = repo.loadAll(watchlist)
            val rows = mutableListOf<StockRow>()
            val errs = mutableListOf<String>()
            results.forEachIndexed { idx, r ->
                r.onSuccess { rows += it }
                 .onFailure { errs += "${watchlist[idx]}: ${it.message ?: "errore"}" }
            }
            _state.value = UiState(
                loading = false,
                rows = rows,
                errors = errs,
                lastUpdate = System.currentTimeMillis()
            )
        }
    }
}
