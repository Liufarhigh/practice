def getdate():
    s = input("input date:(year,month,day)")
    if s == 'q':
        return 'q'
    date=[]
    try:
        date = [int(i) for i in s.split('.')]
    except:
        pass
    return date

def checkdate(date, days):
    
    if not date:#whether empty
        print("类型格式输入错误")
        return False
    if date[0]<1900 or date[0]>2050:
        print('年份超界')
        return False
    else:
        if date[0] % 4 == 0:#whether run year
            days[2] = 29#set February 29 days
    if date[1]<1 or date[1]>12:
        print('月份超界')
        return False
    if date[2] < 1 or date[2] > days[date[1]]:
        print('日期超界')
        return False
    return True
    print('True')
days=[0,31,28,31,30,31,30,31,31,30,31,30,31]
while(True):
    date=getdate()
    if date == 'q':
        break
    #print(date)
    if not checkdate(date, days):#input a wrong date
        continue
    #print (days)
    y = date[0]
    m = date[1]
    d = date[2]+2#the day after tommorow

    year = y
    month = m
    day = d

    if d > days[m]:
        day = d - days[m]
        month = m + 1
        if month > 12:
            month -=12
            year +=1

    print("隔一日为{}年{}月{}日".format(year, month, day))



