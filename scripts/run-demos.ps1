param(
    [switch]$OnlyC,
    [switch]$AllowMissingCpp
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$BuildDir = Join-Path $Root "build"

$requiredPrograms = @(
    "ex01_clinica.exe",
    "ex02_suporte_ti.exe",
    "ex04_escalonamento.exe",
    "ex05_rede_pacotes.exe"
)

foreach ($program in $requiredPrograms) {
    $path = Join-Path $BuildDir $program
    if (-not (Test-Path -LiteralPath $path)) {
        throw "Executavel obrigatorio nao encontrado: $program. Rode scripts/build-all.ps1 antes."
    }

    Write-Host ""
    Write-Host ">>> $program"
    & $path
    if ($LASTEXITCODE -ne 0) {
        throw "Demo falhou com codigo $LASTEXITCODE`: $program"
    }
}

if (-not $OnlyC) {
    $cppProgram = "network_topology_lab.exe"
    $cppPath = Join-Path $BuildDir $cppProgram
    if (-not (Test-Path -LiteralPath $cppPath)) {
        if ($AllowMissingCpp) {
            Write-Host "Ignorado, executavel C++ nao encontrado: $cppProgram"
            exit 0
        }

        throw "Executavel C++ nao encontrado: $cppProgram. Use -OnlyC ou -AllowMissingCpp quando nao houver compilador C++."
    }

    Write-Host ""
    Write-Host ">>> $cppProgram"
    & $cppPath
    if ($LASTEXITCODE -ne 0) {
        throw "Demo falhou com codigo $LASTEXITCODE`: $cppProgram"
    }
}
