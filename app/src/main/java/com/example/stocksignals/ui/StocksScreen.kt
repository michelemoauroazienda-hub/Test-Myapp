package com.example.stocksignals.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.stocksignals.data.StockRow
import com.example.stocksignals.domain.Signal
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

private val ColSymbol = 90.dp
private val ColName = 180.dp
private val ColPrice = 100.dp
private val ColChange = 90.dp
private val ColRsi = 70.dp
private val ColSignal = 90.dp
private val ColAction = 200.dp
private val ColTarget = 110.dp
private val ColReason = 220.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StocksScreen(vm: StocksViewModel = viewModel()) {
    val state by vm.state.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Stock Signals") },
                actions = {
                    IconButton(onClick = { vm.refresh() }, enabled = !state.loading) {
                        Icon(Icons.Default.Refresh, contentDescription = "Refresh")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .fillMaxSize()
        ) {
            DisclaimerBanner()

            if (state.loading && state.rows.isEmpty()) {
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator()
                }
            } else {
                state.lastUpdate?.let {
                    val ts = SimpleDateFormat("dd/MM/yyyy HH:mm:ss", Locale.ITALY).format(Date(it))
                    Text(
                        "Aggiornato: $ts",
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
                        style = MaterialTheme.typography.labelSmall
                    )
                }
                if (state.loading) LinearProgressIndicator(Modifier.fillMaxWidth())

                StockTable(state.rows)

                if (state.errors.isNotEmpty()) {
                    Spacer(Modifier.height(8.dp))
                    Text(
                        "Errori: ${state.errors.joinToString("; ")}",
                        color = MaterialTheme.colorScheme.error,
                        modifier = Modifier.padding(12.dp),
                        fontSize = 12.sp
                    )
                }
            }
        }
    }
}

@Composable
private fun DisclaimerBanner() {
    Surface(
        color = MaterialTheme.colorScheme.tertiaryContainer,
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            "Solo a scopo informativo. Non è consulenza finanziaria.",
            modifier = Modifier.padding(8.dp),
            fontSize = 12.sp,
            color = MaterialTheme.colorScheme.onTertiaryContainer
        )
    }
}

@Composable
private fun StockTable(rows: List<StockRow>) {
    val hScroll = rememberScrollState()
    Column(Modifier.fillMaxSize()) {
        Row(
            Modifier
                .horizontalScroll(hScroll)
                .background(MaterialTheme.colorScheme.surfaceVariant)
                .padding(vertical = 8.dp, horizontal = 8.dp)
        ) {
            HeaderCell("Symbol", ColSymbol)
            HeaderCell("Nome", ColName)
            HeaderCell("Prezzo", ColPrice)
            HeaderCell("Var %", ColChange)
            HeaderCell("RSI", ColRsi)
            HeaderCell("Segnale", ColSignal)
            HeaderCell("Azione consigliata", ColAction)
            HeaderCell("Target", ColTarget)
            HeaderCell("Motivo", ColReason)
        }
        HorizontalDivider()
        LazyColumn(Modifier.fillMaxSize()) {
            items(rows, key = { it.symbol }) { row ->
                Row(
                    Modifier
                        .horizontalScroll(hScroll)
                        .padding(vertical = 10.dp, horizontal = 8.dp)
                ) {
                    Cell(row.symbol, ColSymbol, bold = true)
                    Cell(row.name, ColName)
                    Cell(formatPrice(row.price, row.currency), ColPrice)
                    ChangeCell(row.changePct)
                    Cell(if (row.rsi.isFinite()) "%.1f".format(row.rsi) else "-", ColRsi)
                    SignalCell(row.signal)
                    ActionCell(row.signal, row.actionPrice, row.currency)
                    Cell(
                        if (row.targetPrice.isFinite()) formatPrice(row.targetPrice, row.currency) else "-",
                        ColTarget
                    )
                    Cell(row.reason, ColReason)
                }
                HorizontalDivider()
            }
        }
    }
}

@Composable
private fun HeaderCell(text: String, width: androidx.compose.ui.unit.Dp) {
    Text(
        text,
        modifier = Modifier.width(width),
        fontWeight = FontWeight.Bold,
        fontSize = 13.sp
    )
}

@Composable
private fun Cell(text: String, width: androidx.compose.ui.unit.Dp, bold: Boolean = false) {
    Text(
        text,
        modifier = Modifier.width(width),
        fontWeight = if (bold) FontWeight.SemiBold else FontWeight.Normal,
        fontSize = 13.sp,
        maxLines = 2
    )
}

@Composable
private fun ChangeCell(pct: Double) {
    val color = when {
        pct > 0 -> Color(0xFF1B873B)
        pct < 0 -> Color(0xFFC0392B)
        else -> MaterialTheme.colorScheme.onSurface
    }
    Text(
        "%+.2f%%".format(pct),
        modifier = Modifier.width(ColChange),
        color = color,
        fontWeight = FontWeight.SemiBold,
        fontSize = 13.sp
    )
}

@Composable
private fun SignalCell(signal: Signal) {
    val (bg, label) = when (signal) {
        Signal.BUY -> Color(0xFF1B873B) to "BUY"
        Signal.SELL -> Color(0xFFC0392B) to "SELL"
        Signal.HOLD -> Color(0xFF7F8C8D) to "HOLD"
    }
    Box(
        Modifier
            .width(ColSignal)
            .padding(end = 8.dp)
    ) {
        Box(
            Modifier
                .clip(RoundedCornerShape(6.dp))
                .background(bg)
                .padding(horizontal = 10.dp, vertical = 4.dp)
        ) {
            Text(label, color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
private fun ActionCell(signal: Signal, actionPrice: Double, currency: String) {
    val text = when (signal) {
        Signal.BUY -> if (actionPrice.isFinite())
            "COMPRA a ${formatPrice(actionPrice, currency)}" else "—"
        Signal.SELL -> if (actionPrice.isFinite())
            "VENDI a ${formatPrice(actionPrice, currency)}" else "—"
        Signal.HOLD -> "Nessuna azione"
    }
    val color = when (signal) {
        Signal.BUY -> Color(0xFF1B873B)
        Signal.SELL -> Color(0xFFC0392B)
        Signal.HOLD -> MaterialTheme.colorScheme.onSurfaceVariant
    }
    Text(
        text,
        modifier = Modifier.width(ColAction),
        color = color,
        fontWeight = FontWeight.SemiBold,
        fontSize = 13.sp,
        maxLines = 2
    )
}

private fun formatPrice(value: Double, currency: String): String {
    val cur = when (currency.uppercase(Locale.ROOT)) {
        "USD" -> "$"
        "EUR" -> "€"
        "GBP" -> "£"
        "JPY" -> "¥"
        else -> if (currency.isBlank()) "" else "$currency "
    }
    return "$cur%.2f".format(value)
}
