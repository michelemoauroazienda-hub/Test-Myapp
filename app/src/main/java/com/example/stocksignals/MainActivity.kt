package com.example.stocksignals

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import com.example.stocksignals.ui.StocksScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { AppTheme { Surface { StocksScreen() } } }
    }
}

@Composable
private fun AppTheme(content: @Composable () -> Unit) {
    val ctx = LocalContext.current
    val colors = runCatching { dynamicLightColorScheme(ctx) }.getOrNull()
        ?: MaterialTheme.colorScheme
    MaterialTheme(colorScheme = colors, content = content)
}
