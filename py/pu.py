import requests
import re

def getHTMLText(url):
    try:
        r = requests.get(url,timeout = 30);
        r.raise_for_status();
        r.encoding = r.apparent_encoding;
        return r.text;
    except:
        return ''

def parsePage(ilt,html):
    try:
        prices = re.findall(r'\"view_price\"\:\"[\d\.]*\"',html);
        titles = re.findall(r'\"raw_title\"\:\".*?\"',html)
        for i in range(len(prices)):
            price = eval(prices[i].split(':')[1]);
            title = eval(titles[i].split(':')[1]);
            ilt.append([title,price]); 
    except:
        print ('');

def printGoodsList(ilt):
    print("{:4}\t{:8}\t{:16}".format("序号","价格","商品名称"));
    count = 0;
    for i in ilt:
        count = count + 1;
        print("{:4}\t{:8}\t{:16}".format(count,i[1],i[0]));

def main():
    goods = '书包';
    depth = 2;
    start_url = "https://s.taobao.com/search?q=" + goods;
    infoList = []
    for i in range(depth):
        try:
            url = start_url + '&s=' + str(44*i);
            html =getHTMLText(url);
            parsePage(infoList,html);
        except:
            continue 
    printGoodsList(infoList);

main();       
