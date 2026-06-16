#ifndef PORTFOLIO_COMMON_H
#define PORTFOLIO_COMMON_H

#include <stddef.h>
#include <stdio.h>

static void copy_text(char *dest, size_t size, const char *src)
{
    const char *value = src == NULL ? "" : src;

    if (size == 0U) {
        return;
    }

    (void)snprintf(dest, size, "%s", value);
    dest[size - 1U] = '\0';
}

static void print_section(const char *title)
{
    printf("\n=== %s ===\n", title == NULL ? "" : title);
}

static void print_item(const char *label, const char *value)
{
    printf("  %-18s %s\n", label == NULL ? "" : label, value == NULL ? "" : value);
}

#endif
