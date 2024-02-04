# 常用Lua功能

由于lua语言很小，所以很多通用函数都没有实现，这里会记录一些常用功能函数。

## string.split

通过`gmatch`实现字符串分割

```lua
str = "i need a apple, apple is sweet. i really like eat apply, what about you?"
words = {}
for w in string.gmatch(str, "%a+") do --会按非字母字符分割（不够准确的说法，具体看看正则吧）
    words[#words+1] = w 
end
```