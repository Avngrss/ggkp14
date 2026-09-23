# GGKP14 - local static preview server (development only)
# Does not modify any source files.

param(
    [int]$Port = 8765
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$SrcRoot = Join-Path $ProjectRoot "src"

if (-not (Test-Path $SrcRoot)) {
    Write-Error "Папка src не найдена: $SrcRoot"
    exit 1
}

function Get-PythonCommand {
    $pythonCmd = Get-Command python -ErrorAction SilentlyContinue
    if ($pythonCmd) {
        return "python"
    }

    $pyCmd = Get-Command py -ErrorAction SilentlyContinue
    if ($pyCmd) {
        return "py"
    }

    return $null
}

$pythonCommand = Get-PythonCommand
if (-not $pythonCommand) {
    Write-Host ""
    Write-Host "Ошибка: Python не найден." -ForegroundColor Red
    Write-Host ""
    Write-Host "Для локального превью нужен Python 3."
    Write-Host "Установите Python с https://www.python.org/downloads/"
    Write-Host "и убедитесь, что команда python или py доступна в PATH."
    Write-Host ""
    exit 1
}

$BaseUrl = "http://localhost:$Port"
$PreviewUrl = "$BaseUrl/pages/preview.html"
$HomeUrl = "$BaseUrl/pages/index.html"
$ContentUrl = "$BaseUrl/pages/content-page.html"
$ContactsUrl = "$BaseUrl/pages/contacts.html"
$TableUrl = "$BaseUrl/pages/table-page.html"

Write-Host ""
Write-Host "GGKP14 - локальное превью статических страниц" -ForegroundColor Cyan
Write-Host "Корень сервера: $SrcRoot"
Write-Host "Порт: $Port"
Write-Host ""
Write-Host "Навигатор превью:  $PreviewUrl"
Write-Host "Главная:           $HomeUrl"
Write-Host "Контентная:        $ContentUrl"
Write-Host "Контакты:          $ContactsUrl"
Write-Host "Таблицы:           $TableUrl"
Write-Host ""
Write-Host "Остановить сервер: Ctrl+C"
Write-Host ""

try {
    Start-Process $PreviewUrl | Out-Null
}
catch {
    Write-Host "Не удалось открыть браузер. Откройте вручную: $PreviewUrl" -ForegroundColor Yellow
}

if ($pythonCommand -eq "py") {
    & py -3 -m http.server $Port --directory $SrcRoot
}
else {
    & python -m http.server $Port --directory $SrcRoot
}
