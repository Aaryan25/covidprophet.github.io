from django.shortcuts import render
import requests
import pandas as pd
from django.http import JsonResponse
import datetime
from fbprophet import Prophet
# Create your views here.

def IndexPage(request):
    data_state_table = getStateDataByTable("https://api.covid19india.org/data.json")
    data_india_active = india_active('https://api.covid19india.org/csv/latest/case_time_series.csv')
    data_india_recovered = india_recovered('https://api.covid19india.org/csv/latest/case_time_series.csv')
    data_india_deaths = india_deaths('https://api.covid19india.org/csv/latest/case_time_series.csv')
    data_india = get_total_india('https://api.covid19india.org/csv/latest/case_time_series.csv')
    data_india['active'] = data_india['confirm'] - (data_india['recover'] + data_india['death'])
    state = getStateDataWithStateCode("https://api.covid19india.org/data.json")
    passing = []
    for i in state:
        temp = {}
        temp['id'] = i['code']
        temp['name'] = i['state_name']
        temp['value'] = i['confirmed']
        temp['active'] = i['active']
        temp['recovered'] = i['recovered']
        temp['deaths'] = i['deaths']
        passing.append(temp)    
    return render(request,'index.html',{'State':passing,"state_table":data_state_table,"data_india":data_india,'data_india_active':data_india_active,'data_india_recovered':data_india_recovered,'data_india_deaths':data_india_deaths})

def CreatorPage(request):
    return render(request,'creator.html',{})

def predicted_data(request):
    user_input = request.GET.get('inputValue')
    State_data = pd.read_csv("https://api.covid19india.org/csv/latest/state_wise_daily.csv")
    all_data = list(State_data[user_input])
    all_date = list(State_data['Date_YMD'])
    confirmed=[]
    date=[]
    for i in range(0,len(all_data),3):        
        confirmed.append(all_data[i])
        date.append(all_date[i])
    data ={"ds":date,"y":confirmed}
    df = pd.DataFrame(data)

    df['ds'] = pd.to_datetime(df['ds'])
    #df['ds'] = df['ds'].dt.date
    #print(df)

    m = Prophet(interval_width=0.92)
    m.fit(df)
    future = m.make_future_dataframe(periods=20)
    #future.tail()

    forecast = m.predict(future)
    #print(forecast)
    #print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(20))
    dates = list(forecast['ds'])
    confirm_upper = list(map(int,forecast['yhat_upper']))
    confirm = list(map(int,forecast['yhat']))
    confirm_lower = list(map(int,forecast['yhat_lower']))
    data = {'date': dates,'confirm_upper': confirm_upper,'confirm_lower':confirm_lower,'confirm':confirm}
    return JsonResponse(data)

def answer_me(request):
    user_input = request.GET.get('inputValue')
    State_data = pd.read_csv("https://api.covid19india.org/csv/latest/state_wise_daily.csv")
    all_data = list(State_data[user_input])
    all_date = list(State_data['Date_YMD'])
    confirm=[]
    recover=[]
    death=[]    
    date=[]

    for i in range(0,len(all_data),3):        
        confirm.append(all_data[i])        
        recover.append(all_data[i+1])
        death.append(all_data[i+2])
        date.append(all_date[i])  
        
        if i>len(all_data):
            break
    data = {'confirm': confirm,'recover': recover,'death':death,'date':date}
    return JsonResponse(data)

def SubscriptionPage(request):
    return render(request,'subscription.html',{})

def DataTablePage(request):
    return render(request,'datatable.html',{})


# State Map Data 
def getStateDataWithStateCode(url):
    response = requests.get(url)
    data = response.json()
    state_data_with_code = []
    for state in (data['statewise']):
        if state['state'] == 'Total' or state['state'] == 'State Unassigned':
            pass
        else:
            temp = {}
            temp['state_name']= state['state']
            if state['statecode'].upper()=='MN':
                temp['code'] ="IN."+'MNL'
            else:
                temp['code'] ="IN." + state['statecode'].upper()
            temp['active']= state['active']
            temp['confirmed'] = state['confirmed']
            temp['deaths'] = state['deaths']
            temp['recovered']= state['recovered']
            state_data_with_code.append(temp)
    return state_data_with_code

#State Data As Table
def getStateDataByTable(url):
    response = requests.get(url)
    data = response.json()
    state_data_table = []
    count=1
    for state in (data['statewise']):
        if state['state'] == 'State Unassigned':
            pass
        else:
            if state['state'] == 'Total':
                lst = [count,'India',state['confirmed'],state['active'],state['recovered'],state['deaths'],state['statecode']]
                state_data_table.append(lst)
                count += 1
            else:
                lst = [count,state['state'],state['confirmed'],state['active'],state['recovered'],state['deaths'],state['statecode']]
                state_data_table.append(lst)
                count += 1
    State_data = pd.read_csv("https://api.covid19india.org/csv/latest/state_wise_daily.csv")
    col= list(State_data.columns) 
    colname = [col[i] for i in range(4,len(col))]   
    last_update = {}
    for j in colname:
            last_update[j] = list(State_data[j].tail(3))

    return {'state_data_table':state_data_table,'last_update':last_update}

#India Total Data Value
def get_total_india(url):
    df = pd.read_csv(url)
    #    print(df[['Date',"Daily Recovered"]].tail(6))
    india_c = list(df['Total Confirmed'])
    india_d = list(df['Total Deceased'])
    india_r = list(df['Total Recovered'])

    return {'confirm': india_c[-1], 'death': india_d[-1],'recover':india_r[-1]}

#India Chart Value
def india_active(url):
    df = pd.read_csv(url)
    #    print(df[['Date',"Daily Confirmed"]].tail(6))
    india_date= list(df['Date_YMD'])
    india_confirmed_cases = list(df['Daily Confirmed'])
    india_total_confirmed_cases = list(df['Total Confirmed'])    
    return {'date': india_date, 'active': india_confirmed_cases,'confirm':india_total_confirmed_cases}

def india_recovered(url):
    df = pd.read_csv(url)
    #    print(df[['Date',"Daily Recovered"]].tail(6))
    india_date= list(df['Date'])
    india_confirmed_cases = list(df['Daily Recovered'])

    return {'date': india_date, 'recovered': india_confirmed_cases}
def india_deaths(url):
    df = pd.read_csv(url)
    #    print(df[['Date',"Daily Recovered"]].tail(6))
    india_date= list(df['Date'])
    india_confirmed_cases = list(df['Daily Deceased'])

    return {'date': india_date, 'death': india_confirmed_cases} 