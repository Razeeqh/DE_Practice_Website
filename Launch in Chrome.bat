@echo off
setlocal

set "FILE=%~dp0index.html"

:: Try common Chrome installation paths
set "CHROME1=C:\Program Files\Google\Chrome\Application\chrome.exe"
set "CHROME2=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
set "CHROME3=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

if exist "%CHROME1%" (
    start "" "%CHROME1%" --allow-file-access-from-files "%FILE%"
    goto :done
)
if exist "%CHROME2%" (
    start "" "%CHROME2%" --allow-file-access-from-files "%FILE%"
    goto :done
)
if exist "%CHROME3%" (
    start "" "%CHROME3%" --allow-file-access-from-files "%FILE%"
    goto :done
)

:: Chrome not found — try registry lookup
for /f "tokens=2*" %%a in ('reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe" /ve 2^>nul') do (
    start "" "%%b" --allow-file-access-from-files "%FILE%"
    goto :done
)
for /f "tokens=2*" %%a in ('reg query "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe" /ve 2^>nul') do (
    start "" "%%b" --allow-file-access-from-files "%FILE%"
    goto :done
)

:: Fallback — open in default browser
echo Chrome not found. Opening in default browser...
start "" "%FILE%"

:done
endlocal
