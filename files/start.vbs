Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c npm start", 0, false
Set WshShell = Nothing
