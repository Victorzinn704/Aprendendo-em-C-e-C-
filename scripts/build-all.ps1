param(
    [string]$CCompiler = "",
    [string]$CppCompiler = "",
    [switch]$WarningsAsErrors
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$BuildDir = Join-Path $Root "build"

function Resolve-Tool {
    param(
        [string]$ExplicitPath,
        [string[]]$Candidates
    )

    if ($ExplicitPath -ne "") {
        if (Test-Path -LiteralPath $ExplicitPath) {
            return (Resolve-Path -LiteralPath $ExplicitPath).Path
        }

        $explicitCommand = Get-Command $ExplicitPath -ErrorAction SilentlyContinue
        if ($null -ne $explicitCommand) {
            return $explicitCommand.Source
        }

        throw "Ferramenta nao encontrada: $ExplicitPath"
    }

    foreach ($candidate in $Candidates) {
        $command = Get-Command $candidate -ErrorAction SilentlyContinue
        if ($null -ne $command) {
            return $command.Source
        }
    }

    return ""
}

function Invoke-Compiler {
    param(
        [string]$Compiler,
        [string[]]$Arguments
    )

    Write-Host "Compilando: $Compiler $($Arguments -join ' ')"
    & $Compiler @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Compilacao falhou com codigo $LASTEXITCODE."
    }
}

New-Item -ItemType Directory -Force -Path $BuildDir | Out-Null

$cCompilerPath = Resolve-Tool -ExplicitPath $CCompiler -Candidates @("gcc", "clang", "tcc")
$cppCompilerPath = Resolve-Tool -ExplicitPath $CppCompiler -Candidates @("g++", "clang++", "cl")

if ($cCompilerPath -eq "") {
    throw "Nenhum compilador C encontrado. Instale GCC/Clang/TinyCC ou passe -CCompiler caminho\para\compilador.exe."
}

$cSources = @(
    @{ Source = "src/c/ex01_clinica.c"; Output = "ex01_clinica.exe" },
    @{ Source = "src/c/ex02_suporte_ti.c"; Output = "ex02_suporte_ti.exe" },
    @{ Source = "src/c/ex04_escalonamento.c"; Output = "ex04_escalonamento.exe" },
    @{ Source = "src/c/ex05_rede_pacotes.c"; Output = "ex05_rede_pacotes.exe" }
)

$cCompilerName = Split-Path -Leaf $cCompilerPath
$cFlags = @("-Wall")
if ($cCompilerName -ine "tcc.exe" -and $cCompilerName -ine "tcc") {
    $cFlags += "-Wextra"
}
$cFlags += @("-I", (Join-Path $Root "src/c"))
if ($WarningsAsErrors) {
    $cFlags += "-Werror"
}

foreach ($program in $cSources) {
    $source = Join-Path $Root $program.Source
    $output = Join-Path $BuildDir $program.Output
    Invoke-Compiler -Compiler $cCompilerPath -Arguments ($cFlags + @($source, "-o", $output))
}

if ($cppCompilerPath -eq "") {
    Write-Host "Compilador C++ nao encontrado. A parte C foi compilada; a trilha C++ foi ignorada."
    exit 0
}

$cppSource = Join-Path $Root "src/cpp/network_topology_lab.cpp"
$cppOutput = Join-Path $BuildDir "network_topology_lab.exe"
$cppName = Split-Path -Leaf $cppCompilerPath

if ($cppName -ieq "cl.exe") {
    Invoke-Compiler -Compiler $cppCompilerPath -Arguments @("/EHsc", "/std:c++17", $cppSource, "/Fe:$cppOutput")
} else {
    Invoke-Compiler -Compiler $cppCompilerPath -Arguments @("-std=c++17", "-Wall", "-Wextra", $cppSource, "-o", $cppOutput)
}
