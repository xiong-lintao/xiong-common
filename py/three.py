import jieba
with open("threeking.txt", "r",encoding="utf-8") as txt:
    words = jieba.lcut(txt)
counts = {}
for word in words:
    if len(word) == 1:
        continue;
    else:
        counts[word] = counts.get(word,0) + 1
items = list(counts.items())
items.sort(key=lambda x:x[1],reverse = True)
for i in 15:
    word,count = items[i]
    print("{:<10}{:>15}".format(word,count))
