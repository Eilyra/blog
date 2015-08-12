---
author: ellen
title: Checking a file's hash in PowerShell
---
Hur man checkar file hashin med PowerShell, kan användas som info källa för Windows 10 artikeln

Checking a file's hash in PowerShell is fairly simple, as there is a built-in cmdlet for it since PowerShell 4, [Get-FileHash](https://technet.microsoft.com/en-us/library/dn520872.aspx).

Example usage:
{% highlight posh %}
# Get SHA256 hash of file (default hash)
Get-FileHash document.txt

# Should print true if the file hashes are equal
(Get-FileHash document.txt) -eq "4d4b9e7e923c087cc8a7ebe9d1f7674b5b1a802850aa0d5b0f0c39fc9fed439e"

# Using a different hash algorithm
Get-FileHash document.txt -Algorithm SHA1
{% endhighlight %}