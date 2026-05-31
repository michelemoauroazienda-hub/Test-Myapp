# Add project specific ProGuard rules here.
-keep class com.squareup.moshi.** { *; }
-keepclassmembers class * {
    @com.squareup.moshi.* <methods>;
}
